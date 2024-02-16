import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const { logout, user } = useContext(UserContext);
  const Navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Navigate("/");
    toast.success("Log out success!")
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            V
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            { (user && user.auth || window.location.pathname === '/') &&
            <>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-link">Manage Users</NavLink>
              </Nav>
              <Nav>
                {user && user.email && <span className="nav-link">Welcome {user.email} !</span>}
                <NavDropdown title="Setting">
                  {user && user.auth === true
                  ? <NavDropdown.Item onClick={() => handleLogout()}>Log Out</NavDropdown.Item>
                  : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                  }
                </NavDropdown>
              </Nav>
            </>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;