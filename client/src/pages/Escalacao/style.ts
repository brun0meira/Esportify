import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2{
      font-size: 26px;
      font-weight: bold;
    }
  
  div{
    margin: 10px 0px 10px 0px

    
  }
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
    max-width: 1800px;
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

export const PlayerCard = styled.div`
  background: #1f1f1f;
  border-radius: 12px;
  width: 300px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  color: white;

  h3{
    font-weight: bold;
  }

  p{
    span{
      color: #ffeb00;
    }
  }
`;

export const PlayerImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PlayerInfo = styled.div`
  padding: 15px;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Stat = styled.div`
  background: #2e2e2e;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const AverageBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffc107;
  color: #000;
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: bold;
`;