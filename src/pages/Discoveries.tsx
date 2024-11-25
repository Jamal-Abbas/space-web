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

const Discoveries: React.FC = () => {
  useScrollToContent();
  const discoveriesData = [
    {
      id: 1,
      name: "Water Vapor on Europa",
      description: "Scientists have detected water vapor above the surface of Jupiter's moon Europa, providing strong evidence for the presence of liquid water beneath its icy surface.",
      image: "https://images.unsplash.com/photo-1614314107768-6018061b5b72"
    },
    {
      id: 2,
      name: "First Image of Black Hole",
      description: "The Event Horizon Telescope collaboration captured the first-ever image of a black hole's event horizon, located in the galaxy M87.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
    },
    {
      id: 3,
      name: "Mars Ancient Rivers",
      description: "New evidence suggests Mars once had rivers wider than Earth's, indicating the planet had a much warmer and wetter climate in its past.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      id: 4,
      name: "Gravitational Waves",
      description: "LIGO detected gravitational waves from the merger of two black holes, confirming Einstein's theory of general relativity.",
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
    },
    {
      id: 5,
      name: "Organic Molecules on Enceladus",
      description: "NASA's Cassini spacecraft detected complex organic molecules in the plumes erupting from Saturn's moon Enceladus.",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86"
    },
    {
      id: 6,
      name: "Phosphine on Venus",
      description: "Astronomers detected phosphine in Venus's atmosphere, a possible indicator of biological activity in the planet's clouds.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7"
    }
  ];

  return (
    <PageContainer>
      <ContentSection>
        <Title>DISCOVERIES</Title>
        <p>
          Recent breakthroughs and discoveries that are reshaping our understanding of the cosmos. 
          From black holes to potential signs of life, explore the latest findings in space science.
        </p>
        <Grid>
          {discoveriesData.map(discovery => (
            <Card key={discovery.id}>
              <Image src={`${discovery.image}?w=600&q=80`} alt={discovery.name} />
              <CardContent>
                <h2>{discovery.name}</h2>
                <p>{discovery.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </ContentSection>
    </PageContainer>
  );
};

export default Discoveries;