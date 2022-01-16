import { Box, Container } from '@mui/material';
import { React, useCallback, useEffect, useState } from 'react';
import dictionary from '../dictionary.json';
import { useAnswer } from '../hooks/useAnswer';
import usedkeys from '../usedkeys.json';
import TopAppBar from './appbar';
import Guess from './game-components/guess';
import Keyboard from './game-components/keyboard/keyboard';
import Message from './game-components/message';
import { useStatistics } from '../hooks/useStatistics';

export default function Game() {
    var {answer} = useAnswer();
    const [helpOpen, setHelpOpen] = useState(false);
    const [statisticsOpen, setStatisticsOpen] = useState(false);
    const [guess, setGuess] = useState("");
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const {dayResult, statistics } = useStatistics();

    const [guesses, setGuesses] = useState([]);
    const [activeGuess, setActiveGuess] = useState(0);    
    const [result, setResult] = useState([]);
    const [keyResult, setKeyResult] = useState({});

    const addLetter = (char) => {
        var newguess = (guess + char).substring(0,5).toUpperCase()
        setGuess(newguess);
    }

    const handleDelete = () => {
        setGuess(guess.slice(0, -1));
    }

    const storeDayResult = (result) => {
        var calendar = localStorage.getItem("calendar")
        if(!calendar){
            calendar = {};
        }else{
            calendar = JSON.parse(calendar);
        }
        calendar[(new Date()).toISOString().split('T')[0]] = result;
        localStorage.setItem('calendar', JSON.stringify(calendar));
    }

    const handleWin = () => {
        storeDayResult(["WIN", guesses.length + 1]);
        
        setMessage("GRATTIS DU VANN");
        setMessageOpen(true);
    }

    const handleLoss =  ()=> {
        storeDayResult(["LOSS", guesses.length + 1]);

        setMessage("Tyvärr lyckades du inte idag, dagen ord var " + answer);
        setMessageOpen(true);
    }

    useEffect(() => {
        if(guesses?.length > 0){
            var guess = guesses[guesses.length-1];
            var result = keyResult;
            for (var i = 0; i < guess.length; i++) {
                if(guess.charAt(i) === answer.charAt(i)){
                    result[guess.charAt(i)] = 'correct';
                }else if(answer.indexOf(guess.charAt(i)) === -1){
                    result[guess.charAt(i)] = 'wrong';
                }else{
                    result[guess.charAt(i)] = 'near';
                }        
            }   
            setKeyResult(result);
        }
        if(guesses.length === 6){
            handleLoss();
        }
    }, [guesses]);
    
    const handleGuess = () => {
        if(guess?.length !== 5){
            setMessage("Du måste gissa på 5 bokstäver");
            setMessageOpen(true);
            return;
        }
        if(!dictionary.includes(guess.toLowerCase())){
            setMessage("Ditt gissning finns inte med i ordlistan");
            setMessageOpen(true);
            setGuess("");
            return;
        }

        var resultArray = [];
        for (var i = 0; i < guess.length; i++) {
            if(guess.charAt(i) === answer.charAt(i)){
                resultArray[i] = "correct";
            }else if(answer.indexOf(guess.charAt(i)) === -1){
                resultArray[i] = "wrong";
            }else{
                resultArray[i] = "near";
            }
        }
        setResult( arr => [...arr, resultArray]);

        if(guess.toLowerCase() === answer.toLowerCase()){
            handleWin();
            return;
        }  
        setGuesses(oldArray => [...oldArray, guess]);    
        setGuess("");
        setActiveGuess(activeGuess + 1);
    }

    const checkKeyPress = useCallback((e) => {
        const { key, keyCode } = e;
        if(key === "Enter"){
            handleGuess();
        }else if(key === "Backspace"){
            handleDelete();
        }else if(usedkeys.includes(key)){
            addLetter(key);
        }
    },[guess]);
    
    useEffect(() => {
        window.addEventListener("keydown", checkKeyPress);
        return () => {
            window.removeEventListener("keydown", checkKeyPress);
        };
    }, [checkKeyPress]);

    useEffect(() => {
        if(dayResult){
            setStatisticsOpen(true);
            return;
        }
    }, [dayResult]);

    useEffect(() => {
        var helpshown = localStorage.getItem("helpshown");
        if(!helpshown){
            setHelpOpen(true);
            localStorage.setItem("helpshown", true)
        }
    }, []);   

    return (
        // SAVE STATE
        // Google analytics
        // github
        <Container maxWidth="md" sx={{height: '100%', display: 'flex', flexFlow: 'column'}} disableGutters="true" >
            <TopAppBar helpOpen={helpOpen} statisticsOpen={statisticsOpen} />
            <Box
              sx={{width:'100%', justifyContent:'center', alignItems:'center', flex: 1, display:'flex'}}
            >
                <Box sx={{flex:1}}>
                    <Guess result={result[0]} active={activeGuess === 0} guess={activeGuess === 0 ? guess : guesses[0]} />
                    <Guess result={result[1]} active={activeGuess === 1} guess={activeGuess === 1 ? guess : guesses[1]} />
                    <Guess result={result[2]} active={activeGuess === 2} guess={activeGuess === 2 ? guess : guesses[2]} />
                    <Guess result={result[3]} active={activeGuess === 3} guess={activeGuess === 3 ? guess : guesses[3]} />
                    <Guess result={result[4]} active={activeGuess === 4} guess={activeGuess === 4 ? guess : guesses[4]} />
                    <Guess result={result[5]} active={activeGuess === 5} guess={activeGuess === 5 ? guess : guesses[5]} />
                </Box>
           </Box>
            <Message open={messageOpen} message={message} setMessageOpen={setMessageOpen} />
            <Keyboard result={result} onClick={addLetter} onDelete={handleDelete} onGuess={handleGuess} keyResult={keyResult} />
        </Container>
    );
  }