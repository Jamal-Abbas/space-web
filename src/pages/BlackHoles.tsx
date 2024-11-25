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

const BlackHoles: React.FC = () => {
  useScrollToContent();
  const blackHolesData = [
    {
      id: 1,
      name: "Sagittarius A*",
      description: "The supermassive black hole at the center of our Milky Way galaxy, approximately 26,000 light-years from Earth.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
    },
    {
      id: 2,
      name: "M87*",
      description: "The first black hole ever to be imaged, located in the center of the galaxy Messier 87, about 55 million light-years away.",
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=85"
    }
  ];

  return (
    <PageContainer>
      <ContentSection>
        <Title>BLACK HOLES</Title>
        <p>
          Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. 
          These cosmic phenomena continue to challenge our understanding of physics and the universe.
        </p>
        <Grid>
          {blackHolesData.map(blackHole => (
            <Card key={blackHole.id}>
              <Image src={`${blackHole.image}?w=600&q=80`} alt={blackHole.name} />
              <CardContent>
                <h2>{blackHole.name}</h2>
                <p>{blackHole.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </ContentSection>
    </PageContainer>
  );
};

export default BlackHoles; 