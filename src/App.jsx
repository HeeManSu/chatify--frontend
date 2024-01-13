import './App.css'
import RegisterPage from './Pages/RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { ProtectedRoute } from 'protected-route-react'
import { Toaster } from 'react-hot-toast'
import LoginPage from './Pages/LoginPage';
import ChatPage from './Pages/ChatPage';
import { useSelector } from 'react-redux';
import { ProtectedRoute } from 'protected-route-react'


function App() {

  const { isAuthenticated } = useSelector(state => state.user);

  return (
    <Router>
      <>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/chat"
            >
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path='/register' element={
            <ProtectedRoute
            isAuthenticated= {!isAuthenticated}
            redirect="/chat"
            >

              <RegisterPage />
            </ProtectedRoute>

          } />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
        <Toaster />
      </>

    </Router>
  )
}

export default App
