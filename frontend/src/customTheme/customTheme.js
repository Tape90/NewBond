import {createTheme} from "@mui/material"

const customTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#B9EDDD',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#577D86',
        secondary: '#000000',
      },
      success: {
        main: '#FFABAB',
      },
    },
  }
)

export default customTheme