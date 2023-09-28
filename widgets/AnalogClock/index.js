// jsx
import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Clock() {
 const [time, setTime] = useState(new Date());

 useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
 }, []);

 return (
    <div className="Analogclock">
      <div
        className="Analoghour_hand"
        style={{
          transform: `translateX(-50%) rotateZ(${time.getHours() * 30}deg)`
        }}
      />
      <div
        className="Analogmin_hand"
        style={{
          transform: `translateX(-50%) rotateZ(${time.getMinutes() * 6}deg)`
        }}
      />
      <div
        className="Analogsec_hand"
        style={{
          transform: `translateX(-50%) rotateZ(${time.getSeconds() * 6}deg)`
        }}
      />
      <div className="Analoginner">
        <span className="Analogtwelve">12</span>
        <span className="Analogone">1</span>
        <span className="Analogtwo">2</span>
        <span className="Analogthree">3</span>
        <span className="Analogfour">4</span>
        <span className="Analogfive">5</span>
        <span className="Analogsix">6</span>
        <span className="Analogseven">7</span>
        <span className="Analogeight">8</span>
        <span className="Analognine">9</span>
        <span className="Analogten">10</span>
        <span className="Analogeleven">11</span>
      </div>
    </div>
 );
}