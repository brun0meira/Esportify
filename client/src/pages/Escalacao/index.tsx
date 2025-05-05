import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, PlayerCard, PlayerImage, AverageBadge, PlayerInfo, StatsRow, Stat, CardsContainer} from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { players } from "./players";

const jogos = ['Todos', 'CS2', 'LOL', 'PUBG'];

const News: React.FC = () => {  
  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Escalação Oficial da <span>FURIA!</span></h1>
              <h2>Conheça os atletas que vestem o manto da Nação e representam nossa garra em cada partida!</h2>
            </HeaderContent>
            <CardsContainer>
                {Object.entries(players).map(([team, teamPlayers]) => (
                    <div key={team}>
                        <h2>{team.toUpperCase()} - FURIA</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                            {teamPlayers.map((player) => (
                            <PlayerCard key={player.number}>
                                <PlayerImage src={player.image} />
                                <AverageBadge>Média {player.avg}</AverageBadge>
                                <PlayerInfo>
                                <h3>{player.name}</h3>
                                <p>{player.position}</p>
                                <StatsRow>
                                    <Stat>Jogos {player.games}</Stat>
                                    <Stat>Kills {player.kills}</Stat>
                                    <Stat>Assists {player.assists}</Stat>
                                </StatsRow>
                                <p><span>Nacionalidade: </span>{player.nationality}</p>
                                <p><span>Data de Entrada: </span>{player.joinDate}</p>
                                </PlayerInfo>
                            </PlayerCard>
                            ))}
                        </div>
                    </div>
                ))}
            </CardsContainer>
        </ContentContainer>
    </Container>
  );
}

export default News;