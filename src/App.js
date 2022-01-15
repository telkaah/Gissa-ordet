import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Game from './components/game';
import theme from './components/theme';

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
