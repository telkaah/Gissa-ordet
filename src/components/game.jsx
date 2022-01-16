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
import { useDate } from '../hooks/useDate';

export default function Game() {
    var {answer} = useAnswer();
    const [helpOpen, setHelpOpen] = useState(false);
    const [statisticsOpen, setStatisticsOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const {dayResult} = useStatistics();
    const {date} = useDate();

    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [activeGuess, setActiveGuess] = useState(0);    

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

    const handleLoss =  () => {
        storeDayResult(["LOSS", guesses.length + 1]);

        setMessage("Tyvärr lyckades du inte idag, dagen ord var " + answer);
        setMessageOpen(true);
    }

    useEffect(() => {
        if(guesses?.length === 5){
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

        if(guess.toLowerCase() === answer.toLowerCase()){
            handleWin();
            return;
        }  
        setGuesses(oldArray => [...oldArray, guess]);    
        setGuess("");
        setActiveGuess(activeGuess + 1);
    }

    const checkKeyPress = useCallback((e) => {
        const { key } = e;
        if(key === "Enter"){
            handleGuess();
        }else if(key === "Backspace"){
            handleDelete();
        }else if(usedkeys.includes(key)){
            addLetter(key);
        }
    },[guess, handleGuess, handleDelete, addLetter]);
    
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

    useEffect(() => {
        if(date){
            var progress = localStorage.getItem("dateprogress");
            if(progress !== date){
                setGuesses([]);
                setGuess("");
                setActiveGuess(0);
                localStorage.setItem("dateprogress", date);
            }
        }
    }, [date]);   
  

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
                    <Guess index={0} guess={guess} guesses={guesses} />
                    <Guess index={1} guess={guess} guesses={guesses} />
                    <Guess index={2} guess={guess} guesses={guesses} />
                    <Guess index={3} guess={guess} guesses={guesses} />
                    <Guess index={4} guess={guess} guesses={guesses} />
                </Box>
           </Box>
            <Message open={messageOpen} message={message} setMessageOpen={setMessageOpen} />
            <Keyboard onClick={addLetter} onDelete={handleDelete} onGuess={handleGuess} guesses={guesses} />
        </Container>
    );
  }