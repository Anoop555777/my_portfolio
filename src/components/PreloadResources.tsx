import { useEffect } from 'react';

const PreloadResources = () => {
  useEffect(() => {
    // Preload critical fonts
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
    ];

    fonts.forEach((fontUrl) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = fontUrl;
      document.head.appendChild(link);
    });

    // Preload critical images (if needed)
    // const criticalImages = ['/hero-bg.jpg', '/logo.png'];
    // criticalImages.forEach((src) => {
    //   const link = document.createElement('link');
    //   link.rel = 'preload';
    //   link.as = 'image';
    //   link.href = src;
    //   document.head.appendChild(link);
    // });
  }, []);

  return null;
};

export default PreloadResources;

