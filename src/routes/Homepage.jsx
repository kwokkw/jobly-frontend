import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      {currentUser ? (
        <p>Welcom Back, {currentUser.username}</p>
      ) : (
        <div>
          <Link className="btn btn-primary m-3" to={"/login"}>
            Log in
          </Link>
          <Link className="btn btn-primary" to={"/signup"}>
            {" "}
            Sign up
          </Link>
        </div>
      )}
    </>
  );
}
export default Homepage;
