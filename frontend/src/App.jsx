import Welcome from './components/welcome/welcome'
import Login from './components/login/Login'


import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

//Theme
import customTheme from './customTheme/customTheme'
function App() {


  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>

        <Welcome/>
        {/* <Login/> */}
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
