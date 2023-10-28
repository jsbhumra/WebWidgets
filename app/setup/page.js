"use client";
import dynamic from "next/dynamic";
import Polygon from "../../components/Polygon";
const Nav = dynamic(() => import("@/components/Navbar"), { ssr: false });
import React, { useState } from "react";



const Setup = () => {
  
  return (
    <>
      <div className="bgcol w-screen min-h-screen">
        <Nav />
      </div>
      <div>
			<Polygon />
		</div>
    </>
  );
};

export default Setup;
