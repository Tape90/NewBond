
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

//Usestate/Effect for token and BrowserRouter
import { useState, useEffect } from 'react'
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

//Theme
import customTheme from './customTheme/customTheme.js'
import Feed from './components/Feed/Feed'
import Welcome from './components/welcome/Welcome.jsx'
import Login from './components/login/Login.jsx'
import Register from './components/Register/Register.jsx'
import ResetPage from './components/Resetpage/ResetPage.jsx'


 

function App() {
  //get localstorage token and set state after getting to true
  const [token, setToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [resetAllowed,setResetAllowed] = useState(false);
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
            <Route path="/reset/verify" element={<ResetPage text={"Type in the code you received via Email"} resetNumber={resetNumber} 
            setResetAllowed={setResetAllowed} setResetNumber={setResetNumber}/>}/>
            <Route path="/reset/newPassword" element={ resetAllowed ?<ResetPage text={"Type in your new Password"}/> : <Navigate to="/login"/>}/>
          </Routes>
        </BrowserRouter>

      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
