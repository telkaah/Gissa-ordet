import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { React } from 'react';

const KeyLayout = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: '4rem',
    fontWeight:'bold',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:'1'
  }));

export default function Key(props) {
    const {keyResult, onClick, letter } = props;

    return (
      <KeyLayout onClick={()=>{onClick(letter.toUpperCase())}}
        className={keyResult[letter.toUpperCase()] ? keyResult[letter.toUpperCase()] : "light"}
      >
        {letter.toUpperCase() }
      </KeyLayout>
    );
}