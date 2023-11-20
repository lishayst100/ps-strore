import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {ColorRing} from 'react-loader-spinner'
import './GameDetalis.scss'
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import Swal from 'sweetalert2';
import { baseUrl } from '../../features/utils';




const GameDetalis = () => {
  window.scroll(0,0)
    const {_id} = useParams()
    const dispatch = useDispatch()
    const [game , setGame] = useState({})
    const nav = useNavigate()
    const url = `${baseUrl}api/games/details/${_id}`;
    useEffect(()=>{
        fetch(url)
          .then((res) => res.json())
          .then((result) => setGame(result));
    },[url])

   const handleAddToCart = (product) => {
     dispatch(addToCart(product));
     Swal.fire({
       title: `${product.title} added to cart`,
       text: "Do you want continue shopping or go to cart?",
       imageUrl: `${product.frontImage}`,
       icon: "success",
       showCancelButton: true,
       cancelButtonText: "Continue Shopping",
       confirmButtonColor: "#198754",
       cancelButtonColor: "#3085d6",
       confirmButtonText: "Go to Cart",
     }).then((result) => {
       if (result.isConfirmed) {
         nav("/cart");
       }
     });
   };
    
  return (
    <>
      <div>
        {!game && <ColorRing />}
        {game && (
          <div
            className="container d-flex flex-column gap-5 justify-content-center p-5"
            key={game._id}
          >
            <div className="wrapperSectionOne d-flex flex-lg-row flex-column align-items-center">
              <div>
                <img
                  src={game.frontImage}
                  alt={game.title}
                  className="imgSize"
                />
              </div>
              <div className="d-flex flex-column gap-4">
                <div className="title-desc-platform">
                  <h3>{game.title}</h3>
                  <p className="h5">{game.description}</p>
                  <p className="h4">For :{game.platform}</p>
                </div>
                <div className="d-flex justify-content-around flex-column flex-lg-row gap-3 align-items-center">
                  <h3>Price: {game.price}$</h3>
                  <div className="">
                    <span className='font-bolder'>Rating</span>
                    <div className="rating font-bolder p-3 rounded-4 text-light px-4">
                      {game.rating}
                    </div>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleAddToCart(game);
                    }}
                  >
                    Add To Cart <FaCartPlus />
                  </button>
                </div>
              </div>
            </div>

            <img
              src={game.img1}
              alt="..."
              className="rounded"
              onError={({ currentTarget }) => {
                currentTarget.src =
                  "https://res.cloudinary.com/dabvgy03h/image/upload/v1677682002/games%20shop/ef3-placeholder-image_xtfeou.jpg";
              }}
            />
            <p className="h4">{game.description}</p>
            <img
              src={game.img2}
              alt="..."
              className="rounded"
              onError={({ currentTarget }) => {
                currentTarget.src =
                  "https://res.cloudinary.com/dabvgy03h/image/upload/v1677682002/games%20shop/ef3-placeholder-image_xtfeou.jpg";
              }}
            />
            <div>
              <iframe
                className="rounded img-fluid"
                width="480"
                height="315"
                src={game.iframe}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="d-flex justify-content-center gap-5 flex-row-reverse">
              <button
                className="btn btn-primary"
                onClick={() => {
                  nav(-1);
                }}
              >
                Back
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  handleAddToCart(game);
                }}
              >
                Add To Cart <FaCartPlus />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GameDetalis