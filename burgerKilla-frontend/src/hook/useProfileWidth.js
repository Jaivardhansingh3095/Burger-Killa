import { useEffect, useState } from 'react';

export const useProfileWidth = () => {
  const [profileWidth, setProfileWidth] = useState('30%');

  useEffect(function () {
    function checkSize() {
      setProfileWidth(() => {
        if (window.innerWidth >= 1280) return '30%';
        else if (window.innerWidth >= 1024 && window.innerWidth < 1280)
          return '40%';
        else if (window.innerWidth >= 768 && window.innerWidth < 1024)
          return '50%';
        else if (window.innerWidth >= 500 && window.innerWidth < 768)
          return '70%';
        else if (window.innerWidth < 500) return '85%';
      });
    }
    checkSize();

    window.addEventListener('resize', checkSize);

    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return { profileWidth };
};
