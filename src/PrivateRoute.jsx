import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

function ProtectedRoutes({ children }) {
  const { currentUser } = useContext(UserContext);
  //   const navigate = useNavigate();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoutes;
