
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

//Usestate/Effect for token and BrowserRouter
import { useState, useEffect } from 'react'
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

//Theme
import customTheme from './customTheme/customTheme'
import Feed from './components/Feed/Feed'
import Welcome from './components/Welcome/welcome'
import Login from './components/login/Login'
import Register from './components/Register/Register'
import ResetPage from './components/Resetpage/ResetPage'


 

function App() {
  //get localstorage token and set state after getting to true
  const [token, setToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [resetNumber, setResetNumber] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setLoggedIn(true);
      setToken(token);
    }
  },[])
  const handleLogout = () => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  };
  const handleLogin = ()  => {
    setLoggedIn(true);
    setToken(localStorage.getItem("token"));
  };

  return (
    
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/welcome" element={ <Welcome/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={token ? <Navigate to="/feed"/> : <Login handleLogin={handleLogin}/>}/>
            <Route path="/feed" element={token ? <Feed handleLogout={handleLogout}/> : <Navigate to="/login"/>}/>
            <Route path="/" element={token ? <Navigate to="/feed"/> : <Navigate to="/welcome" replace/>}/>
            <Route path="/reset/askEmail" element={<ResetPage text={"Type in your Email to reset passwort"} resetNumber={resetNumber} setResetNumber={setResetNumber}/>}/>
          </Routes>
        </BrowserRouter>

      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
