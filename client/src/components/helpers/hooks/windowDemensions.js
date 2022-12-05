import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { outerWidth: width, innerWidth: iWidth, innerHeight: height } = window;
  return {
    width: iWidth < width ? iWidth : width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}