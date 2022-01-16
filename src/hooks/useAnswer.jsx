import { useEffect, useState } from 'react';
import dictionary from '../dictionary.json';
var seedrandom = require('seedrandom');

export const useAnswer = () => {
    const [answer, setAnswer] = useState();
    var today = new Date();
    const random = seedrandom(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
  
    useEffect(() => {
        var newAnswer = Math.floor(random() * dictionary.length);
        setAnswer(dictionary[newAnswer].toUpperCase());
    }, [random]);
  
    return { answer };
  };