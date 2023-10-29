import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./styles.css";
const api_key = process.env.NEXT_PUBLIC_API_KEY;

function Weather({ width = 250, height = 250,darkMode=false}) {
  const [city, setCity] = useState("Mumbai");
  const [data, setData] = useState({});
  const [dMode, setdMode] = useState(darkMode);
  useEffect(() => {
    setdMode(darkMode)
 },[darkMode])
  const icons = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud-sun",
    "02n": "cloud-moon",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloud",
    "04n": "cloud",
    "09d": "rain",
    "09n": "rain",
    "10d": "rain",
    "10n": "rain",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13d": "snow",
    "50d": "mist",
    "50n": "mist",
  };

  useEffect(() => {
    async function getWeather(){
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`,
          { mode: "cors" }
        );
  
        const res = await response.json();
        // console.log(res);
        setData({
          city: res.name,
          country: res.sys.country,
          temp: Math.round(res.main.temp * 10) / 10,
          humidity: res.main.humidity,
          pressure: res.main.pressure,
          wind: res.wind.speed,
          weather: res.weather[0].main,
          icon: icons[res.weather[0].icon],
        });
      } catch (error) {
        toast.error("An Error Occured");
      }
    }
    getWeather()
  }, []); // Add city afterward in dependecy array. Currently retrieving only FOR Mumabi

  return (
    <div className="w-[24rem] h-[8rem]">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className={dMode?"flex flex-row w-full h-full weatherContainer bg-[#d2691e] text-[#ffebcd]":"flex flex-row w-full h-full weatherContainer bg-[#ffebcd] text-[#d2691e]"}>
        {/* <div className="flex flex-row w-full h-full weatherContainer bg-[#f0f8ff] text-[#000000]"> */}
        <div className="flex flex-row left h-full w-2/3 relative">
          <div className="first h-full w-5/12 relative">
            <div className="text1 left-1/2 top-[30px] -translate-x-1/2 text-sm font-bold absolute">
              {data.weather}
            </div>
            <div className="tempText left-1/2 -translate-x-1/2 text-5xl absolute bottom-[20px] text-center">
              <span className="relative">{data.temp}<span className="absolute text-2xl pt-[0.09rem]" style={{ fontWeight: '700' }}>°C</span></span>
            </div>
          </div>
          <div className={dMode?"absolute left-[calc(575%/12)] top-[40%] h-1/2 w-[1px] bg-[#ffebcd]":"absolute left-[calc(575%/12)] top-[40%] h-1/2 w-[1px] bg-[#d2691e]"}></div>
          <div className="second h-full left-[calc(100%/12)] w-1/2 pt-12 relative ps-3">
            <div className="text2 text-xs">Humidity: {data.humidity} %</div>
            <div className="text2 text-xs">Pressure: {data.pressure} mb</div>
            <div className="text2 text-xs">Wind: {data.wind} km/h</div>
            <div className="text3 bottom-[10px] text-base absolute">
              {data.city}, {data.country}
            </div>
          </div>
        </div>
        <div className="right h-full w-1/3 p-5 ps-3">
          <img src={`/weatherImages/${data.icon}.svg`} style={dMode?{filter: "invert(100%) sepia(26%) saturate(5242%) hue-rotate(295deg) brightness(111%) contrast(120%)"}:{ filter: "invert(38%) sepia(100%) saturate(589%) hue-rotate(348deg) brightness(100%) contrast(70%)" }} alt="" srcSet="" />
        </div>
      </div>
    </div>
  );
}

export default Weather;
