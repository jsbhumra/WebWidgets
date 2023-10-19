import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Textfit } from "react-textfit";
import "./styles.css";
const api_key = process.env.NEXT_PUBLIC_API_KEY;

function Weather({ width = 500, height = 250, showWind = false }) {
  const [city, setCity] = useState("Mumbai");
  const [data, setData] = useState({});
  const [dim, setDim] = useState(width < 2 * height ? width : 2 * height);
  useEffect(() => {
    if (height < width) {
      setDim(2 * height);
    } else {
      setDim(width);
    }
  }, [height, width]);

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
    async function getWeather() {
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
        toast.error("An Error Occured ");
      }
    }
    getWeather();
  }, []); // Add city afterward in dependecy array. Currently retrieving only FOR Mumabi

  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[5]`}
      style={{
        position: "absolute",
        width: `${dim}px`,
        height: `calc(${dim} / 2)px`,
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div className="flex flex-row w-full h-full weatherContainer bg-[#ffebcd] text-[#d2691e]">
        {/* LEFT */}
        <div className="flex flex-row left h-full w-2/3 relative">
          {/* FIRST */}
          <div className="first h-full w-1/2 relative flex flex-col  justify-evenly items-center">
            {/* Weather */}
            <div
              mode="single"
              // className="left-1/2 top-6 -translate-x-1/2 absolute w-2/5 h-[40%] border border-red-500"
              className="w-2/5 h-[25%]"
            >
              <Textfit
                mode="single"
                className="w-full h-full flex justify-center items-center font-semibold"
              >
                {data.weather}
              </Textfit>
            </div>

            {/* Temperature */}
            <div
              // className="left-1/2 -translate-x-1/2 w-2/3 h-1/2 absolute bottom-5 text-center border border-red-500"
              className="w-5/6 h-3/5"
            >
              <div className="w-full h-full flex">
                <Textfit
                  mode="single"
                  className="h-full w-full flex justify-center items-center"
                >
                  {data.temp}
                </Textfit>
                <span className="pt-1 font-bold w-1/3 h-1/2 ">
                  <Textfit
                    mode="single"
                    className="w-full h-full flex justify-center items-center"
                  >
                    °C
                  </Textfit>
                </span>
              </div>
            </div>
          </div>
          {/* MIDDLE */}
          <div className="absolute left-[calc(575%/12)] bottom-4 h-2/3 w-1 rounded-3xl bg-[#d2691e]"></div>
          {/* Extra  */}
          <div className="h-full w-1/2 p-2 border border-blue-500">
            <div className="h-2/3 flex flex-col border border-red-500 relative top-10">
              <Textfit
                mode="single"
                forceSingleModeWidth={true}
                className="h-1/4 w-full flex justify-center items-center"
              >
                Humidity: {data.humidity} %
              </Textfit>
              <Textfit
                mode="single"
                forceSingleModeWidth={true}
                className="h-1/4 w-full flex justify-center items-center"
              >
                Pressure: {data.pressure} mb
              </Textfit>
              <Textfit
                mode="single"
                forceSingleModeWidth={true}
                className="h-1/4 w-full flex justify-center items-center"
              >
                Wind: {data.wind} km/h
              </Textfit>
              <Textfit
                mode="single"
                forceSingleModeWidth={true}
                className="h-1/4 w-full flex justify-center items-center"
              >
                {data.city}, {data.country}
              </Textfit>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right h-full w-1/3 flex justify-center items-center p-6 border border-blue-500">
          <img
            src={`/weatherImages/${data.icon}.svg`}
            style={{
              filter:
                "invert(38%) sepia(100%) saturate(589%) hue-rotate(348deg) brightness(100%) contrast(70%)",
            }}
            alt="Weather"
            srcSet=""
          />
        </div>
      </div>
    </div>
  );
}

export default Weather;
