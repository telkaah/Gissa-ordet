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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:'center' }}>
              Gissa ordet
            </Typography>
            <Box>
                <StatsDialog statisticsOpen={statisticsOpen} />
            </Box>
          </Toolbar>
        </AppBar>
    );
  }