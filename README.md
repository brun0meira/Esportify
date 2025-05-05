# Esportify

<img src="./assets/login.png" height="auto" width="100%;" alt="login">

<img src="./assets/Screenshot from 2025-05-05 07-53-56.png" height="auto" width="100%;" alt="login">

## Introdução 

Em um cenário onde o engajamento digital é um dos principais ativos de uma organização de e-sports, entender o comportamento e as preferências dos fãs se torna essencial para oferecer experiências mais personalizadas e fortalecer a conexão com a comunidade.

Atualmente, muitos clubes de e-sports, incluindo grandes nomes como a FURIA, contam com uma base de fãs extremamente ativa, mas ainda enfrentam desafios como:

* A falta de uma plataforma unificada que centralize dados de comportamento, preferências e engajamento dos fãs;
* A limitação na personalização de conteúdos, ofertas e eventos baseada em dados reais de uso;
* A pouca visibilidade sobre a jornada do fã, dificultando a criação de campanhas mais assertivas e recompensadoras;
* O potencial inexplorado de redes sociais como fonte rica de dados para análise de sentimento, engajamento e identificação de top fãs.

Essas áreas representam grandes oportunidades para evoluir a experiência dos fãs com soluções baseadas em dados, gamificação e inteligência artificial, promovendo um ecossistema mais integrado, interativo e estratégico.
<br>

## Solução

A proposta desta aplicação é aprofundar o conhecimento sobre os fãs da FURIA, coletando e analisando dados relevantes para criar experiências personalizadas e engajadoras. A solução foi pensada com foco em um MVP funcional, utilizando tecnologias modernas e inteligência artificial para enriquecer os dados e gerar valor tanto para os fãs quanto para a organização.

### Para os fãs

A aplicação oferece diversas funcionalidades interativas:

* **Página de Escalação**: mostra as line-ups atualizadas dos times da FURIA.
* **Notícias**: reúne as últimas atualizações e novidades do universo da FURIA.
* **Eventos**: exibe eventos futuros com a possibilidade de apostar usando *Pontos Furiosos*.
* **Pontos Furiosos**: sistema de gamificação onde os fãs ganham pontos por:

  * Manter uma streak diária de acesso à plataforma;
  * Apostar em eventos da FURIA;
  * Integrar redes sociais e interagir com perfis oficiais da FURIA — quanto mais interação, mais pontos.
* **Conteúdo Exclusivo**: espaço onde os usuários podem trocar seus pontos por produtos oficiais e exclusivos da FURIA.
* **Perfil**: centraliza os dados do fã e valida documentos como RG usando o Textract da AWS para autenticação.

### Para os administradores

A aplicação oferece duas funcionalidades exclusivas:

* **User Analytics**: gera insights a partir dos dados dos usuários da plataforma, como:

  * Preferência por tipos de conteúdo;
  * Eventos e produtos de maior interesse;
  * Taxas de conversão entre engajamento e ações dentro do app.

* **Instagram Analytics**: desenvolvido a partir de um banco de dados com 370 posts e mais de 31 mil comentários do Instagram da FURIA. Essa funcionalidade permite:

  * Análise de correlação entre curtidas e comentários;
  * Identificação dos horários e dias de pico de engajamento;
  * Detecção dos posts, menções e fãs com mais engajamento;
  * Análise de tendências temporais no comportamento da comunidade.
<br>

## Video Demo

[video_demo.mp4](./assets/video_demo.mp4)
<br>

## Tecnologias

-   React
-   Node.js
-   Nestjs
-   AWS Textract
-   Prisma ORM
-   Postgresql
-   TypeScript
    <br>

## Árvore de arquivos

```
├── client
│    ├── src
│           ├── assets
│           ├── components
│           ├── context
│           ├── fonts
│           ├── pages
│           ├── services
│           ├── styles
│           ├── app.tsx
│           ├── main.tsx
│           ├── axios.tsx
│
├── server
│    ├── prisma
│           ├── schema.prisma
│    ├── src
│           ├── auth
│           ├── casl
│           ├── commom
│           ├── guard
│           ├── prisma
│           ├── textract
│           ├── user
│           ├── main.ts
│           ├── app.module.ts
│           ├── app.service.ts
│
├── database
│    ├── comments_furia.csv
│    ├── posts_furia.csv
│    ├── app.py
│    ├── furia_insights.json
│    ├── visualizations
│
```
<br>

## Executando a aplicação

Para executar a aplicação, é necessário instalar algumas dependências devido às tecnologias utilizadas. São elas:

-   Node Js

### Rodar client

Para executar o cliente frontend, é necessário entrar no repositório do frontend chamado client e executar os seguintes comandos para instalar as dependências do projeto e, em seguida, iniciar o cliente.

```
  $ npm i
  $ npm run dev
```

### Rodar server

Para executar o servidor backend, é necessário entrar no repositório do backend chamado server e executar os seguintes comandos para instalar as dependências do projeto e, em seguida, iniciar o servidor.

```
  $ npm i
  $ npm run start
```

<br>