import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { React, useEffect, useState } from 'react';
import { useAnswer } from '../hooks/useAnswer';
import { useStatistics } from '../hooks/useStatistics';

export default function StatsDialog(props) {
  const {statisticsOpen} = props;
  const [open, setOpen] = useState(false);
  const {dayResult, statistics } = useStatistics();
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
          <DialogContentText>
            {
              dayResult &&
              <>
                {
                  (dayResult[0] === "WIN") ?
                    <Typography variant="h5">
                        GRATTIS! Du klarade dagens ord!<br/>
                    </Typography>
                    :<>Tyvärr klarade du inte dagens ord</>
                }
                <Typography variant="body1">Dagens ord var: <b>{answer}</b></Typography>
                Imorgon kommer ett nytt ord!
              </>
            }
            {
              statistics ? 
              <>
                <br /><br />
                <Typography variant="body1">Här ser du hur det gått tidigare</Typography>
                {statistics.where}
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