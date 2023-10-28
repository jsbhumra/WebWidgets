"use client";
import dynamic from "next/dynamic";
import Polygon from "../../components/Polygon";
const Nav = dynamic(() => import("@/components/Navbar"), { ssr: false });
import {Pagination, Button} from "@nextui-org/react";
import React, { useState } from "react";
import {Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const Setup = () => {
const [currentPage, setCurrentPage] = useState([1,1,1]);
let tabs = [
	{
	id: "chrome",
	label: "Chrome",
	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	page: 0,
	pages:[
		{
			id: 1,
			title: 1,
			info: 2,
			img: "./config/chrome/settings1.png"
		},
		{
			id: 2,
			title: 2,
			info: 3,
			img: "./config/chrome/settings2.png"
		},	
		{
			id: 3,
			title: 3,
			info: 4,
			img: "./config/chrome/settings3.png"
		},
		{
			id: 4,
			title: 3,
			info: 4,
			img: "./config/chrome/settings4.png"
		}
	]
		
	
	},
	{
	id: "safari",
	label: "Safari",
	content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
	page: 1,
	pages:[
		{
			id: 1,
			title: 1,
			info: 2,
			img: "./config/safari/settings1.png"
		},
		{
			id: 2,
			title: 2,
			info: 3,
			img: "./config/safari/settings2.png"
		},	
		{
			id: 3,
			title: 3,
			info: 4,
			img: "./config/safari/settings3.png"
		},	
		{
			id: 4,
			title: 3,
			info: 4,
			img: "./config/safari/settings4.png"
		}
	]
	},
	// {
	// id: "firefox",
	// label: "Firefox",
	// content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	// page: 2,
	// pages:[
	// 	{
	// 		id: 1,
	// 		title: 1,
	// 		info: 2,
	// 		img: 3
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 2,
	// 		info: 3,
	// 		img:4
	// 	},	
	// 	{
	// 		id: 3,
	// 		title: 3,
	// 		info: 4,
	// 		img: 5
	// 	}
	// ]
	// }
];
return (
	<>
	<div className="bgcol w-screen min-h-screen">
		<Nav />
		<br></br>
		<div className="relative flex w-[80%] flex-col ms-[10%] items-center text-center z-10 gap-y-4">
			<Tabs aria-label="Dynamic tabs" items={tabs}>
				{(item) => (
				<Tab key={item.id} title={item.label} className="">
					<Image className="h-[500px]" alt="nextui logo" src={item.pages[currentPage[item.page]-1].img}/>
					<Button
						color="primary"
						className="text-xl font-medium w-[120px] mt-5"
						onPress={() => {let newArray = [...currentPage]
							newArray[item.page] = newArray[item.page] > 1 ? newArray[item.page] - 1 : newArray[item.page]
							setCurrentPage(newArray)	
						}}
					>
						Previous
					</Button>
						&nbsp; &nbsp;
					<Button
						color="primary"
						className="text-xl font-medium w-[120px] mt-5"
						onPress={() => {let newArray = [...currentPage]
							newArray[item.page] = newArray[item.page] < 4 ? newArray[item.page] + 1 : newArray[item.page]
							setCurrentPage(newArray)	
						}}
					>
						Next
					</Button>				
				</Tab>
				)}
			</Tabs>
		</div>  
			
		<div>
			<Polygon />
		</div>
	</div>
	
	</>
);
};

export default Setup;
