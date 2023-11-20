import React from 'react'
import Lorem from '../Lorem/Lorem';
import TextAbout from '../Lorem/TextAbout';

const HeaderAbout = () => {
  return (
    <div className="d-flex flex-column align-items-center gap-4 container">
      <TextAbout/>
      <img
        src="https://res.cloudinary.com/dabvgy03h/image/upload/v1683025432/games%20shop/about-img_tumrfw.png"
        className="w-50 tilt-in-right-1"
        alt=""
      />
    </div>
  );
}

export default HeaderAbout