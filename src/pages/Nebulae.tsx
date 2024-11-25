import React from 'react';
import styled from 'styled-components';
import { useScrollToContent } from '../hooks/useScrollToContent';

const PageContainer = styled.div`
  padding-top: 100vh;
  min-height: 100vh;
`;

const ContentSection = styled.section`
  padding: 2rem 7%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Nebulae: React.FC = () => {
  useScrollToContent();

  const nebulaeData = [
    {
      id: 1,
      name: "Orion Nebula",
      description: "The Orion Nebula is one of the brightest nebulae visible to the naked eye. It's a stellar nursery where new stars are being born.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7"
    },
    {
      id: 2,
      name: "Crab Nebula",
      description: "A supernova remnant in the constellation of Taurus, the Crab Nebula was first observed by Chinese astronomers in 1054 AD.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
    },
    // Add more nebulae data
  ];

  return (
    <PageContainer>
      <ContentSection>
        <Title>NEBULAE</Title>
        <p>
          Nebulae are vast clouds of gas and dust in space where stars are born and die. 
          These cosmic nurseries and graveyards create some of the most spectacular views in the universe.
        </p>
        <Grid>
          {nebulaeData.map(nebula => (
            <Card key={nebula.id}>
              <Image src={`${nebula.image}?w=600&q=80`} alt={nebula.name} />
              <CardContent>
                <h2>{nebula.name}</h2>
                <p>{nebula.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </ContentSection>
    </PageContainer>
  );
};

export default Nebulae;