import {useEffect, useState} from 'react'
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from 'react-router-dom';
import './Carusel.scss'
import { baseUrl } from '../../features/utils';




function Carusel() {
    const [img, setImg] = useState([]);

    useEffect(() => {
      fetch(`${baseUrl}api/carusel`)
        .then((res) => res.json())
        .then((result) => setImg(result));
    }, []);
  return (
    <Carousel>
      {img.map((game) => (
        <Carousel.Item className="carusel-item-1" key={game.link}>
          <div
            className="overlay-image"
            style={{
              backgroundImage: `url(${game.img})`,
            }}
          ></div>
          <NavLink to={`/game/${game.link}`}>
            <Carousel.Caption className="text-container">
              <h3>{game.title}</h3>
              <p>Learn more and purchase</p>
            </Carousel.Caption>
          </NavLink>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carusel;