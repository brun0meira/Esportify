import pandas as pd
import numpy as np
import json
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import ast

plt.style.use('ggplot')
sns.set_palette("husl")

def load_and_preprocess_data(posts_file, comments_file):
    posts_df = pd.read_csv(posts_file, parse_dates=['date'])
    comments_df = pd.read_csv(comments_file, parse_dates=['data'])
    
    def process_hashtags(x):
        if pd.isna(x):
            return []
        return [tag.strip() for tag in str(x).split(',') if tag.strip()]
    
    posts_df['hashtags'] = posts_df['hashtags'].apply(process_hashtags)
    
    posts_df['mencionados'] = posts_df['mencionados'].apply(
        lambda x: [m.strip() for m in str(x).split(',')] if pd.notna(x) else []
    )
    
    posts_df['hora'] = posts_df['date'].dt.hour
    posts_df['dia_semana'] = posts_df['date'].dt.day_name()
    posts_df['mes'] = posts_df['date'].dt.month_name()
    
    comments_df['hora'] = comments_df['data'].dt.hour
    comments_df['dia_semana'] = comments_df['data'].dt.day_name()
    
    return posts_df, comments_df

def calculate_engagement(posts_df):
    max_likes = posts_df['curtidas'].max()
    max_comments = posts_df['comentarios'].max()
    
    posts_df['engajamento'] = (posts_df['curtidas'] / max_likes * 0.6 + 
                              posts_df['comentarios'] / max_comments * 0.4) * 100
    
    return posts_df

def generate_insights(posts_df, comments_df):
    insights = {}
    
    # 1. Top pessoas que mais comentam (considerando posts diferentes)
    top_commenters = comments_df.groupby('autor')['id_post'].nunique().sort_values(ascending=False).head(10)
    insights['top_commenters'] = top_commenters.to_dict()
    
    # 2. Top posts com mais engajamento
    top_posts = posts_df.sort_values('engajamento', ascending=False)[['description', 'engajamento', 'url']].head(10)
    insights['top_posts'] = top_posts.to_dict('records')
    
    # 3. Preferências de conteúdo (por hashtags)
    all_hashtags = [tag for sublist in posts_df['hashtags'] for tag in sublist]
    top_hashtags = pd.Series(all_hashtags).value_counts().head(10)
    
    # Engajamento médio por hashtag
    hashtag_engagement = {}
    for tag in top_hashtags.index:
        mask = posts_df['hashtags'].apply(lambda x: tag in x)
        hashtag_engagement[tag] = posts_df[mask]['engajamento'].mean()
    
    insights['top_hashtags'] = top_hashtags.to_dict()
    insights['hashtag_engagement'] = hashtag_engagement
    
    # 4. Horários de engajamento
    # Por hora do dia
    engagement_by_hour = posts_df.groupby('hora')['engajamento'].mean()
    insights['engagement_by_hour'] = engagement_by_hour.to_dict()
    
    # Por dia da semana
    weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    engagement_by_weekday = posts_df.groupby('dia_semana')['engajamento'].mean().reindex(weekday_order)
    insights['engagement_by_weekday'] = engagement_by_weekday.to_dict()
    
    # 5. Hashtags e menções
    # Menções mais frequentes
    all_mentions = [mention for sublist in posts_df['mencionados'] for mention in sublist]
    top_mentions = pd.Series(all_mentions).value_counts().head(10)
    insights['top_mentions'] = top_mentions.to_dict()
    
    # Menções com maior engajamento
    mention_engagement = {}
    for mention in top_mentions.index:
        mask = posts_df['mencionados'].apply(lambda x: mention in x)
        mention_engagement[mention] = posts_df[mask]['engajamento'].mean()
    insights['mention_engagement'] = mention_engagement
    
    # 6. Autores de comentários ativos (super fãs)
    required_columns = ['autor', 'id', 'likescount']
    if all(col in comments_df.columns for col in required_columns):
        super_fans = comments_df.groupby('autor').agg(
            total_comments=('id', 'count'),
            avg_comment_likes=('likescount', 'mean')
        ).sort_values(['total_comments', 'avg_comment_likes'], ascending=False).head(10)
        insights['super_fans'] = super_fans.to_dict('index')
    else:
        print("Aviso: Algumas colunas necessárias para identificar super fãs não foram encontradas")
        insights['super_fans'] = {}
    
    # 7. Tendência temporal
    # Engajamento ao longo do tempo (agregado por semana)
    temporal_trend = posts_df.set_index('date').resample('W')['engajamento'].mean()
    insights['temporal_trend'] = {str(k.date()): v for k, v in temporal_trend.to_dict().items()}
    
    if all(col in posts_df.columns for col in ['curtidas', 'comentarios']):
        correlation = posts_df[['curtidas', 'comentarios']].corr().iloc[0,1]
        insights['likes_comments_correlation'] = correlation
    else:
        print("Aviso: Colunas 'curtidas' ou 'comentarios' não encontradas para calcular correlação")
        insights['likes_comments_correlation'] = None
    
    if 'tipo_interacao' in comments_df.columns:
        interaction_types = comments_df['tipo_interacao'].value_counts(normalize=True)
        insights['comment_interaction_types'] = interaction_types.to_dict()
    else:
        insights['comment_interaction_types'] = {}
    
    return insights

def save_insights_to_json(insights, filename):
    def convert_timestamps(obj):
        if isinstance(obj, pd.Timestamp):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, dict):
            return {key: convert_timestamps(value) for key, value in obj.items()}
        elif isinstance(obj, (list, tuple)):
            return [convert_timestamps(item) for item in obj]
        return obj
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(convert_timestamps(insights), f, ensure_ascii=False, indent=4)

def create_visualizations(posts_df, comments_df, insights):
    # 1. Top pessoas que mais comentam
    plt.figure(figsize=(10, 6))
    pd.Series(insights['top_commenters']).plot(kind='bar')
    plt.title('Top 10 Pessoas que Mais Comentam (em posts diferentes)')
    plt.ylabel('Número de Posts Comentados')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('visualizations/top_commenters.png')
    plt.close()
    
    # 2. Top posts com mais engajamento
    plt.figure(figsize=(10, 6))
    top_posts_df = pd.DataFrame(insights['top_posts'])
    sns.barplot(data=top_posts_df, x='engajamento', y='description')
    plt.title('Top 10 Posts com Maior Engajamento')
    plt.xlabel('Engajamento (%)')
    plt.ylabel('Post Description (resumido)')
    plt.tight_layout()
    plt.savefig('visualizations/top_posts.png')
    plt.close()
    
    # 3. Hashtags mais populares e seu engajamento
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    
    pd.Series(insights['top_hashtags']).plot(kind='bar', ax=ax1)
    ax1.set_title('Top 10 Hashtags Mais Usadas')
    ax1.set_ylabel('Contagem')
    ax1.tick_params(axis='x', rotation=45)
    
    hashtag_engagement = pd.Series(insights['hashtag_engagement']).sort_values(ascending=False)
    hashtag_engagement.plot(kind='bar', ax=ax2)
    ax2.set_title('Engajamento Médio por Hashtag')
    ax2.set_ylabel('Engajamento (%)')
    ax2.tick_params(axis='x', rotation=45)
    
    plt.tight_layout()
    plt.savefig('visualizations/hashtags_analysis.png')
    plt.close()
    
    # 4. Horários de engajamento
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    
    engagement_by_hour = pd.Series(insights['engagement_by_hour'])
    engagement_by_hour.plot(kind='line', marker='o', ax=ax1)
    ax1.set_title('Engajamento Médio por Hora do Dia')
    ax1.set_xlabel('Hora do Dia')
    ax1.set_ylabel('Engajamento (%)')
    ax1.set_xticks(range(24))
    
    engagement_by_weekday = pd.Series(insights['engagement_by_weekday'])
    engagement_by_weekday.plot(kind='bar', ax=ax2)
    ax2.set_title('Engajamento Médio por Dia da Semana')
    ax2.set_ylabel('Engajamento (%)')
    ax2.tick_params(axis='x', rotation=45)
    
    plt.tight_layout()
    plt.savefig('visualizations/engagement_time_analysis.png')
    plt.close()
    
    # 5. Menções e super fãs
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    
    pd.Series(insights['top_mentions']).plot(kind='bar', ax=ax1)
    ax1.set_title('Top 10 Pessoas/Organizações Mais Mencionadas')
    ax1.set_ylabel('Contagem')
    ax1.tick_params(axis='x', rotation=45)
    
    super_fans_df = pd.DataFrame(insights['super_fans']).T
    super_fans_df['total_comments'].plot(kind='bar', ax=ax2)
    ax2.set_title('Top 10 Super Fãs (Total de Comentários)')
    ax2.set_ylabel('Número de Comentários')
    ax2.tick_params(axis='x', rotation=45)
    
    plt.tight_layout()
    plt.savefig('visualizations/mentions_superfans.png')
    plt.close()
    
    # 6. Tendência temporal
    plt.figure(figsize=(12, 6))
    temporal_trend = pd.Series(insights['temporal_trend'])
    temporal_trend.plot(kind='line', marker='o')
    plt.title('Tendência de Engajamento ao Longo do Tempo')
    plt.xlabel('Data')
    plt.ylabel('Engajamento Médio (%)')
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('visualizations/temporal_trend.png')
    plt.close()

def main():
    posts_df, comments_df = load_and_preprocess_data('posts_furia.csv', 'comments_furia.csv')
    
    posts_df = calculate_engagement(posts_df)
    
    insights = generate_insights(posts_df, comments_df)
    
    save_insights_to_json(insights, 'furia_insights.json')
    
    import os
    if not os.path.exists('visualizations'):
        os.makedirs('visualizations')
    create_visualizations(posts_df, comments_df, insights)
    
    print("Análise concluída! Insights salvos em furia_insights.json e visualizações na pasta visualizations/")

if __name__ == "__main__":
    main()