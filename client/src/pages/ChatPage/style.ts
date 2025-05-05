import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
`;

export const ContentContainer = styled.div`
    padding-left: 200px;
    padding-top: 60px;
    height: 100vh;
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