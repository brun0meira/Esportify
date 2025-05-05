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

export const ContentContainer = styled.div`
    //padding-left: 200px;
    padding-top: 60px;
    width: 100%;
    max-width: 1200px;
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



export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  
  h1 {
    font-size: 24px;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

export const MonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 50px 0px;
  
  span {
    cursor: pointer;
    padding: 5px 10px;
  }

  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid black;
  }
`;

export const EventList = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

export const EventCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 5px;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    p{
        font-size: 20px;
    }
  }

  img {
    background: white;
    border-radius: 4px;
  }
`;

export const Filters = styled.div`
  button {
    background: black;
    color: #ffeb00;
    border: none;
    padding: 8px 10px;
    margin-left: 5px;
    cursor: pointer;
    font-size: 12px;
  }
`;