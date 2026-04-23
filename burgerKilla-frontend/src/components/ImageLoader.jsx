import { useState } from "react";

function ImageLoader({ src, alt, imgCSS, loaderImgCSS }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`${loaderImgCSS ? loaderImgCSS : imgCSS}`}>
          <img
            className={`w-full h-full blur-2xl opacity-90 bg-gray-800 animate-pulse`}
            src="./low_res_img.jpg"
            alt="low resolution loading image"
          />
        </div>
      )}
      <img
        onLoad={() => setIsLoaded(true)}
        src={src}
        alt={alt}
        className={`${imgCSS} ${isLoaded ? "opacity-100" : "opacity-0 absolute"}`}
        loading="lazy"
      />
    </div>
  );
}

export default ImageLoader;

{
  /* <diV className={`${classes} `}>
  <img
    className={`w-full h-full blur-2xl opacity-65 bg-gray-500 rounded-xl animate-pulse`}
    src="./low_res_img.jpg"
    alt="low resolution loading image"
  />
</diV>; */
}
