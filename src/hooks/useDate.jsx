import { useEffect, useState } from 'react';

export const useDate = () => {
    const [date, setDate] = useState();
  
    const updateDate = () =>{
        var today = new Date();
        setDate(today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate())
    }

    useEffect(() => {
        const interval = setInterval(
            () => updateDate(),
            1000
          );
      
          return () => {
            clearInterval(interval);
          }        
    }, []);
  
    return { date };
  };