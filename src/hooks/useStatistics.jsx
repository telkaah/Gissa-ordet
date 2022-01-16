import { useEffect, useState } from 'react';

export const useStatistics = () => {
    const [dayResult, setDayResult] = useState();
    const [statistics, setStatistics] = useState();
    const [played, setPlayed] = useState();
    const [won, setWon] = useState();
    const [prevguesses, setPrevguesses] = useState();
  
    const updateValues = () =>{
        var calendar = localStorage.getItem("calendar");
        if(calendar){
            calendar = JSON.parse(calendar);
            setStatistics(calendar);
            setDayResult(calendar[(new Date()).toISOString().split('T')[0]]);
            setPlayed(Object.keys(calendar)?.length);

            var wins = 0;
            Object.keys(calendar).forEach(function(key) {
                if(calendar[key][0] === "WIN"){
                    wins = wins + 1;
                }
            });
            setWon(wins);

            var guesses = {};
            Object.keys(calendar).forEach(function(key) {
                if(calendar[key][0]  === "WIN"){
                    var tries = calendar[key][1];
                    if(!guesses[tries]){
                        guesses[tries] = 1;
                    }else{
                        guesses[tries] = guesses[tries] + 1;
                    }
                }
            });
            setPrevguesses(guesses);
        }else{
            setStatistics();
            setDayResult();
            setPlayed();
            setWon();
        }

    }

    useEffect(() => {
        const interval = setInterval(
            () => updateValues(),
            1000
          );
      
          return () => {
            clearInterval(interval);
          }        
    }, []);
  
    return { dayResult, statistics, played, won, prevguesses };
  };