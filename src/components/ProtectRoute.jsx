import { Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export default function ProtectedRoute({ children }) {
  const {user,loading} = useUser();

  if(loading)return <div>Loading...</div>
  

  if(!user)return <Navigate to="/login" replace />;

  return children;
}
