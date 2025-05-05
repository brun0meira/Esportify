import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const ContainerCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    padding: 40px;
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
    max-width: 1300px;
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

export const ProductCard = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const ProductName = styled.h3`
  font-size: 14px;
  margin: 10px 0 5px;
  color: #000;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  color: #000;
`;

export const ProductInstallments = styled.p`
  font-size: 12px;
  color: #555;
  margin: 5px 0 15px;
`;