import React, { useState } from 'react'

const ImgAbout = () => {


   const [scroll, setScroll] = useState(false);

   const scrollItems = () => {
     if (window.scrollY >= 122) {
       setScroll(true);
     }
   };

   window.addEventListener("scroll", scrollItems);
  return (
    <div className="container py-3 ">
      <img
        src="https://res.cloudinary.com/dabvgy03h/image/upload/v1678300602/games%20shop/godOfwarCarusel_arc3wm.webp"
        alt=""
        className="img-fluid rounded-3"
      />
    </div>
  );
}

export default ImgAbout