import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Nebulae from './pages/Nebulae';
import BlackHoles from './pages/BlackHoles';
import Galaxies from './pages/Galaxies';
import Exoplanets from './pages/Exoplanets';
import Discoveries from './pages/Discoveries';
import './styles/fonts.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoadingIndicator from './components/LoadingIndicator';
import ScrollToTop from './components/ScrollToTop';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #000;
    color: #fff;
    line-height: 1.5;
    min-height: 100vh;
  }

  h1 {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  h2 {
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  button {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-y: visible;
  background: rgba(0, 0, 0, 0.3);
`;

const MainContent = styled.main`
  width: 100%;
  position: relative;
  overflow: visible;
`;

const Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 7%;
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }

  h1 {
    position: relative;
    z-index: 1;
    margin-bottom: 0.5em;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  cursor: pointer;
  &:focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }
`;

const HomePage: React.FC = () => (
  <MainContent>
    <Section>
      <h1>EXPLORE THE COSMOS</h1>
    </Section>
    <Section>
      <h1>DISCOVER THE UNKNOWN</h1>
    </Section>
    <Section>
      <h1>JOURNEY THROUGH SPACE</h1>
    </Section>
    <Section>
      <h1>WITNESS THE INFINITE</h1>
    </Section>
    <Section>
      <h1>EMBRACE THE MYSTERY</h1>
    </Section>
  </MainContent>
);

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <GlobalStyles />
      {isLoading && <LoadingIndicator />}
      <VideoBackground 
        autoPlay 
        muted 
        loop 
        playsInline
        onLoadedData={() => setIsLoading(false)}
        aria-hidden="true"
      >
        <source src="/videos/space-background.mp4" type="video/mp4" />
      </VideoBackground>
      <BackgroundOverlay 
        onClick={handleBackgroundClick}
        role="button"
        tabIndex={0}
        aria-label="Return to home page"
        onKeyPress={(e) => e.key === 'Enter' && handleBackgroundClick()}
      />
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nebulae" element={<Nebulae />} />
          <Route path="/black-holes" element={<BlackHoles />} />
          <Route path="/galaxies" element={<Galaxies />} />
          <Route path="/exoplanets" element={<Exoplanets />} />
          <Route path="/discoveries" element={<Discoveries />} />
        </Routes>
        <ScrollToTop />
      </AppContainer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;