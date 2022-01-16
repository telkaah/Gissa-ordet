import Snackbar from '@mui/material/Snackbar';
import { React } from 'react';

export default function Message(props) {
    const vertical = 'top';
    const horizontal = 'center';
    const {open, message, setMessageOpen} = props;

    return (
        <div>
            <Snackbar
            autoHideDuration={3000} 
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            message={message}
            onClose={()=>setMessageOpen(false)}
            key={vertical + horizontal}
            />
        </div>
        );
  }