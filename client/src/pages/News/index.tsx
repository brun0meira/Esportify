import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, Filtros, ListaNoticias, CardNoticia, CategoriaTag, DivFiltros } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { noticiasFuria } from './noticiasFuria';

const jogos = ['Todos', 'CS2', 'LOL', 'PUBG'];

const News: React.FC = () => {

  const [filtro, setFiltro] = useState<string>('Todos');

  const noticiasFiltradas = filtro === 'Todos'
    ? noticiasFuria
    : noticiasFuria.filter(noticia => noticia.categoria === filtro);
  
  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Últimas Atualizações da Nação <span>FURIA!</span></h1>
              <h2>Acompanhe as notícias mais recentes da comunidade FURIA e fique sempre por dentro do que acontece!</h2>
            </HeaderContent>
            <DivFiltros>
                <Filtros>
                    {jogos.map(jogo => (
                    <button
                        key={jogo}
                        className={filtro === jogo ? 'ativo' : ''}
                        onClick={() => setFiltro(jogo)}
                    >
                        {jogo}
                    </button>
                    ))}
                </Filtros>
            </DivFiltros>
            <ListaNoticias>
                {noticiasFiltradas.map(noticia => (
                <CardNoticia key={noticia.id}>
                    <img src={noticia.imagem} alt={noticia.titulo} />
                    <div>
                        <CategoriaTag categoria={noticia.categoria}>{noticia.categoria}</CategoriaTag>
                        <h3>{noticia.titulo}</h3>
                        <p>{noticia.data}</p>
                    </div>
                </CardNoticia>
                ))}
            </ListaNoticias>
        </ContentContainer>
    </Container>
  );
}

export default News;