import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import AuthContext from "../../services/loginContext";
import { useContext, useState} from "react";
import Swal from "sweetalert2";



function MainNavbar() {
     const cart = useSelector((state) => state.cart);
     const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
     const [navber, setNavber] = useState(false)
     const nav = useNavigate()

    const changeBgc =()=>{
      if(window.scrollY >= 80){
        setNavber(true)
      }else{
        setNavber(false)
      }
    }
   


    window.addEventListener('scroll', changeBgc)


  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          sticky="top"
          expand={expand}
          className={navber ? "navbar shadow-lg" : "actives"}
        >
          <Container fluid>
            <Navbar.Brand>
              <NavLink to={"/"} className="nav-link">
                <Logo />
                PS Store
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Logo />
                  PS Store
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1">
                  <NavLink to={"/"} className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to={"/about"} className="nav-link">
                    About
                  </NavLink>
                  {isAdmin && (
                    <NavLink className="nav-link" to="/admin">
                      Admin
                    </NavLink>
                  )}
                  {isAdmin && (
                    <NavLink className="nav-link" to="/admin/manageOrders">
                      Manage Orders
                    </NavLink>
                  )}
                  <NavLink className="nav-link" to="/cart">
                    <BsCart2 size={"2rem"} />
                    <span>
                      <span>{cart.CartTotalQuantity}</span>
                    </span>
                  </NavLink>
                </Nav>
                <div className="register-login justify-content-center align-items-center pe-2 d-lg-flex d-sm-flex gap-2">
                  {!isLoggedIn && (
                    <NavLink className="nav-link" to="/signup">
                      <button className="btn btn-primary">Register</button>
                    </NavLink>
                  )}
                  {!isLoggedIn && (
                    <NavLink className="nav-link" to="/login">
                      <button className="btn btn-outline-primary">Login</button>
                    </NavLink>
                  )}

                  {isLoggedIn && (
                    <NavLink to="/userOrder">
                      <span className="font-bolder">
                        Hello,{" "}
                        {JSON.parse(localStorage.getItem("user")).username}
                      </span>
                    </NavLink>
                  )}

                  {!isAdmin && (
                    <NavLink className="nav-link" to="/adminlogin">
                      <button className="btn btn-outline-primary">
                        Admin Login
                      </button>
                    </NavLink>
                  )}

                  {isLoggedIn && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        Swal.fire({
                          title: `Are you sure you want to logout?`,
                          showCancelButton: true,
                          confirmButtonText: "Yes , Logout",
                          confirmButtonColor: "#dc3545",
                          denyButtonText: `No`,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire("Logged Out", "", "success");
                            logout();
                            nav("/");
                          }
                        });
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MainNavbar;
