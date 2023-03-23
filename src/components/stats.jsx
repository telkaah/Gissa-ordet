import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import { React, useEffect, useState } from 'react';
import { useAnswer } from '../hooks/useAnswer';
import { useStatistics } from '../hooks/useStatistics';
import { Fireworks } from '@fireworks-js/react'

export default function StatsDialog(props) {
  const {statisticsOpen} = props;
  const [open, setOpen] = useState(false);
  const {dayResult, statistics, played, won } = useStatistics();
  const { answer } = useAnswer();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(!dayResult){
      setOpen(false);
    }
  };

  useEffect(() => {
    if(statisticsOpen){
      setOpen(statisticsOpen);
    }
  }, [statisticsOpen]);


  return (
    <div>
      <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleClickOpen}
            >
        <LeaderboardIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText sx={{textAlign:"center"}}>
            {
              dayResult &&
              <Box sx={{mb:3}}>
                {
                  (dayResult[0] === "WIN") ?
                    <Typography variant="h5" sx={{textAlign:"center"}}>
                        GRATTIS! Du klarade dagens ord!<br/>
                    </Typography>
                    :<>Tyvärr klarade du inte dagens ord</>
                }
                <Typography variant="body1" mt="10px">Dagens ord var: <b>{answer}</b></Typography>
                <a href={"https://svenska.se/saol/?sok=" + answer} target="_blank">Läs mer om dagens ord här</a>
                <Typography variant="body1" mt="10px">Imorgon kommer ett nytt ord!</Typography>
                {
                  (dayResult[0] === "WIN") &&
                  <Fireworks
                    options={{
                      rocketsPoint: {
                        min: 0,
                        max: 100
                      }
                    }}
                    style={{
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      position: 'fixed',
                      pointerEvents: 'none'
                    }}
                    /> 
                }
              </Box>
            }
            {
              statistics ? 
              <>
                <Typography variant="h5">Statistik</Typography>
                <Stack direction="row"   justifyContent="center" alignItems="center" spacing={3} sx={{mt:2}}>
                  <div>
                    <Typography variant="h5">
                      {Object.keys(statistics)?.length}
                    </Typography>
                    <Typography variant="body1">
                      dagar spelat
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h5">
                      {Math.trunc(won/played*100)}%
                    </Typography>
                    <Typography variant="body1">
                      vinst
                    </Typography>
                  </div>                                                
                </Stack>
              </>
              :
              <>
                Du har inte spelat ännu
              </>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            !dayResult &&
            <Button onClick={handleClose} variant="contained" autoFocus>
              Gissa dagens ord
          </Button>
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}