import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { images } from '../assets';

const FETCH_LAUNCHES = gql`
  query GetLaunches {
    launches {
      id
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
      launch_success
      links {
        flickr_images
        mission_patch
        video_link
      }
      details
    }
  }
`;

const LaunchGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
  overflow: visible;
`;

const LaunchCard = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5% 7%;
  overflow: visible;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.8));
    pointer-events: none;
  }

  &:hover {
    transform: none;
  }
`;

const MissionName = styled.h2`
  font-size: 38px;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  font-weight: 600;
`;

const LaunchInfo = styled.div`
  position: relative;
  z-index: 1;
`;

const LaunchDate = styled.p`
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

const LaunchButton = styled.button`
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  padding: 15px 35px;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ErrorScreen = styled(LoadingScreen)`
  flex-direction: column;
  gap: 1rem;
`;

const ErrorButton = styled(LaunchButton)`
  background: #fff;
  color: #000;
  &:hover {
    background: transparent;
    color: #fff;
  }
`;

const getMissionImage = (launch: any) => {
  if (launch.links?.flickr_images?.length > 0) {
    return launch.links.flickr_images[0];
  }
  
  // Fallback images based on mission type
  if (launch.mission_name.toLowerCase().includes('starlink')) {
    return images.launches.starlink;
  } else if (launch.mission_name.toLowerCase().includes('cargo')) {
    return images.launches.cargo;
  } else {
    return images.launches.starship;
  }
};

const LaunchList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_LAUNCHES, {
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });

  if (loading) {
    console.log('Loading launches...');
    return <LoadingScreen>Loading missions...</LoadingScreen>;
  }
  
  if (error) {
    console.error('Error details:', error);
    return (
      <ErrorScreen>
        <div>Error loading missions</div>
        <div style={{ fontSize: '14px', color: '#999' }}>
          {error.message}
        </div>
        <ErrorButton onClick={() => refetch()}>
          Try Again
        </ErrorButton>
      </ErrorScreen>
    );
  }

  if (!data || !data.launches || data.launches.length === 0) {
    console.log('No launches data:', data);
    return (
      <ErrorScreen>
        <div>No launches found</div>
        <ErrorButton onClick={() => refetch()}>
          Try Again
        </ErrorButton>
      </ErrorScreen>
    );
  }

  const validLaunches = data.launches.filter((launch: any) => launch && launch.id);
  console.log('Valid launches:', validLaunches.length);

  return (
    <LaunchGrid>
      {validLaunches.slice(0, 10).map((launch: any) => (
        <LaunchCard 
          key={launch.id}
          style={{
            backgroundImage: `url(${getMissionImage(launch)})`
          }}
        >
          <LaunchInfo>
            <MissionName>{launch.mission_name}</MissionName>
            <LaunchDate>
              {new Date(launch.launch_date_utc).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </LaunchDate>
            <p>ROCKET: {launch.rocket.rocket_name}</p>
            {launch.details && (
              <p style={{ maxWidth: '600px', marginBottom: '1.5rem' }}>
                {launch.details.slice(0, 150)}...
              </p>
            )}
            <LaunchButton 
              onClick={(e) => {
                e.stopPropagation();
                window.open(launch.links?.video_link, '_blank');
              }}
            >
              WATCH LAUNCH
            </LaunchButton>
          </LaunchInfo>
        </LaunchCard>
      ))}
    </LaunchGrid>
  );
};

export default LaunchList; 