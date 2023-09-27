import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds()
  })
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds()
      })
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  const convertToTwoDigit = (number) => {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2
    })
  }

  return (
    <div className='DigitalClock'>
      <span>{convertToTwoDigit(time.hours)}:</span>
      <span>{convertToTwoDigit(time.minutes)}:</span>
      <span>{convertToTwoDigit(time.seconds)}</span>
      <span>{time.hours >= 12 ? ' PM' : ' AM'}</span>
    </div>
  );
}

export default App;