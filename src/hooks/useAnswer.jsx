import { useEffect, useState } from 'react';
import dictionary from '../dictionary.json';
var seedrandom = require('seedrandom');

export const useAnswer = () => {
    const [answer, setAnswer] = useState();

    const updateAnswer = () =>{
        var today = new Date();
        let random = seedrandom(today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate());
        var newAnswer = Math.floor(random() * dictionary.length);
        setAnswer(dictionary[newAnswer].toUpperCase());
    }

    useEffect(() => {
        const interval = setInterval(
            () => updateAnswer(),
            1000
          );
      
          return () => {
            clearInterval(interval);
          }        
    }, []);
  
    return { answer };
  };