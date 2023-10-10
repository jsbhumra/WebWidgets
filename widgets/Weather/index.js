import { useEffect, useState } from "react";
import "./styles.css";

function Weather() {
	return (
	<div className="w-[24rem] h-[8rem]">
		<div className="flex flex-row w-full h-full weatherContainer bg-[#ffebcd] text-[#d2691e]">
		{/* <div className="flex flex-row w-full h-full weatherContainer bg-[#f0f8ff] text-[#000000]"> */}
			<div className="flex flex-row left h-full w-2/3 relative">
				<div className="first h-full w-2/5 relative" >
					<div className="text1 left-1/2 top-[30px] -translate-x-1/2 text-sm font-bold absolute">
						Cloudy
					</div>
					<div className="tempText left-1/2 -translate-x-1/2 text-5xl absolute bottom-[20px]">
						45°
					</div>
				</div>
				<div className="absolute left-[40%] top-[40%] h-1/2 w-[1px] bg-black"></div>
				<div className="second h-full w-3/5 pt-12 relative ps-3">
					<div className="text2 text-xs">
						Humidity: 66%
					</div>
					<div className="text2 text-xs">
						Pressure: 1010mb
					</div>
					<div className="text2 text-xs">
						Wind: 5.14km/h
					</div>
					<div className="text3 bottom-[10px] text-base absolute">
						Mumbai, India
					</div>
				</div>
			</div>
			<div className="right h-full w-1/3">

			</div>
		</div>
	</div>
	
);
}

export default Weather;