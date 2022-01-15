import { useEffect, useState } from 'react';

export const useStatistics = () => {
    const [dayResult, setDayResult] = useState();
    const [statistics, setStatistics] = useState();
  
    const updateValues = () =>{
        var calendar = localStorage.getItem("calendar");
        if(calendar){
            calendar = JSON.parse(calendar);
            setStatistics(calendar);
            setDayResult(calendar[(new Date()).toISOString().split('T')[0]])
        }else{
            setStatistics();
            setDayResult();
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
  
    return { dayResult, statistics };
  };