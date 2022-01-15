import { Paper } from '@mui/material';
import * as React from 'react';

export default function Letterbox(props) {
    const {active, letter, color} = props;

    return (
        <Paper className={color} elevation={active ? 5 : 1} sx={{height: '64px', maxWidth: '64px', fontWeight: 'bolder', fontSize:'25px', display: 'flex', flexGrow: '1', justifyContent: 'center', alignItems:'center'}}>
            {letter ? 
              letter?.toUpperCase()
            :
              active ? 
                <>?</> 
              : <>&nbsp;</>
            }
        </Paper>
    );
  }