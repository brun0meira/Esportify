import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const HeaderContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 45px;

    h2{
        font-size: 17px;
    }

    span{
        font-weight: bold;
    }
`;

export const DivFiltros = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
`;

export const ContentContainer = styled.div`
    //padding-left: 200px;
    padding-top: 60px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;

    // Mobile phones
    @media (max-width: 480px) {
        padding-left: 50px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        padding-left: 130px;
    }
`;

export const Filtros = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    background: #222;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    transition: 0.3s;

    &.ativo {
      background: #ffce00;
      color: #000;
    }

    &:hover {
      background: #ffce00;
      color: #000;
    }
  }
`;

export const ListaNoticias = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

export const CardNoticia = styled.div`
  display: flex;
  background: #111;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  min-height: 173px;

  img {
    width: 150px;
    height: auto;
    object-fit: cover;
  }

  div {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: espace-between;
    align-items: start;
    height: 100%;

    h3 {
      margin: 0.5rem 0;
    }

    p {
      font-size: 0.875rem;
      color: #aaa;
    }
  }
`;

export const CategoriaTag = styled.span<{ categoria: string }>`
  background: ${({ categoria }) => 
    categoria === 'CS2' ? '#ffce00' :
    categoria === 'LOL' ? '#a855f7' :
    categoria === 'PUBG' ? '#f64949' :
    '#555'};
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
`;