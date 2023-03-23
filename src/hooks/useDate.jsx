import { useEffect, useState } from 'react';

export const useDate = () => {
    const [date, setDate] = useState();
  
    const updateDate = () =>{
        var today = new Date();
        setDate((new Date()).toISOString().split('T')[0]);
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