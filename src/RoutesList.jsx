import { Routes, Route } from "react-router-dom";

import Homepage from "./routes/Homepage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Companies from "./routes/Companies";
import CompanyDetails from "./routes/CompanyDetails";
import Jobs from "./routes/Jobs";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import ProtectedRoutes from "./PrivateRoute";

function RoutesList({ login, signup }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route path="login" element={<Login login={login} />}></Route>

        <Route path="/signup" element={<Signup signup={signup} />}></Route>

        <Route
          path="/companies"
          element={
            <ProtectedRoutes>
              <Companies />
            </ProtectedRoutes>
          }
        ></Route>

        <Route
          path="/companies/:handle"
          element={
            <ProtectedRoutes>
              <CompanyDetails />
            </ProtectedRoutes>
          }
        ></Route>

        <Route
          path="/jobs"
          element={
            <ProtectedRoutes>
              <Jobs />
            </ProtectedRoutes>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        ></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default RoutesList;
