import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#62efff',
      main: '#ffe0b2',
      dark: '#008ba3',
      constractText: '#fff'
    },
    secondary: {
      light: '#5ddef4',
      main: '#FFFFFF',
      dark: '#007c91'
    },
  }
})

export default theme
