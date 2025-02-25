import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";
import UserContext from "./UserContext";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("token"));
  const [token, setToken] = useLocalStorage("token");
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = jwtDecode(token);
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    }
    getUser();
    setInfoLoaded(true);
  }, [token]);

  async function login(formData) {
    try {
      const token = await JoblyApi.login(formData);
      setToken(token);
    } catch (error) {
      console.error("Error login failed: ", error);
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(formData) {
    try {
      const token = await JoblyApi.signup(formData);
      setToken(token);

      return { success: true };
    } catch (error) {
      console.error("Signup failed: ", error);
      return { success: false };
    }
  }

  if (!infoLoaded) return <p>Loading...</p>;

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
          <main>
            <RoutesList login={login} signup={signup} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
