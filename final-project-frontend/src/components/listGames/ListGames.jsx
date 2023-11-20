import { useState, useEffect} from "react";
import { baseUrl, url } from "../../features/utils";
import {ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./listGames.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { FaCartPlus, FaBookOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import NoGameFound from "../noGameFound/NoGameFound";
import FiveStars from "../stars/FiveStars";
import FourAndHalf from "../stars/FourAndHalf";
import FourStars from "../stars/FourStars";
import ThreeAndHalfStars from "../stars/ThreeAndHalf";
import ThreeStars from "../stars/ThreeStars";
import TwoAndHalfStars from "../stars/TwoAndHalf";
import HalfStar from "../stars/HalfStar";
import OneStar from "../stars/OneStar"
import OneAndHalfStars from "../stars/OneAndHalf"
import TwoStars from "../stars/TwoStars"






const ListGames = () => {
  const [games, setGames] = useState([]);
  const [showFilters, setShowFilters] = useState(false)
  const [isLoadding, setIsLoadding] = useState(false)
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    setIsLoadding(true)
    getGames()
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Swal.fire({
      title: `${product.title} added to cart`,
      text: "Do you want continue shopping or go to cart?",
      imageUrl:`${product.frontImage}`,
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

  const getGames = () => {
    fetch(`${baseUrl}api/games/allgames`)
      .then((res) => res.json())
      .then((result) => {
        setGames(result);
        setIsLoadding(false);
      })
      .catch((e) => console.log(e));
  }


  const filterGames = (endpoint) => {
    fetch(`${baseUrl}api/games/${endpoint}games`)
      .then((res) => res.json())
      .then((result) => setGames(result));
  };



  const searchGames = async(e) => {
    const key = e.target.value
    if(key){
      let result = await fetch(`${baseUrl}api/games/search/${key}`);
      result = await result.json();
      if (result) {
        setGames(result);
      }}else{
        getGames()
      }
    
  }


  const handlePriceRange = () => {
    fetch(`${baseUrl}api/games/games?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    .then(res => res.json())
    .then(result => setGames(result))
  }

  return (
    <div className=" gap-3 container mx-auto py-5 " id="game-list">
      <div className="d-flex gap-3 justify-content-center flex-column shadow-lg p-4 rounded">
        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <label htmlFor="" className="font-bolder">
            Search:
          </label>
          <input
            type="text"
            placeholder="Search for a Game"
            className="form-control w-75"
            onChange={(e) => {
              searchGames(e);
            }}
          />

          <button
            className="btn btn-danger"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            {showFilters ? "Less Filters" : "More Filters"}
          </button>
        </div>
        <div className={showFilters ? "wrapper open" : "wrapper"}>
          <div className="expandable d-flex flex-column gap-4">
            <label htmlFor="" className="font-bolder">
              Sort Or Filter By
            </label>
            <div className="filter-btns d-flex gap-2 justify-content-center flex-wrap">
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  filterGames("ps4");
                }}
              >
                PS4 games
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  filterGames("ps5");
                }}
              >
                PS5 games
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  filterGames("all");
                }}
              >
                All games
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  filterGames("sortByPricelth");
                }}
              >
                Price Low to High
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  filterGames("sortByPricehtl");
                }}
              >
                Price High to Low
              </button>
            </div>
            <div className="d-flex justify-content-center flex-lg-row flex-column align-items-center gap-2 flex-wrap">
              <div className="d-flex flex-column align-items-start">
                <label htmlFor="">Min Price:</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex flex-column align-items-start">
                <label htmlFor="">Max Price:</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                />
              </div>
              <button onClick={handlePriceRange} className="btn btn-success mt-4">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoadding && <ColorRing />}
      <div className="row gap-2">
        {games &&
          games.map((game) => (
            <div
              className=" shadow cardGame col-lg-3 col-sm-6 container p-3 rounded mt-4 "
              key={game._id}
            >
              <img
                src={game.frontImage}
                className="p-5 frontImage "
                alt="frontImage"
                onError={({ currentTarget }) => {
                  currentTarget.src =
                    "https://res.cloudinary.com/dabvgy03h/image/upload/v1677682002/games%20shop/ef3-placeholder-image_xtfeou.jpg";
                  currentTarget.className = "img-fluid";
                }}
              />

              <div className="d-flex justify-content-between ">
                <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-evenly gap-2">
                  <p className="title">{game.title}</p>
                  <div className="stars">
                    {game.rating === 10 && <FiveStars />}
                    {game.rating === 9 && <FourAndHalf />}
                    {game.rating === 8 && <FourStars />}
                    {game.rating === 7 && <ThreeAndHalfStars />}
                    {game.rating === 6 && <ThreeStars />}
                    {game.rating === 5 && <TwoAndHalfStars />}
                    {game.rating === 4 && <TwoStars />}
                    {game.rating === 3 && <OneAndHalfStars />}
                    {game.rating === 2 && <OneStar />}
                    {game.rating === 1 && <HalfStar />}
                  </div>

                  <p className="pricer">${game.price}</p>
                </div>

                <div className="d-flex flex-column justify-content-center gap-2  align-content-center">
                  <button
                    className="btn btn-success text-light buttons"
                    onClick={() => {
                      handleAddToCart(game);
                    }}
                  >
                    Add to Cart <FaCartPlus />
                  </button>
                  <button
                    className="btn btn-outline-primary buttons"
                    onClick={() => {
                      nav(`game/${game._id}`);
                    }}
                  >
                    Learn More <FaBookOpen />
                  </button>
                </div>
              </div>
            </div>
          ))}
        {games.length === 0 && <NoGameFound />}
      </div>
    </div>
  );
};

export default ListGames;
