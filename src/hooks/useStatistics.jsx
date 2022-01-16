import { useEffect, useState } from 'react';

export const useStatistics = () => {
    const [dayResult, setDayResult] = useState();
    const [statistics, setStatistics] = useState();
    const [played, setPlayed] = useState();
    const [won, setWon] = useState();
    const [streak, setStreak] = useState();
  
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
            var streak = 0;
            Object.keys(calendar).forEach(function(key) {
                if(calendar[key][0]  === "WIN"){
                    streak = streak + 1;
                }
            });
            setStreak(streak);
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
  
    return { dayResult, statistics, played, won, streak };
  };