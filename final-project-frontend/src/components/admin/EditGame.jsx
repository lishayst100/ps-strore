import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { baseUrl } from '../../features/utils';

const EditGame = () => {

    const nav = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frontImage, setFrontImage] = useState("");
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [price, setPrice] = useState(5);
    const [rating, setRating] = useState();
    const [platform, setPlatform] = useState("PS5");
    const {_id} = useParams()
    

 const getProduct = () => {
    fetch(`${baseUrl}api/games/details/${_id}`)
    .then(res => res.json())
    .then(result => {
       setTitle(result.title);
       setDescription(result.description);
       setFrontImage(result.frontImage);
       setImg1(result.img1);
       setImg2(result.img2);
       setPrice(result.price);
       setRating(result.rating);
       setPlatform(result.platform);
    })
 }

    useEffect(()=>{
    getProduct();    
    },[])
    const EditedCard = {
      title,
      description,
      frontImage,
      img1,
      img2,
      price,
      rating,
      platform
    };

    const finishEditCard = (id) =>{
        fetch(`${baseUrl}api/games/update/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json",
          'Authorization' : localStorage.getItem('token') },
          body: JSON.stringify(EditedCard),
        }).then(res => res.json())
        .catch(e => console.log(e));
        
    }

  return (
    <div className="p-5 container bg-body">
      <h2>Edit Your Game</h2>
      <div className="d-flex  justify-content-center flex-column gap-2 w-75 mx-auto shadow-lg p-3 rounded">
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="name" className="font-bolder">
            Name Of The Product:
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
            Description Of The Product:
          </label>
          <textarea
            placeholder="for example, 6 inch display"
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="image" className="font-bolder">
            Image of The Product:
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
            Body Image for The Product:
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
            Second Body Image for The Product:
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Please, enter a url image here..."
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="price" className="font-bolder">
            Price Of The Product: (in USD)
          </label>
          <input
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            min= {1}
          />
        </div>
        <div className="d-flex flex-column  p-4 rounded">
          <label htmlFor="rating" className="font-bolder">
            Rating Of The Product: (1 - 10)
          </label>
          <input
            className="form-control"
            type="number"
            value={rating}
            min = {1}
            max = {10}
            onChange={(e) =>
              e.target.value > 10 ? setRating(10) : setRating(+e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="platform" className="font-bolder">
            Platform
          </label>
          <select
            className="form-select w-50 mx-auto"
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

      <button
        className="btn btn-success"
        onClick={() => {
          Swal.fire({
            title: `Do you want save these changes?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#dc3545",
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Game Updated", "", "success");
              finishEditCard(_id);
              nav("/admin");
            }
          });
        }}
      >
        Finish
      </button>
      <button className='btn btn-primary' onClick={()=>{nav(-1)}}>Back</button>
    </div>
  );
}

      
export default EditGame