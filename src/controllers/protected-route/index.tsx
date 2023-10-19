import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/reducers";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.userReducer);
  return token && token.trim() !== "" ? children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
