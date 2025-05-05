import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

export const BackgroundImage = styled.div`
    display: flex;
    flex-direction: row;
    width: 55%;
    height: 100%;
    //background-color: var(----background);
    background-image: url('https://img-cdn.hltv.org/gallerypicture/xBUYAbaQKJ0tBTGR5cNAyk.jpg?ixlib=java-2.1.0&w=1200&s=6e88c9f3f3ca827c8bfc7bdb9385d335');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export const FormsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
    background-color: black;
`;

export const LoginContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: white;
    padding: 30px;
    border-radius: 10px;

    h2{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 26px;
        text-align: center;

        // Desktops
        @media (max-width: 1919px) {
            font-size: 16px;
        }
    }

    h3{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: var(--text_gray);

        // Desktops
        @media (max-width: 1919px) {
            font-size: 16px;
        }
    }

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: var(--text_gray);
        padding-top: 13px;

        // Desktops
        @media (max-width: 1919px) {
            font-size: 12px;
        }

        a{
            color: var(--primary);
            font-weight: 500;

            &:hover{
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`;

export const LoginForms = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // Desktops
  @media (max-width: 1919px) {
    width: 400px;
    }

  h1{
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 40px;
    color: var(--blue);
    margin-bottom: 5px;

    // Desktops
    @media (max-width: 1919px) {
        font-size: 24px;
    }
  }

  h2{
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 22px;
    text-align: center;
    color: var(--text_gray);

    // Desktops
    @media (max-width: 1919px) {
        font-size: 16px;
    }
  }

  p{
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: var(--text_gray);

    // Desktops
    @media (max-width: 1919px) {
        font-size: 12px;
    }

    a{
        color: var(--primary);
        font-weight: 700;

        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
  }
`;


export const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
`;

