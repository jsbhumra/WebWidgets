import React, { useState, useEffect } from "react";
import { Textfit } from "react-textfit";

const Calendar = ({ width = 250, height = 250, showYear = false }) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const [dim, setDim] = useState(width < height ? width : height);
  const [fs, setFs] = useState("2 / 12");
  useEffect(() => {
    if (height < width) {
      setDim(height);
    } else {
      setDim(width);
    }
  }, [height, width]);

  const [calendar, setCalendar] = useState({
    date: new Date().getDate(),
    month: months[new Date().getMonth()],
    day: days[new Date().getDay()],
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setCalendar({
        date: date.getDate(),
        month: months[date.getMonth()],
        day: days[date.getDay()],
        year: date.getFullYear(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full  flex-col text-center font-bold p-4">
      <Textfit
        mode="multi"
        className="w-full h-full flex justify-center items-center"
      >
        {calendar.day}
        <br />
        {calendar.date} {calendar.month} {showYear && calendar.year}
      </Textfit>
    </div>
  );
};

export default Calendar;
