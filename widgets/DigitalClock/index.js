"use client";
import { useState, useEffect } from "react";
import "./styles.css";

function DigitalClock({ clock24hr, showSeconds }) {

  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });

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
    <div className="DigitalClock">
      <span>{clock24hr?convertToTwoDigit(time.hours):convertToTwoDigit(time.hours%12)}:</span>
      <span>{convertToTwoDigit(time.minutes)}</span>
      {showSeconds?<span>:{convertToTwoDigit(time.seconds)}</span>:null}
      <span>{clock24hr?null:(time.hours >= 12 ? " PM" : " AM")}</span>
    </div>
  );
}

export default DigitalClock;