import Welcome from './components/Welcome/welcome'
import Login from './components/Login/Login'


import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

//Theme
import customTheme from './customTheme/customTheme'
import Feed from './components/feed/Feed'


function App() {


  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>

        {/* <Welcome/>  */}
        {/* <Login/> */}
        <Feed/>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
