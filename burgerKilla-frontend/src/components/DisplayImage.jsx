import { useEffect, useState } from 'react';

function DisplayImage() {
  const [displayImage, setDisplayImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const fetchImage = async function () {
      try {
        setIsLoading(true);
        const res = await fetch(
          'http://127.0.0.1:3000/api/v1/menu/images/chicken-double-patty-cheese-burger.png',
        );
        console.log(res);
        if (!res.ok) throw new Error('Issue with retriving image');

        const data = await res.json();

        setDisplayImage(data.data.base64Img);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImage();
  }, []);
  return (
    <div>
      {isLoading ? (
        <p className="text-5xl">File is loading....</p>
      ) : (
        <img src={`data:image/png;base64,${displayImage}`} alt="burger image" />
      )}
    </div>
  );
}

export default DisplayImage;
