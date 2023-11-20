import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { TfiPencilAlt ,TfiTrash } from "react-icons/tfi";
import { ColorRing } from 'react-loader-spinner';
import { baseUrl } from '../../features/utils';

const GetGames = () => {
    const nav = useNavigate()
    const [games ,setGames] =useState([])


    useEffect(()=>{
        getGames()
    },[])

    const getGames = () =>{
    fetch(`${baseUrl}api/games/admin`, {
      headers: { 'Authorization': localStorage.getItem("token") },
      
    })
      .then((res) => res.json())
      .then((result) => setGames(result))
      .catch((e)=> console.log(e))
      ;
    }


    const deleteGame = (id) => {
        fetch(`${baseUrl}api/games/delete/${id}`, {
          method: "DELETE",
          headers : { 'Authorization' : localStorage.getItem('token') }
        })
          .then((res) => res.json)
          .then((result) => getGames());
          
    }
  return (
    <div>
      {games.length === 0 && (<ColorRing/>)}
      {games.length > 0 && (
        <div className="row gap-3 container mx-auto py-5">
          <h2>Admin Page</h2>
          <button
            onClick={() => {
              nav("/addgame");
            }}
            className="btn btn-primary"
          >
            Add game
          </button>
          {games.map((game) => (
            <div
              className=" shadow-lg cardGame col-lg-3 col-sm-6 container p-3 rounded "
              key={game._id}
            >
              <h3>{game.title}</h3>
              <img src={game.frontImage}
              className = 'imageFront'
              onError = {({currentTarget})=>{
                currentTarget.src =
                  "https://res.cloudinary.com/dabvgy03h/image/upload/v1677682002/games%20shop/ef3-placeholder-image_xtfeou.jpg";
                   currentTarget.className = "img-fluid";
              }}
              alt="frontImage" />
              <h5>{game.price} $</h5>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    Swal.fire({
                      title: `Are you sure you want to delete ${game.title}?`,
                      showCancelButton: true,
                      confirmButtonText: "Delete",
                      confirmButtonColor: "#dc3545",
                      denyButtonText: `Don't save`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire("Game Deleted", "", "success");
                        deleteGame(game._id);
                        nav("/admin");
                      }
                    });
                  }}
                >
                  Delete <TfiTrash />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    nav(`update/${game._id}`);
                  }}
                >
                  Edit <TfiPencilAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetGames