import { useEffect, useState } from "react";
import "./styles.css";

function Calendar() {
   const [sDate, setsDate] = useState(new Date());
   const [isCurrMonth, setIsCurrMonth] = useState(true)
   let lDay = new Date(sDate.getFullYear(),sDate.getMonth()+1,1).getDay()
   let lDate = new Date(sDate.getFullYear(),sDate.getMonth()+1,0).getDate()

   useEffect(() => {
      lDay = new Date(sDate.getFullYear(),sDate.getMonth()+1,1).getDay()
      lDate = new Date(sDate.getFullYear(),sDate.getMonth()+1,0).getDate()
   },[sDate])

   const findMonthDays = (y, m) => {
      return new Date(y, m + 1, 0).getDate();
   };

   const findFirstDay = (y, m) => {
      return new Date(y, m, 1).getDay();
   };

   const changeToPrevMonth = () => {
      setsDate((pDate) => {
         const pMonth = pDate.getMonth() - 1;
         const pYear = pDate.getFullYear();
         return new Date(pYear, pMonth);
      });
      var currMonth = new Date().getMonth()
      if(sDate.getMonth()!=currMonth+1){
            setIsCurrMonth(false)
        } else {
            setIsCurrMonth(true)
            setsDate(new Date())
        }
   };

   const changeToNextMonth = () => {
      setsDate((pDate) => {
         const nMonth = pDate.getMonth() + 1;
         const nYear = pDate.getFullYear();
         return new Date(nYear, nMonth);
      });
      var currMonth = new Date().getMonth()
      if(sDate.getMonth()!=currMonth-1){
            setIsCurrMonth(false)
        } else {
            setIsCurrMonth(true)
            setsDate(new Date())
        }
   };

   const showCalendar = () => {
      const currDate = new Date();
      const y = sDate.getFullYear();
      const m = sDate.getMonth();
      const mDays = findMonthDays(y, m);
      const newday = findFirstDay(y, m);
      var fDay = newday

      const allDays = [];

      const weekdays = ['S','M','T','W','T','F','S']

      // For weekday cells
      for (let p = 0; p < weekdays.length; p++) {
         allDays.push(<div key={`wd-${p}`} className = "box">{weekdays[p]}</div>);
      }

      console.table({lDay, lDate})

      if (lDay==1 && lDate==30){
         const date = new Date(y, m, 30);
         const isSelected = sDate && date.toDateString() === sDate.toDateString();
         allDays.push(
            <div
               key = {`d-30`}
               className = {`box ${(isSelected && isCurrMonth) ? "selected" : ""}`}
               >
               30
            </div>
         );
         fDay-=1
      } else if (lDay==1 && lDate==31){
         const date = new Date(y, m, 31);
         const isSelected = sDate && date.toDateString() === sDate.toDateString();
         allDays.push(
            <div
               key = {`d-31`}
               className = {`box ${(isSelected && isCurrMonth) ? "selected" : ""}`}
               >
               31
            </div>
         );
         fDay-=1
      } else if (lDay==2 && lDate==31){
         const date = new Date(y, m, 30);
         const isSelected = sDate && date.toDateString() === sDate.toDateString();
         const otherdate = new Date(y, m, 31);
         const isOtherSelected = sDate && otherdate.toDateString() === sDate.toDateString();
         allDays.push(
            <div
               key = {`d-30`}
               className = {`box ${(isSelected && isCurrMonth) ? "selected" : ""}`}
               >
               30
            </div>
         );
         allDays.push(
            <div
               key = {`d-31`}
               className = {`box ${(isOtherSelected && isCurrMonth) ? "selected" : ""}`}
               >
               31
            </div>
         );
         fDay-=2
      }

      // For empty cells
      for (let p = 0; p < fDay; p++) {
         allDays.push(<div key = {`em-${p}`} className = "box empty"></div>);
      }

      var theseDays = (35-newday<mDays)?35-newday:mDays

      // Show actual days
      for (let d = 1; d <= theseDays; d++) {
         const date = new Date(y, m, d);
         const isSelected = sDate && date.toDateString() === sDate.toDateString();

         allDays.push(
            <div
               key = {`d-${d}`}
               className = {`box ${(isSelected && isCurrMonth) ? "selected" : ""}`}
               >
               {d}
            </div>
         );
      }

      return allDays;
   };

   var theMonth = sDate.toLocaleString("default", {
    month: "long",
    // year: "numeric",
 }).toLocaleUpperCase()

 var theYear = sDate.toLocaleString("default", {
    // month: "long",
    year: "numeric",
 })

   return (
      <div className="main w-[16rem] h-[16rem]">
      {/* <h3>
         Creating the <i> calendar component </i> from scratch using React JS
      </h3> */}
        {/* <div className = "main"> */}
            <div className = "header">
                <h2 style={{ fontWeight: '800' }} >
                <span style={{ color: 'red' }} >{theMonth}</span>&nbsp;&nbsp;<span style={{ color: 'white' }} >{theYear}</span>
                </h2>
                <span>
                    <button className="px-2" onClick = {changeToPrevMonth}>{`<`}</button>
                    <button className="px-2" onClick = {changeToNextMonth}>{`>`}</button>
                </span>
            </div>
            <div className = "body">{showCalendar()} </div>
         {/* </div> */}
      </div>
   );
}

export default Calendar;