import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToContent = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);
}; 