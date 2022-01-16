import { Box, Stack } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useAnswer } from '../../../hooks/useAnswer';
import Backspace from './backspace';
import Enter from './enter';
import Key from './key';

export default function Keyboard(props) {
    const {onClick, onDelete, onGuess, guesses} = props;
    const [keyResult, setKeyResult] = useState({});
    var {answer} = useAnswer();

    useEffect(() => {
        if(guesses?.length > 0){
            var result = {};
            guesses.forEach(guess=>{
                for (var i = 0; i < guess.length; i++) {
                    if(guess.charAt(i) === answer.charAt(i)){
                        result[guess.charAt(i)] = 'correct';
                    }else if(answer.indexOf(guess.charAt(i)) === -1){
                        result[guess.charAt(i)] = 'wrong';
                    }else{
                        result[guess.charAt(i)] = 'near';
                    }        
                } 
            })
 
            setKeyResult(result);
        }
    }, [guesses, answer]);

    return (
        <Box sx={{ userSelect: "none", m:1 }}>
                <Stack direction="row" spacing={0.5} sx={{mt:0.5}}>
                    <Key keyResult={keyResult} onClick={onClick} letter="q" />
                    <Key keyResult={keyResult} onClick={onClick} letter="w" />
                    <Key keyResult={keyResult} onClick={onClick} letter="e" />
                    <Key keyResult={keyResult} onClick={onClick} letter="r" />
                    <Key keyResult={keyResult} onClick={onClick} letter="t" />
                    <Key keyResult={keyResult} onClick={onClick} letter="y" />
                    <Key keyResult={keyResult} onClick={onClick} letter="u" />
                    <Key keyResult={keyResult} onClick={onClick} letter="i" />
                    <Key keyResult={keyResult} onClick={onClick} letter="o" />
                    <Key keyResult={keyResult} onClick={onClick} letter="p" />
                    <Key keyResult={keyResult} onClick={onClick} letter="å" />
                </Stack>
                <Stack direction="row" spacing={0.5} sx={{mt:0.5}}>
                    <Key keyResult={keyResult} onClick={onClick} letter="a" />
                    <Key keyResult={keyResult} onClick={onClick} letter="s" />
                    <Key keyResult={keyResult} onClick={onClick} letter="d" />
                    <Key keyResult={keyResult} onClick={onClick} letter="f" />
                    <Key keyResult={keyResult} onClick={onClick} letter="g" />
                    <Key keyResult={keyResult} onClick={onClick} letter="h" />
                    <Key keyResult={keyResult} onClick={onClick} letter="j" />
                    <Key keyResult={keyResult} onClick={onClick} letter="k" />
                    <Key keyResult={keyResult} onClick={onClick} letter="l" />
                    <Key keyResult={keyResult} onClick={onClick} letter="ö" />
                    <Key keyResult={keyResult} onClick={onClick} letter="ä" />
                </Stack>
                <Stack direction="row" spacing={0.5} sx={{mt:0.5}}>
                    <Backspace onDelete={onDelete} />
                    <Key keyResult={keyResult} onClick={onClick} letter="z" />
                    <Key keyResult={keyResult} onClick={onClick} letter="x" />
                    <Key keyResult={keyResult} onClick={onClick} letter="c" />
                    <Key keyResult={keyResult} onClick={onClick} letter="v" />
                    <Key keyResult={keyResult} onClick={onClick} letter="b" />
                    <Key keyResult={keyResult} onClick={onClick} letter="n" />
                    <Key keyResult={keyResult} onClick={onClick} letter="m" />
                    <Enter letter="Gissa" onGuess={onGuess} />
                </Stack>
        </Box>
    );
  }