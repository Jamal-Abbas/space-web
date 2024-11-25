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

const Galaxies: React.FC = () => {
  useScrollToContent();
  const galaxiesData = [
    {
      id: 1,
      name: "Milky Way",
      description: "Our home galaxy, a spiral galaxy containing over 100 billion stars, including our Sun. Located in the Local Group of galaxies.",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86"
    },
    {
      id: 2,
      name: "Andromeda (M31)",
      description: "The nearest major galaxy to the Milky Way, Andromeda is on a collision course with our galaxy, expected to merge in about 4.5 billion years.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7"
    },
    {
      id: 3,
      name: "Triangulum Galaxy (M33)",
      description: "The third-largest member of the Local Group, this spiral galaxy is one of the most distant objects visible to the naked eye.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
    },
    {
      id: 4,
      name: "Sombrero Galaxy (M104)",
      description: "Known for its bright nucleus, large central bulge, and distinctive dust lane, giving it the appearance of a sombrero hat.",
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
    }
  ];

  return (
    <PageContainer>
      <ContentSection>
        <Title>GALAXIES</Title>
        <p>
          Galaxies are massive collections of stars, gas, dust, and dark matter held together by gravity. 
          From spiral to elliptical, each galaxy tells a unique story of cosmic evolution and holds countless mysteries waiting to be discovered.
        </p>
        <Grid>
          {galaxiesData.map(galaxy => (
            <Card key={galaxy.id}>
              <Image src={`${galaxy.image}?w=600&q=80`} alt={galaxy.name} />
              <CardContent>
                <h2>{galaxy.name}</h2>
                <p>{galaxy.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </ContentSection>
    </PageContainer>
  );
};

export default Galaxies;