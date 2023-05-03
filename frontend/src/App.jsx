
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

//Theme
import customTheme from './customTheme/customTheme'
import Feed from './components/Feed/Feed'
import Welcome from './components/Welcome/welcome'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
 

function App() {


  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        {/* <Register/> */}
        {/* <Welcome/>  */}
        <Login/>
        {/* <Feed/> */}

      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
