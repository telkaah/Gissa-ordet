import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const EnterLayout = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: '4rem',
    fontWeight:'bold',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:'1',
    color: 'white',
  }));

export default function Enter(props) {
    const {onGuess} = props;
    return (
      <EnterLayout onClick={onGuess} className="main">
        {props.letter.toUpperCase()}
      </EnterLayout>
    );
}