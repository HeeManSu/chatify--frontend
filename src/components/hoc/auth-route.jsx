import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  if (!children) {
    throw new Error("Please provide a child component");
  }
  if (isAuthenticated) {
    return null;
  }
  return children;
}

export default AuthRoute;
