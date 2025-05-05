import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const ContainerCards = styled.div`
  /* background-color: #121212; */
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
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
    max-width: 1500px;
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

export const Section = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  padding: 2rem;
  height: 327px;
  width: 600px;
  margin-bottom: 2rem;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
`;

export const SectionTitle = styled.h2`
  color: #FFD700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const UserInfo = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #FF8C00;
`;

export const Value = styled.span`
  margin-left: 0.5rem;
`;

export const UploadInput = styled.input`
  display: block;
  margin-bottom: 1rem;
  background: #fff;
  color: #000;
  padding: 0.5rem;
  border-radius: 8px;
`;

export const Message = styled.p`
  margin-top: 1rem;
  color: #FFD700;
  font-weight: bold;
  text-align: center;
`;

export const ContainerForm = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
`;

export const ContainerFormNd = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;

    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
`;

export const LabelPhoto = styled.label`
    padding: 10px 5px;
    width: 200px;
    background-color: #407BFF;
    color: #FFF;
    text-align: center;
    display: block;
    margin-top: 5px;
    cursor: pointer;
`;

export const InputFormsPhoto = styled.input`
    display: none;
`;