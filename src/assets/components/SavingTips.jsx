import React from 'react'
import {useState, useEffect} from 'react'
import tipsArray from '../Data/TipsData';


const SavingTips = () => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tipsArray.length);
    setTip(tipsArray[randomIndex]);
  }, []);

  return (
    <div>
      <h2>Random Saving Tip</h2>
      <p>{tip}</p>
    </div>
  );
};

export default SavingTips;