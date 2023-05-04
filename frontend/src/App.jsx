
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

//Theme
import customTheme from './customTheme/customTheme'
import Feed from './components/Feed/Feed'
import Welcome from './components/Welcome/welcome'
import Login from './components/login/Login'
import Register from './components/Register/Register'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      console.log("Ran")
      setIsLoggedIn(true);
    }
  },[])
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
              <Route path="/welcome" element={<Welcome/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
              <Route path="/feed" element={isLoggedIn ? <Feed handleLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        
              <Route path="/" element={isLoggedIn ? <Navigate to="/feed" /> : <Navigate to="/welcome" replace />} />
          </Routes>
        </BrowserRouter>

      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
