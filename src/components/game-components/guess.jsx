import Stack from '@mui/material/Stack';
import { React, useEffect, useState } from 'react';
import Letterbox from './letterbox';
import { useAnswer } from '../../hooks/useAnswer';

const defaultLayout = () => {
    return (
        <>
            <Letterbox letter="?" />
            <Letterbox letter="?" />
            <Letterbox letter="?" />
            <Letterbox letter="?" />
            <Letterbox letter="?" />
        </>
    )
}

export default function Guess(props) {
    const {index, guess, guesses} = props;
    const [letters, setLetters] = useState(defaultLayout); 
    const [active, setActive] = useState(); 
    var {answer} = useAnswer();

    useEffect(()=>{
        if(guesses){
            setActive(guesses.length === index);          

            if(guesses.length > index){
                var result = [];
                for (var i = 0; i < guesses[index].length; i++) {
                    if(guesses[index].charAt(i) === answer.charAt(i)){
                        result[i] = "correct";
                    }else if(answer.indexOf(guesses[index].charAt(i)) === -1){
                        result[i] = "wrong";
                    }else{
                        result[i] = "near";
                    }
                }

                let items = [];
                for (let i = 0; i < 5; i++) {
                    var letter = guesses[index].charAt(i);
                    items.push(<Letterbox key={i} color={result[i]} active={guesses.length === index} letter={letter} />)
                }       
                setLetters(items);         
            }else
            {
                let items = [];
                for (let i = 0; i < 5; i++) {
                    items.push(<Letterbox key={i} letter="" />)
                }    
                setLetters(items);             
            }
        }
    },[guesses, index, answer])

    useEffect(()=>{
        if(active){
            let items = [];
            for (let i = 0; i < 5; i++) {
                var letter = guess?.length > i && guess.charAt(i);
                items.push(<Letterbox active="true" key={i} letter={letter} />)
            }
            setLetters(items);
        }
    },[guess, active])

    return (
        <Stack direction="row" spacing={1} sx={{mt:1, width:'100%', justifyContent:'center'}}>
            {letters}
        </Stack>
    )

}