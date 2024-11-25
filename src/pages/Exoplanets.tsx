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

const Exoplanets: React.FC = () => {
  useScrollToContent();
  const exoplanetsData = [
    {
      id: 1,
      name: "Kepler-186f",
      description: "One of the first Earth-sized planets discovered in the habitable zone of another star. Located 582 light-years away in the constellation Cygnus.",
      image: "https://images.unsplash.com/photo-1614314107768-6018061b5b72"
    },
    {
      id: 2,
      name: "TRAPPIST-1e",
      description: "Part of the TRAPPIST-1 system, this rocky planet is one of seven Earth-sized worlds orbiting a cool dwarf star, potentially capable of hosting liquid water.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      id: 3,
      name: "Proxima Centauri b",
      description: "The closest known exoplanet to our Solar System, orbiting our nearest stellar neighbor Proxima Centauri, just 4.2 light-years away.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7"
    },
    {
      id: 4,
      name: "HD 40307g",
      description: "A super-Earth exoplanet that orbits in the habitable zone of its star. It's about seven times more massive than Earth.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
    },
    {
      id: 5,
      name: "Kepler-442b",
      description: "A super-Earth exoplanet that orbits within the habitable zone of its star. It receives about 70% as much sunlight as Earth does from the Sun.",
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
    }
  ];

  return (
    <PageContainer>
      <ContentSection>
        <Title>EXOPLANETS</Title>
        <p>
          Exoplanets are planets that orbit stars other than our Sun. From super-Earths to hot Jupiters, 
          these distant worlds expand our understanding of planetary formation and the potential for life beyond Earth.
        </p>
        <Grid>
          {exoplanetsData.map(planet => (
            <Card key={planet.id}>
              <Image src={`${planet.image}?w=600&q=80`} alt={planet.name} />
              <CardContent>
                <h2>{planet.name}</h2>
                <p>{planet.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </ContentSection>
    </PageContainer>
  );
};

export default Exoplanets;