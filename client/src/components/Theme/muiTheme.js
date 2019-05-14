import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#c7a4ff',
    },
    secondary: {
      light: '#5ddef4',
      main: '#FFFFFF',
      dark: '#007c91'
    },
  }
})

export default theme
