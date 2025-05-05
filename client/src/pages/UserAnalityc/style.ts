import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const ContainerCards = styled.div`
  /* background: #000; */
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  font-family: Arial, sans-serif;
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

export const ContentContainer = styled.div`
    padding-left: 200px;
    padding-top: 60px;
    width: 100%;
    max-width: 2000px;
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

export const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Card = styled.div`
  background: #111;
  padding: 1rem;
  border-radius: 12px;
  flex: 1;
  text-align: center;
  box-shadow: 0 0 10px #FFD700;
`;

export const ChartContainer = styled.div`
  background: #111;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  width: 100%;
`;

export const ChartContainerOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 47px;

  div{
    display: flex;
    flex-direction: column;
    width: 40%;
  }
`;

export const ChartContainerTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  div{
    display: flex;
    flex-direction: column;
    width: 40%;
  }
`;

export const TableContainer = styled.div`
  background: #111;
  padding: 2rem;
  border-radius: 12px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Th = styled.th`
  border-bottom: 2px solid #FFD700;
  padding: 0.5rem;
`;

export const Td = styled.td`
  border-bottom: 1px solid #333;
  padding: 0.5rem;
`;

export const Tr = styled.tr``;