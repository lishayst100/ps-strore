
import { useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import AuthContext from '../../services/loginContext';
import './Header.scss'


const Header = () => {
  const { isLoggedIn} = useContext(AuthContext);
  const nav = useNavigate()
  
  return (
    <header className="d-flex flex-lg-row gap-4 flex-md-row flex-column-reverse flex justify-content-center">
      <div className="img-div">
        <img
          src="https://res.cloudinary.com/dabvgy03h/image/upload/v1683022075/games%20shop/ps5header_njr7s0.jpg"
          alt="ps5image"
          className="rounded-3 w-100 ps-img slide-right"
        />
      </div>

      <div className="d-flex flex-column gap-4 align-items-center justify-content-around text-con slide-left ">
        <h3 className="welcome">Welcome To PlayStation Store</h3>
        <h4 className="desc">
          The leading store for PlayStation games in the world at the most
          affordable prices!
        </h4>
        {!isLoggedIn && (
          <div>
            <div>
              <span className="font-bolder">Not Registered Yet? </span>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  nav("/signup");
                }}
              >
                Sign Up
              </button>
            </div>
            <u className='underline'>
              <p
                className="a-link"
                onClick={() => {
                  nav("/login");
                }}
              >
                Already Sign up? Click here to login{" "}
              </p>
            </u>
          </div>
        )}

        {isLoggedIn && <div className="flex-grow-1">
          <h3>
            Hey {JSON.parse(localStorage.getItem('user')).username} Welcome back!
            </h3>
            </div>}
        <a href="#game-list" className="btn btn-primary button">
          See Our Latest Games
        </a>
      </div>
    </header>
  );
}

export default Header