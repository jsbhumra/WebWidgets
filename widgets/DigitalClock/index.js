"use client";
import { useState, useEffect } from "react";
import "./styles.css";

function DigitalClock({ width = 250, height = 250, clock24hr = true, showSeconds = false, vertical = true }) {
  const [dim,setDim] = useState(width<height?width:height)
 const [fs,setFs] = useState('5 / 10')
 useEffect(() => {
  if(height<width){
    setDim(height)
  } else {
    setDim(width)
  }
 },[height,width])

 useEffect(() => {
  if(showSeconds && vertical){
    setFs('3 / 10')
  } else if (!showSeconds && vertical){
    setFs('5 / 10')
  } else if (showSeconds && !vertical){
    setFs('2 / 10')
  } else {
    setFs('3 / 10')
  }
 },[showSeconds,vertical])
  // const [dir,setDir] = useState(vertical?'column':'row')
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });

  // useEffect(() => {
  //   if(vertical){
  //     setDir('column')
  //     // setFs('cqh')
  //   } else {
  //     setDir('row')
  //     // setFs('cqw')
  //   }
  //  },[vertical])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToTwoDigit = (number) => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  };

  return (
    <div className={`absolute DigitalClock w-full h-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2`} style={vertical?{lineHeight: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontVariantNumeric: 'tabular-nums lining-nums', fontSize: `calc(${fs} * ${dim}px)`}:{lineHeight: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: `calc(${fs} * ${dim}px)`}}>
      <span>{clock24hr?convertToTwoDigit(time.hours):convertToTwoDigit(time.hours%12)}{vertical?null:':'}</span>
      <span>{convertToTwoDigit(time.minutes)}</span>
      {showSeconds?<span>{vertical?null:':'}{convertToTwoDigit(time.seconds)}</span>:null}
      <span>{clock24hr?null:(time.hours >= 12 ? " PM" : " AM")}</span>
    </div>
  );
}


export default DigitalClock;
