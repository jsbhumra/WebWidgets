"use client";
import dynamic from "next/dynamic";
import Polygon from "../../components/Polygon";
const Nav = dynamic(() => import("@/components/Navbar"), { ssr: false });
import {Pagination, Button} from "@nextui-org/react";
import React, { useState } from "react";
import {Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const Config = () => {
return (
	<>
	<div className="bgcol w-screen min-h-screen">
	<Nav />

		<div>
			<Polygon />
		</div>
	</div>
	
	</>
);
};

export default Config;
