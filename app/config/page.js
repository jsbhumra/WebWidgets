"use client";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("@/components/Navbar"), { ssr: false });
const NewCalendar = dynamic(() => import("@/widgets/NewCalendar"), {
  ssr: false,
});
const Weather = dynamic(() => import("@/widgets/Weather"), {
  ssr: false,
});
import React, { useState } from "react";



const Config = () => {
  
  return (
    <>
      <div className="bgcol w-screen min-h-screen">
        <Nav />
        <NewCalendar />
        <Weather />
      </div>
      <div className="weatherContainer">

      </div>
    </>
  );
};

export default Config;
