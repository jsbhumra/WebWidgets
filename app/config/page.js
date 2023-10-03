"use client";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("@/components/Navbar"), { ssr: false });

const AnalogClock = dynamic(() => import("@/widgets/AnalogClock"), {
  ssr: false,
});

const DigitalClock = dynamic(() => import("@/widgets/DigitalClock"), {
  ssr: false,
});

const Calendar = dynamic(() => import("@/widgets/Calendar"), {
  ssr: false,
});

// import AnalogClock from "@/widgets/AnalogClock";
// import "@/widgets/AnalogClock/styles.css";

// import DigitalClock from "@/widgets/DigitalClock";
// import "@/widgets/DigitalClock/styles.css";

import SearchBar from "@/widgets/SearchBar";
// import "@/widgets/SearchBar/styles.css";

//REMOVE 2 LINES TO REMOVE CALENDAR
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

import React from "react";

const Config = () => {
  return (
    <>
      <div className="bgcol w-screen min-h-screen">
        <Nav />
        <div className="ms-16 mt-8">
          <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Set us up as your default startup link on your browser
          </h2>
          <div className="row-auto">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                For Chrome
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Step 1: <a href="chrome://settings" target="_blank"></a>{" "}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Step 2: <a href="chrome://settings" target="_blank"></a>{" "}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Step 3: <a href="chrome://settings" target="_blank"></a>{" "}
              </p>
            </div>

            <a
              href="#"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                For Safari
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </a>

            <a
              href="#"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                For Internet Explorer
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </a>
          </div>
        </div>
        {/* <div style={{ width: "500px", height: "300px" }}>
          <SearchBar width={500} height={300} darkMode={true} />
        </div>
        <div style={{ width: "300px", height: "300px", position: "relative" }}>
          <AnalogClock width={300} height={200} />
        </div>
        <DigitalClock clock24hr={true} showSeconds={false} vertical={true} /> */}
        <Calendar />
      </div>
    </>
  );
};

export default Config;
