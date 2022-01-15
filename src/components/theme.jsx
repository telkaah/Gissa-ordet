import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import boogaloo from '../fonts/boogaloo.ttf';


const theme = createTheme({
  palette: {
    primary: {
      main: '#03768B',
    },
    secondary: {
      main: '#3d5afe',
    } 
  },
  typography:{
	  h6:{
      textTransform: 'uppercase',
		  fontFamily: boogaloo
	  }
  }
});

export default theme;