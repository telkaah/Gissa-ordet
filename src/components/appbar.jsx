import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import HelpDialog from './help';
import StatsDialog from './stats';

export default function TopAppBar(props) {
    const {helpOpen, statisticsOpen} = props;

    return (
        <AppBar position="static">
          <Toolbar>
            <HelpDialog helpOpen={helpOpen} />
            <Box sx={{ flexGrow: 1, textAlign:'center' }}>
              <img src="./logo.png" alt="Gissa Ordet" height="45px" />
            </Box>
            <Box>
                <StatsDialog statisticsOpen={statisticsOpen} />
            </Box>
          </Toolbar>
        </AppBar>
    );
  }