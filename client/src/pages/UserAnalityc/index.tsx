import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, ContainerCards, CardsContainer, Card, ChartContainer, TableContainer, Table, Tr, Th, Td, ChartContainerOne, ChartContainerTwo } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { users } from './users';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ExclusiveContent: React.FC = () => {
    const totalUsers = users.length;
    const activeUsers = Math.floor(totalUsers * 0.6);
    const newUsers = 5;
    const conversionRate = ((activeUsers / totalUsers) * 100).toFixed(1) + '%';

    const INTERESTS = [
        "CS2", "Valorant", "League of Legends", "FURIA Academy", "Watch Parties",
        "Treinamentos ao vivo", "Streamings dos jogadores", "Notícias e bastidores da FURIA",
        "Colecionáveis digitais (NFTs)", "Feminino no esports", "Documentários e vídeos exclusivos",
        "Arena FURIA", "Fantasy game da FURIA"
    ];
      
    const EVENTS = [
        "IEM Rio Major 2022", "CBLOL Arena 2023", "Arena FURIA São Paulo", "FURIA Fan Fest",
        "ESL Pro League Finals", "DreamHack Open Rio", "Treino aberto da FURIA",
        "Evento de lançamento de uniforme 2024", "Meet & Greet com jogadores",
        "Game XP", "Campus Party", "Showmatch da FURIA com streamers"
    ];
      
    const PURCHASES = [
        "Camisa oficial da FURIA 2024", "Edição limitada - Jaqueta FURIA x Nike",
        "Mochila personalizada da FURIA", "Mousepad FURIA XL", "Assinatura FURIA+ (conteúdo exclusivo)",
        "Figurinha digital FURIA Legends", "Combo ingresso + camisa para evento", "Boné oficial da FURIA",
        "Chaveiro Pantera", "Sticker da FURIA no CS2", "Skins em parceria com a FURIA", "Coleção Pride Edition"
    ];

    const STATES = [
        "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
        "Rio Grande do Sul", "Pernambuco", "Ceará", "Distrito Federal", "Goiás"
    ];

    const stateCounts = STATES.reduce((acc, state) => {
        acc[state] = users.filter(u => u.address === state).length;
        return acc;
      }, {} as Record<string, number>);
      

    const interestCounts = INTERESTS.reduce((acc, interest) => {
        acc[interest] = users.filter(u => u.interests.includes(interest)).length;
        return acc;
    }, {} as Record<string, number>);

    const eventCounts = EVENTS.reduce((acc, event) => {
        acc[event] = users.filter(u => u.eventsAttended.includes(event)).length;
        return acc;
    }, {} as Record<string, number>);

    const purchaseCounts = PURCHASES.reduce((acc, purchase) => {
        acc[purchase] = users.filter(u => u.purchases.includes(purchase)).length;
        return acc;
    }, {} as Record<string, number>);

  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Central de Usuários dos Fãs da <span>FURIA!</span></h1>
              <h2>Acompanhe e analise detalhadamente todos os usuários ativos no sistema, com insights valiosos e informações centralizadas.</h2>
            </HeaderContent>
            <ContainerCards>
                <CardsContainer>
                    <Card><h3>Total de Usuários</h3><p>{totalUsers}</p></Card>
                    <Card><h3>Usuários Ativos</h3><p>{activeUsers}</p></Card>
                    <Card><h3>Novos Usuários</h3><p>{newUsers}</p></Card>
                    <Card><h3>Taxa de Conversão</h3><p>{conversionRate}</p></Card>
                </CardsContainer>

                <ChartContainer>
                    <ChartContainerOne>
                        <div >
                            <h2>Distribuição de Interesses</h2>
                            <Bar data={{
                            labels: Object.keys(interestCounts),
                            datasets: [{ label: 'Interesses', data: Object.values(interestCounts), backgroundColor: ['#FFD700', '#FF8C00', '#FF6347', '#FF4500', '#FFDAB9', '#DAA520'] }]
                            }} />
                        </div>
                        <div>
                            <h2>Distribuição de Eventos</h2>
                            <Bar data={{
                            labels: Object.keys(eventCounts),
                            datasets: [{ label: 'Eventos', data: Object.values(eventCounts), backgroundColor: '#FFD700' }]
                            }} />
                        </div>
                    </ChartContainerOne>
                    <ChartContainerTwo>
                        <div>
                            <h2>Distribuição de Compras</h2>
                            <Bar data={{
                            labels: Object.keys(purchaseCounts),
                            datasets: [{ label: 'Compras', data: Object.values(purchaseCounts), backgroundColor: '#FF8C00' }]
                            }} />
                        </div>
                        <div>
                            <h2>Distribuição Geográfica</h2>
                            <Bar data={{
                            labels: Object.keys(stateCounts),
                            datasets: [{ label: 'Usuários por Estado', data: Object.values(stateCounts), backgroundColor: '#FF6347' }]
                            }} />
                        </div>
                    </ChartContainerTwo>
                </ChartContainer>

                <TableContainer>
                    <h2>Usuários Registrados</h2>
                    <Table>
                    <thead>
                        <Tr>
                        <Th>Email</Th><Th>Nome</Th><Th>Interesses</Th><Th>Eventos</Th><Th>Compras</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => (
                        <Tr key={idx}>
                            <Td>{u.email}</Td>
                            <Td>{u.name}</Td>
                            <Td>{u.interests.join(', ')}</Td>
                            <Td>{u.eventsAttended.join(', ')}</Td>
                            <Td>{u.purchases.join(', ')}</Td>
                        </Tr>
                        ))}
                    </tbody>
                    </Table>
                </TableContainer>
                
            </ContainerCards>
        </ContentContainer>
    </Container>
  );
}

export default ExclusiveContent;