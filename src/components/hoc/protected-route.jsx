import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated);
  const navigate = useNavigate();
  if (!children) {
    throw new Error("Please provide a child component");
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  return children;
}

export default ProtectedRoute;
