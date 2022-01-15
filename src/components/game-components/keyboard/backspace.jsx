import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from 'react';

const BackspaceLayout = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: '4rem',
    fontWeight:'bold',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:'1'
  }));

export default function Backspace(props) {
    const {onDelete} = props;

    return (
      <BackspaceLayout onClick={onDelete} className="light">
        Radera
      </BackspaceLayout>
    );
}