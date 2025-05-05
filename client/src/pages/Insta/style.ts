import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const ContainerCards = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

export const Section = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  background-color: black;
`;

export const SectionTitle = styled.h2`
  color: white;
  font-weight: bold;
  font-size: 24px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-top: 0;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  /* background-color: white; */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const TopPostCard = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const PostDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

export const PostEngagement = styled.span`
  display: inline-block;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  color: white;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    color: black;
    background-color: #f5f5f5;
    font-weight: 600;
  }
`;

export const MetricCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
  margin-top: 20px;

  h3 {
    margin-top: 0;
    color: #555;
    font-size: 16px;
  }

  p {
    margin-bottom: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

export const MetricGridPost = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;
