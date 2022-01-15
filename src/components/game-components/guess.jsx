import Stack from '@mui/material/Stack';
import { React } from 'react';
import Letterbox from './letterbox';

export default function Guess(props) {
    const {guess, active, result} = props;

    const items = []

    for (let i = 0; i < 5; i++) {
        items.push(<Letterbox key={i} color={result && result[i]} active={active} letter={guess?.length > i ? guess.charAt(i) : ''} />)
    }

    return (
        <Stack direction="row" spacing={1} sx={{mt:1, width:'100%', justifyContent:'center'}}>
            {items}
        </Stack>
    )

}