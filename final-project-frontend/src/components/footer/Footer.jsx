import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link, Navigate, NavLink } from 'react-router-dom';
import './Footer.scss'


const Footer = () => {
  return (
    <div className="footer p-4 row container-fluid m-0">
      <div className="d-flex justify-content-around col">
        <p>&copy; Lishay Shem Tov 2023 All Rights Reserved</p>
        <div className="link-menu ">
          <Link to={"/"} className="link-menu">
            Home
          </Link>
          <Link to={"/about"} className="link-menu">
            About
          </Link>
          <Link to={"/cart"} className="link-menu">
            Cart
          </Link>
        </div>
      </div>
      <div className="icons d-flex justify-content-center gap-3 col">
        <NavLink
          to={"https://www.linkedin.com/in/lishay-shem-tov-0b9887261/"}
          target="_blank"
        >
          <i className="bigger-icons text-dark">
            <BsLinkedin />
          </i>
        </NavLink>
        <NavLink to={"https://www.instagram.com/"} target="_blank">
          <i className="bigger-icons text-dark">
            <BsInstagram />
          </i>
        </NavLink>
        <NavLink to={"https://www.facebook.com/"} target="_blank">
          <i className="bigger-icons text-dark">
            <BsFacebook />
          </i>
        </NavLink>
      </div>
    </div>
  );
}

export default Footer