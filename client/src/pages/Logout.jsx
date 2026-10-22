import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await LogoutUser();
        toast.success("Logout successful");
      } catch (error) {
        console.error("Logout failed", error);
        toast.error("Logout failed");
      }
    };
    handleLogout();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};