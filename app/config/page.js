"use client"

import Nav from "../../components/Navbar";
import AnalogClock from "../../widgets/AnalogClock";
import DigitalClock from "../../widgets/DigitalClock";
import "../../widgets/AnalogClock/styles.css"
import "../../widgets/DigitalClock/styles.css"

//REMOVE 2 LINES TO REMOVE CALENDAR
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function config(){
    return(
        <>
        <div className="bgcol w-screen h-screen">
            <Nav />
            <div className="ms-16 mt-8">
                <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Set us up as your default startup link on your browser</h2>
                <div className="row-auto">

<div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">For Chrome</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Step 1: <a href="chrome://settings" target="_blank"></a> </p>
    <p class="font-normal text-gray-700 dark:text-gray-400">Step 2: <a href="chrome://settings" target="_blank"></a> </p>
    <p class="font-normal text-gray-700 dark:text-gray-400">Step 3: <a href="chrome://settings" target="_blank"></a> </p>
</div>


<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">For Safari</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a>


<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">For Internet Explorer</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a>

                    
                </div>
            </div>
            <AnalogClock />

            <DigitalClock />
            <Calendar />
        </div>
        </>
    );
}