import { useEffect } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

// Works as automatic scroll to top when a route is visited
export const ScrollRestoration = () => {
  const pathName = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return null;


}

export default ScrollRestoration; 
