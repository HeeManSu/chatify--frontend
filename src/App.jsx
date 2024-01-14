import "./App.css";
import RegisterPage from "./Pages/RegisterPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";
import ProtectedRoute from "./components/hoc/protected-route";
import AuthRoute from "./components/hoc/auth-route";
function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </>
    </Router>
  );
}

export default App;
