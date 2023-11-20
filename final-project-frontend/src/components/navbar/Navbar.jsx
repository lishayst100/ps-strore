import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {BsCart2} from 'react-icons/bs'
import AuthContext from "../../services/loginContext";
import { useContext } from "react";


// yarn add react-bootstrap
const NavbarTop = () => {
    const { CartTotalQuantity } = useSelector(state => state.cart)
    const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);

    return (
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="shadow-lg position-fixed fixed-top "
      >
        <Container className="d-flex flex-coulmn">
          <NavLink to="/" className="navbar-brand p-2">
            <span className="text-muted">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg"
                alt=""
                className="w-25"
              />
            </span>
          </NavLink>
          {/* Burger: */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
              {isAdmin && (
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              )}

              <NavLink className="nav-link flex-grow" to="/cart">
                <BsCart2 size={"2rem"} />
                <span>
                  <span>{CartTotalQuantity}</span>
                </span>
              </NavLink>

              {!isLoggedIn && (
                <NavLink className="nav-link" to="/signup">
                  <button className="btn btn-primary">Register</button>
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink className="nav-link" to="/login">
                  <button className="btn btn-primary">Login</button>
                </NavLink>
              )}
          
              {!isAdmin && (
                <NavLink className="nav-link" to="/adminlogin">
                  <button className="btn btn-primary">Admin Login</button>
                </NavLink>
              )}

              {isLoggedIn && (
                <NavLink className="nav-link" to="/">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavbarTop;