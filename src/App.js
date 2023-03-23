import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import ReactGA from "react-ga4";
import './App.css';
import Game from './components/game';
import theme from './components/theme';

const TRACKING_ID = "G-XBQQX58C0W";

ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
            <Game />
      </ThemeProvider>
    </StyledEngineProvider>    
  );
}

export default App;
