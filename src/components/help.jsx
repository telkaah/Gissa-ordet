import { React, useEffect, useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Letterbox from './game-components/letterbox';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

export default function HelpDialog(props) {
  const {helpOpen} = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if(helpOpen){
      setOpen(helpOpen);
    }
  }, [helpOpen]);


  return (
    <div>
      <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClickOpen}
            >
        <HelpOutlineIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Gissa ordet
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">Regler</Typography>
            <Typography variant="body1">
              <ul>
                  <li>
                      Du har 6 försök på dig att gissa ordet
                  </li>
                  <li>
                      Varje gissning måste vara ett giltigt ord
                  </li> 
                  <li>
                      Efter varje försök markeras bokstäverna med färg som ger dig ledtrådar
                  </li>                 
              </ul>
            </Typography>
            <Typography variant="h6">Exempel</Typography>
            <Stack direction="row" justifyContent="flex-start" spacing={1} alignItems="center" sx={{m:3}}>
              <Letterbox letter="K" color="correct" />
              <Letterbox letter="A" color="wrong" />
              <Letterbox letter="M" color="wrong" />
              <Letterbox letter="E" color="near" />
              <Letterbox letter="L" color="near" />
            </Stack>
            <Typography variant="body1">
              Här har vi gissat på ordet <b>KAMEL</b>. Vilket inte var rätt ord denna dag men ger oss följande ledtrådar. 
              <ul>
                <li>Bokstaven <b>K</b> är rätt och sitter på rätt position.</li>
                <li>Bokstäverna <b>A</b> och <b>M</b>  finns inte med i dagens ord</li>
                <li>Bokstäverna <b>E</b> och <b>L</b>  finns med i ordet men är på fel plats</li>
              </ul>
            </Typography>
          
            

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}