import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './admin.scss'
import { baseUrl } from "../../features/utils";

const AddGame = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [price, setPrice] = useState(10);
  const [rating, setRating] = useState(1);
  const [iframe, setIframe] = useState("");
  const [platform, setPlatform] = useState("PS5");
  const [isLoading, setIsLoading] = useState(false)

  const restartState = () => {
    setDescription("");
    setFrontImage("");
    setIframe("");
    setImg1("");
    setImg2("");
    setPrice("");
    setRating("");
    setTitle("");
    setPlatform("PS5");
  };

  const addGameToDb = () => {
    const newGame = {
      title,
      description,
      frontImage,
      img1,
      img2,
      price,
      rating,
      iframe,
      platform,
    };
    fetch(`${baseUrl}api/games/addgame`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , 'Authorization' : localStorage.getItem('token') },
      body: JSON.stringify(newGame),
      
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
    restartState();
     Swal.fire({
       title: "Your Game has been added!!! ",
       text: " Do you want to add another Game?",
       icon: "success",
       timer: 10000,
       confirmButtonText: "Go to Home page",
       confirmButtonColor: "#198754",
       showCancelButton: true,
       cancelButtonText: "Yes , I'm want",
       cancelButtonColor: "#0d6efd",
     }).then((result) => {
       if (result.isConfirmed) {
         nav("/");
       }
     });
    setIsLoading(false)
    
  };
const addAndWait = () => {
  setIsLoading(true);
setTimeout(() => {
  addGameToDb();
}, 2000);
}
  

  return (
    <div>
      <div className="d-flex container justify-content-center flex-column gap-2 w-75 mx-auto shadow-lg p-3 rounded body">
        <div className="d-flex flex-column  p-4 rounded container">
          <label htmlFor="name" className="font-bolder">
            Name Of The Game:
          </label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="description" className="font-bolder">
            Description Of The Game:
          </label>
          <textarea
            placeholder="for example, a sports game"
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="image" className="font-bolder">
            Image of The Game:
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Please, enter a url image here..."
            value={frontImage}
            onChange={(e) => setFrontImage(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="image" className="font-bolder">
            Body Image for The Game:
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Please, enter a url image here..."
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="image" className="font-bolder">
            Second Body Image for The Game:
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Please, enter a url image here..."
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="d-flex flex-column  p-4 rounded col-lg">
            <label htmlFor="price" className="font-bolder">
              Price Of The Game: (in USD)
            </label>
            <input
              min={1}
              className="form-control"
              type="number"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </div>
          <div className="d-flex flex-column  p-4 rounded col-lg">
            <label htmlFor="rating" className="font-bolder">
              Rating Of The Game: (1 - 10)
            </label>
            <input
              className="form-control"
              min={1}
              max={10}
              type="number"
              value={rating}
              onChange={(e) => {
                e.target.value > 10 ? setRating(10) : setRating(e.target.value);
              }}
            />
          </div>
          <div className="col-lg d-flex flex-column  p-4 rounded">
            <label htmlFor="platform" className="font-bolder">
              Platform
            </label>
            <select
              className="form-select "
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
            >
              <option value="PS5">PS5</option>
              <option value="PS4">PS4</option>
            </select>
          </div>
        </div>

        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="iframe" className="font-bolder">
            Iframe of the Game
          </label>
          <input
            className="form-control"
            type="text"
            value={iframe}
            onChange={(e) => setIframe(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center justify-content-center my-3 gap-5">
          <button
            className="btn btn-success"
            onClick={() => {
              addAndWait();
            }}
          >
            Add My Game
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              nav(-1);
            }}
          >
            Back
          </button>
        </div>
        {isLoading && (
          <div className="d-flex flex-column align-items-center">
            <h5>Just a moment, Adding your Game</h5>
            <ColorRing />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGame;
