import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, ProductCard, ProductImage, ProductName, ProductPrice, ProductInstallments, ContainerCards} from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { products } from './products';

const ExclusiveContent: React.FC = () => {  
  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
            <HeaderContent>
              <h1>Conteúdos Exclusivos para os <span>Fãs</span> Mais Fieis</h1>
              <h2>Conecte suas redes sociais, interaja com a comunidade ou aposte nos seus jogos favoritos para acumular pontos e trocar por recompensas únicas da Nação FURIA!</h2>
            </HeaderContent>
            <ContainerCards>
                {products.map(product => (
                    <ProductCard key={product.id}>
                    <ProductImage src={product.image} alt={product.name} />
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>{product.price.toFixed(2)} Pontos Furiosos</ProductPrice>
                    <ProductInstallments>{product.installments}</ProductInstallments>
                    </ProductCard>
                ))}
            </ContainerCards>
        </ContentContainer>
    </Container>
  );
}

export default ExclusiveContent;