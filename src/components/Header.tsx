import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.$isScrolled ? '15px 50px' : '25px 50px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  background-color: ${props => props.$isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.$isScrolled ? 'blur(10px)' : 'none'};

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
    background: ${({ $isScrolled }) => 
      $isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent'};
  }
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 0.5rem;
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    flex-direction: column;
    background: rgba(0, 0, 0, 0.95);
    width: 300px;
    height: 100vh;
    padding: 90px 40px 40px;
    transition: right 0.3s ease-in-out;
    z-index: 999;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 8px 0;
  transition: color 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #fff;
    transition: width 0.2s ease;
  }

  &.active::after,
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0;
    width: 100%;
    
    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  position: relative;

  @media (max-width: 768px) {
    display: block;
    width: 24px;
    height: 24px;
  }

  &::before,
  &::after,
  span {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: #ffffff;
    position: absolute;
    left: 0;
  }

  &::before {
    top: 6px;
  }

  span {
    top: 11px;
  }

  &::after {
    top: 16px;
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 25px;
  width: 24px;
  height: 24px;
  padding: 0;

  @media (max-width: 768px) {
    display: block;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: #fff;
    top: 50%;
    left: 0;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Logo to="/">COSMOS</Logo>
      <MenuButton onClick={() => setIsMenuOpen(true)}>
        <span />
      </MenuButton>
      <Nav $isOpen={isMenuOpen}>
        <CloseButton onClick={handleClose} />
        <NavLink 
          to="/nebulae" 
          className={location.pathname === '/nebulae' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          NEBULAE
        </NavLink>
        <NavLink 
          to="/black-holes"
          className={location.pathname === '/black-holes' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          BLACK HOLES
        </NavLink>
        <NavLink 
          to="/galaxies"
          className={location.pathname === '/galaxies' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          GALAXIES
        </NavLink>
        <NavLink 
          to="/exoplanets"
          className={location.pathname === '/exoplanets' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          EXOPLANETS
        </NavLink>
        <NavLink 
          to="/discoveries"
          className={location.pathname === '/discoveries' ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          DISCOVERIES
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;