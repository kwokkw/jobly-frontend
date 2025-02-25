import React, { useContext } from "react";
// import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { useState } from "react";
import UserContext from "./UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function checkLogIn() {
    return currentUser ? (
      <>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/" onClick={logout}>
          Log out {currentUser.username}
        </NavLink>
      </>
    ) : (
      <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div>
      <Navbar>
        <NavLink to="/">Jobly</NavLink>
        {checkLogIn()}
      </Navbar>
    </div>
  );
}

export default NavBar;
