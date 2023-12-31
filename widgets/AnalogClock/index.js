// jsx
import React, { useState, useEffect } from "react";
import "./styles.css";

export default function AnalogClock({ width = 250, height = 250, showSeconds = true, smooth = true }) {
const [time, setTime] = useState(new Date());
const [dim,setDim] = useState(width<height?width:height)
//  const [fs,setFs] = useState(width<height?'cqw':'cqh')
useEffect(() => {
if(height<width){
	setDim(height)
	// setFs('cqh')
} else {
	setDim(width)
	// setFs('cqw')
}
},[height,width])

useEffect(() => {
	const timerId = setInterval(() => {
	setTime(new Date());
	}, smooth?1:1000);

	return () => {
	clearInterval(timerId);
	};
}, []);

return (
	<div className="z-[5]" style={{position: 'absolute', width: `${dim}px`, height: `${dim}px`, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: `calc(8 / 100 * ${dim}px)`}} >
	{/* <p>{dim}</p> */}
	<div className="Analogclock">
	<div
		className="Analoghour_hand"
		style={smooth?{
		transform: `translateX(-50%) rotateZ(${time.getHours() * 30 + time.getMinutes() * 0.5 + time.getSeconds() * 0.00833}deg)`
		}:{
		transform: `translateX(-50%) rotateZ(${time.getHours() * 30}deg)`
		}}
	/>
	<div
		className="Analogmin_hand"
		style={smooth?{
		transform: `translateX(-50%) rotateZ(${time.getMinutes() * 6 + time.getSeconds() * 0.1 + time.getMilliseconds() * 0.0001}deg)`
		}:{
		transform: `translateX(-50%) rotateZ(${time.getMinutes() * 6}deg)`
		}}
	/>
	{showSeconds?<div
		className="Analogsec_hand"
		style={smooth?{
		transform: `translateX(-50%) rotateZ(${time.getSeconds() * 6 + time.getMilliseconds() * 0.006}deg)`
		}:{
		transform: `translateX(-50%) rotateZ(${time.getSeconds() * 6}deg)`
		}}
	/>:null}
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
	</div>
);
}
