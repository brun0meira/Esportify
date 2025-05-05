import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, ContainerCards } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import insightsData from '../../../../database/furia_insights.json';

import { Section, SectionTitle, GridContainer, ChartContainer, TopPostCard, PostImage, PostDescription, PostEngagement, DataTable, MetricCard, MetricGrid, MetricGridPost } from './style';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

const Insta: React.FC = () => {
    const topCommentersData = {
        labels: Object.keys(insightsData.top_commenters),
        datasets: [
          {
            label: 'Número de Comentários',
            data: Object.values(insightsData.top_commenters),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const topHashtagsData = {
        labels: Object.keys(insightsData.top_hashtags),
        datasets: [
          {
            label: 'Contagem do Uso de Hashtag',
            data: Object.values(insightsData.top_hashtags),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const hashtagEngagementData = {
        labels: Object.keys(insightsData.hashtag_engagement),
        datasets: [
          {
            label: 'Engajamento por Hashtag',
            data: Object.values(insightsData.hashtag_engagement),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const engagementByHourData = {
        labels: Object.keys(insightsData.engagement_by_hour).map(hour => `${hour}:00`),
        datasets: [
          {
            label: 'Engajamento por Hora',
            data: Object.values(insightsData.engagement_by_hour),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.1,
            fill: true,
          },
        ],
      };
    
      const engagementByWeekdayData = {
        labels: Object.keys(insightsData.engagement_by_weekday),
        datasets: [
          {
            label: 'Engajamento por dia da semana',
            data: Object.values(insightsData.engagement_by_weekday),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const topMentionsData = {
        labels: Object.keys(insightsData.top_mentions),
        datasets: [
          {
            label: 'COntagem de Menção',
            data: Object.values(insightsData.top_mentions),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const mentionEngagementData = {
        labels: Object.keys(insightsData.mention_engagement),
        datasets: [
          {
            label: 'Engajamento por Menção',
            data: Object.values(insightsData.mention_engagement),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const temporalTrendData = {
        labels: Object.keys(insightsData.temporal_trend),
        datasets: [
          {
            label: 'Tendência do Engajamento ao longo do tempo',
            data: Object.values(insightsData.temporal_trend),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            fill: true,
          },
        ],
      };
    
      const superFansCommentsData = {
        labels: Object.keys(insightsData.super_fans),
        datasets: [
          {
            label: 'Total de Comentários',
            data: Object.values(insightsData.super_fans).map((fan: any) => fan.total_comments),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const superFansAvgLikesData = {
        labels: Object.keys(insightsData.super_fans),
        datasets: [
          {
            label: 'Média de comentários curtidos',
            data: Object.values(insightsData.super_fans).map((fan: any) => fan.avg_comment_likes),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Central de Insights – Instagram <span>@furia.gg</span></h1>
              <h2>Acompanhe de perto todos os dados e movimentações do Instagram da FURIA em um só lugar.</h2>
            </HeaderContent>
            <ContainerCards>
                <Section>
                    <SectionTitle>Principais métricas</SectionTitle>
                    <MetricGrid>
                    <MetricCard>
                        <h3>Correlação entre curtidas e comentários</h3>
                        <p>{insightsData.likes_comments_correlation.toFixed(4)}</p>
                    </MetricCard>
                    <MetricCard>
                        <h3>Hora de Pico de Engajamento</h3>
                        <p>{Object.entries(insightsData.engagement_by_hour).reduce((a, b) => a[1] > b[1] ? a : b)[0]}:00</p>
                    </MetricCard>
                    <MetricCard>
                        <h3>Dia com Maior Engajamento</h3>
                        <p>{Object.entries(insightsData.engagement_by_weekday).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                    </MetricCard>
                    <MetricCard>
                        <h3>Top Menção por Engajamento</h3>
                        <p>@{Object.entries(insightsData.mention_engagement).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                    </MetricCard>
                    </MetricGrid>
                </Section>
                <Section>
                    <SectionTitle>Principais mensagens por Engajamento</SectionTitle>
                    <MetricGridPost>
                        {insightsData.top_posts.map((post, index) => (
                        <TopPostCard key={index}>
                            <PostImage src={post.url} alt={`Top Post ${index + 1}`} />
                            <PostDescription>{post.description}</PostDescription>
                            <PostEngagement>Engajamento: {post.engajamento.toFixed(2)}%</PostEngagement>
                        </TopPostCard>
                        ))}    
                    </MetricGridPost>
                </Section>
                <Section>
                    <SectionTitle>Principais Comentadores</SectionTitle>
                    <GridContainer>
                    <ChartContainer>
                    <Bar 
                    data={topCommentersData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Top 10 Comentadores por número de comentários',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        y: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    <ChartContainer>
                        <DataTable>
                        <thead>
                            <tr>
                            <th>Username</th>
                            <th>Comentários</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(insightsData.top_commenters).map(([username, count]) => (
                            <tr key={username}>
                                <td>@{username}</td>
                                <td>{count}</td>
                            </tr>
                            ))}
                        </tbody>
                        </DataTable>
                    </ChartContainer>
                    </GridContainer>
                </Section>
                <Section>
                    <SectionTitle>Análise de hashtag</SectionTitle>
                    <GridContainer>
                    <ChartContainer>
                    <Bar 
                        data={topHashtagsData}
                        options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Principais Hashtags por número de utilizações',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    <ChartContainer>
                    <Bar 
                        data={hashtagEngagementData}
                        options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Engajamento por Hashtag',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: {
                            color: '#fff', 
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    </GridContainer>
                </Section>
                <Section>
                    <SectionTitle>Padrões de Engajamento</SectionTitle>
                    <GridContainer>
                    <ChartContainer>
                    <Line 
                    data={engagementByHourData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Engajamento por hora do dia',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    <ChartContainer>
                    <Bar 
                    data={engagementByWeekdayData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Engajamento por dia da semana',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    </GridContainer>
                </Section>
                <Section>
                    <SectionTitle>Análise das menções</SectionTitle>
                    <GridContainer>
                    <ChartContainer>
                    <Bar 
                    data={topMentionsData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Principais menções por contagem',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: {
                            color: '#fff', // eixo X
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                            color: '#fff', // eixo Y
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    <ChartContainer>
                    <Bar 
                    data={mentionEngagementData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Engajamento por menção',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        y: {
                            ticks: {
                            color: '#fff',
                            },
                            grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    </GridContainer>
                </Section>
                <Section>
                    <SectionTitle>Análise dos Super Fãs</SectionTitle>
                    <GridContainer>
                    <ChartContainer>
                    <Bar 
                    data={superFansCommentsData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Super Fãs por Total de Comentários',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        y: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    <ChartContainer>
                    <Bar 
                    data={superFansAvgLikesData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Super Fãs por avg. das Curtidas nos comentários',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        y: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    </GridContainer>
                </Section>
                <Section>
                    <SectionTitle>Tendências temporais do Engajamento</SectionTitle>
                    <GridContainer>
                    <ChartContainer style={{ gridColumn: '1 / -1' }}>
                    <Line 
                    data={temporalTrendData}
                    options={{
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: 'Tendência do Engajamento ao longo do tempo',
                            color: '#fff',
                        },
                        legend: {
                            labels: {
                            color: '#fff',
                            },
                        },
                        },
                        scales: {
                        x: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        y: {
                            ticks: { color: '#fff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        },
                        },
                    }}
                    />
                    </ChartContainer>
                    </GridContainer>
                </Section>
                <Section>
                    <SectionTitle>Comentário Tipos de interação</SectionTitle>
                    <p style={{color: 'white', paddingTop:"15px"}}>Todos os comentários são classificados como: {Object.keys(insightsData.comment_interaction_types).join(', ')}</p>
                </Section>
            </ContainerCards>
        </ContentContainer>
    </Container>
  );
}

export default Insta;