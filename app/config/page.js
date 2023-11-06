"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
const AnalogClock = dynamic(() => import("../../widgets/AnalogClock"), {
  ssr: false,
});
const DigitalClock = dynamic(() => import("../../widgets/DigitalClock"), {
  ssr: false,
});
import Weather from "../../widgets/Weather";
import Calendar from "../../widgets/Calendar";
import NewCalendar from "../../widgets/NewCalendar";
import SearchBar from "../../widgets/SearchBar";
// import Weather from "@/widgets/Weather";
// import Calendar from "@/widgets/Calendar";
// import NewCalendar from "@/widgets/NewCalendar";
// import SearchBar from "@/widgets/SearchBar";
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
// import { Router } from "express";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useSession } from "next-auth/react";
import _ from "lodash";
import Toolbar from "../../components/Toolbar";

const useWindowSize = () => {

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return [height, width]
}


const Config = () => {
  const { data, status } = useSession();
  const userID = data?.user._id;
  const router = useRouter();
  const searchParams = useSearchParams()
  const updated = searchParams.get('updated')

  if (status == "unauthenticated") router.replace("./login");

  const [screenHeight, screenWidth] = useWindowSize();
  const [isSame, setIsSame] = useState(true);
  // const [originalLayouts, setOriginalLayouts] = useState({})
  // const [originalWidgets, setOriginalWidgets] = useState({})
// console.table(screenHeight,screenWidth)
  const screenSize = global?.window && window.innerWidth;
  console.log(screenSize)
  let currentScreen, currCols;
  useEffect(()=>{
    switch (true) {
    case screenSize > 1200:
      console.log("switch")
      currentScreen = "lg";
      currCols = 12;
      break;
    case screenSize < 1200 && screenSize > 996:
      currentScreen = "md";
      currCols = 10;
      break;
    case screenSize < 996 && screenSize > 768:
      currentScreen = "sm";
      currCols = 6;
      break;
    case screenSize < 768 && screenSize > 480:
      currentScreen = "xs";
      currCols = 4;
      break;

    default:
      currentScreen = "xxs";
      currCols = 2;
      break;
  }
  },[screenSize])
  

  const getFromLS = (name, key) => {
    let ls = {};
    console.log("get")
    if (global?.localStorage) {
      try {
        console.log("ls")
        ls = JSON.parse(localStorage.getItem(name));
        return ls[key];
      } catch (e) {
        //  //console.log(e);
      }
    } else {
      {
      }
    }
  };

  const saveToLS = (name, key, value) => {
    if (global?.localStorage) {
      localStorage.setItem(
        name,
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  let originalWidgets = getFromLS("widgetStorage", "widgets") || {};
  let originalLayouts = getFromLS("layoutStorage", "layouts") || {};
  // useEffect(() => {
  //   setOriginalWidgets(getFromLS("widgetStorage", "widgets"))
  //   setOriginalLayouts(getFromLS("layoutStorage", "layouts"))
  //   console.log("updated")
  // },[window])

  const onSaveOriginalLayouts = () => {
    saveToLS("layoutStorage", "layouts", originalLayouts);
  };

  const onSaveOriginalWidgets = () => {
    saveToLS("widgetStorage", "widgets", originalWidgets);
  };

  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const [widgets, setWidgets] = useState(
    JSON.parse(JSON.stringify(originalWidgets))
  );

  if (layouts === undefined) {
    onSaveOriginalLayouts();
    location.reload();
  }

  if (widgets === undefined) {
    onSaveOriginalWidgets();
    location.reload();
  }

  async function saveToDB(userID, widgets, layouts) {
    const response = await fetch("/api/widget", {
      method: "PUT",
      body: JSON.stringify({ userID, widgets, layouts }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    //console.log(data);
    return data;
  }

  const onSave = () => {
    onWidgetChange();
    saveToLS("layoutStorage", "layouts", layouts);
    saveToLS("widgetStorage", "widgets", widgets);

    saveToDB(userID, widgets, layouts);

    toast.success("Layout Saved");
    // toast.promise(saveToLS("layouts", layouts), {
    //   loading: "Saving...",
    //   success: <b>Settings saved!</b>,
    //   error: <b>Could not save.</b>,
    // });
  };

  const [currentLayout, setCurrentLayout] = useState(
    layouts[`${currentScreen}`]
  );

  const [currentWidget, setCurrentWidget] = useState(
    widgets[`${currentScreen}`]
  );

  async function getfromdb(userID) {
    // console.log(userID);
    const response = await fetch(`/api/widget?userID=${userID}`, {
      method: "GET",
    });

    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  async function compareData() {
    if(updated){
      const lsdata2 = getFromLS("layoutStorage", "layouts") || {};
      const lsdata1 = getFromLS("widgetStorage", "widgets") || {};

      saveToDB(userID, lsdata1, lsdata2);
      // setTimeout(() => {
        router.replace("../config");
      // }, 500);
    }
    const dbdata = await getfromdb(userID);
    const db1 = dbdata?.layouts;
    const db2 = dbdata?.widgets;

    console.log(db1);
    console.log(db2);

    const lsdata1 = getFromLS("layoutStorage", "layouts");
    const lsdata2 = getFromLS("widgetStorage", "widgets");

    console.log(lsdata1);
    console.log(lsdata2);

    var res = _.isEqual(db1, lsdata1) && _.isEqual(db2, lsdata2);
    setIsSame(res);
  }

  function chooseLocalCopy() {
    const lsdata2 = getFromLS("layoutStorage", "layouts") || {};
    const lsdata1 = getFromLS("widgetStorage", "widgets") || {};

    saveToDB(userID, lsdata1, lsdata2);

    // router.refresh();
    toast.success("Local copy saved, refreshing now");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  async function chooseCloudCopy() {
    const dbdata = await getfromdb(userID);
    const db1 = dbdata?.layouts;
    const db2 = dbdata?.widgets;

    saveToLS("layoutStorage", "layouts", db1);
    saveToLS("widgetStorage", "widgets", db2);

    // router.refresh();
    toast.success("Cloud copy saved, refreshing now");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  useEffect(() => {
    setCurrentLayout(layouts[`${currentScreen}`]);
    setCurrentWidget(widgets[`${currentScreen}`]);
  }, []);

  useEffect(() => {
    console.log(userID);
    if (status == "authenticated" && userID != undefined) compareData();
  }, [status, userID]);

  const breakPointChange = (newBreakPt) => {
    setLayouts(getFromLS("layoutStorage", "layouts"));
    setWidgets(getFromLS("widgetStorage", "widgets"));
    setCurrentLayout(layouts[newBreakPt]);
    setCurrentWidget(widgets[newBreakPt]);
  };

  const onLayoutChange = (layout, layouts) => {
    //  //console.log(layout)
    setCurrentLayout(layout);
    setLayouts(layouts);
  };

  function onWidgetChange() {
    const editWidget = widgets;
    editWidget[`${currentScreen}`] = currentWidget;
    setWidgets(editWidget);
  }

  const onRemoveItem = (e) => {
    const id = e.target.id;
    setCurrentLayout((prevLayout) =>
      prevLayout.filter((layout) => layout.i != id)
    );
    setCurrentWidget((prevWidget) =>
      prevWidget.filter((currWidget) => currWidget.i != id)
    );
    onWidgetChange();
    toast.success("Widget Deleted");
  };

  if (isSame) {
    return (
      <>
        <Toolbar onSave={onSave} />
        <div className="min-h-screen bg-repeat bgcol bg-cover bg-center">
          <Toaster position="top-center" reverseOrder={false} />

          {currentLayout != undefined ? (
            <ResponsiveReactGridLayout
              className="min-h-screen"
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={30}
              layouts={layouts}
              onLayoutChange={(layout, layouts) =>
                onLayoutChange(layout, layouts)
              }
              compactType={null}
              preventCollision={true}
              useCSSTransforms={true}
              margin={[15, 15]}
              onBreakpointChange={(newBreakPt) => breakPointChange(newBreakPt)}
            >
              {/* {console.log(currentLayout)} */}
              {currentLayout.map((box) => {
                //console.log(currentWidget);
                //  //console.log(currentLayout);
                var thisWidget = currentWidget.filter((ele) => ele.i == box.i)[0].widget;
                var boxheight = Math.floor(box.h * 30) + 15 * (box.h - 1);
                var boxwidth =
                  Math.floor(box.w * (screenWidth / currCols)) +
                  15 * (box.w - 1);
                //console.log(thisWidget);
                return (
                  <div
                    key={box.i}
                    // Dynamic Values from Database for w, h, minW, minH.
                    data-grid={{
                      w: box.w,
                      h: box.h,
                      x: 0,
                      y: 0,
                      minW: box.minW,
                      minH: box.minH,
                      maxW: 10,
                      maxH: 10,
                    }}
                    className="group flex  bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 outline-dashed outline-offset-[3.5px] outline-[3.5px] outline-lime-200 hover:outline-lime-500 active:outline-indigo-500 items-center justify-center cursor-grab active:cursor-grabbing"
                  >
                    {/* Add Paddind to remove overlap betn widget and delete btn*/}
                    <div className="text w-full h-full pointer-events-none">
                      {/* {parentRef?.current[box.i]?.clientWidth} */}
                      {/* <Counter width={parentRef.current[box.i]?.clientWidth} height={parentRef.current[box.i]?.clientHeight} /> */}
                      {/* <p>Height: {boxheight}<br />Width: {boxwidth}</p> */}
                      {
                        {
                          empty: <></>,
                          AnalogClock: (
                            <AnalogClock
                              width={Math.floor((9 / 10) * boxwidth)}
                              height={boxheight}
                              showSeconds={thisWidget.showSeconds}
                              smooth={thisWidget.smooth}
                            />
                          ),
                          DigitalClock: (
                            <DigitalClock
                              width={boxwidth}
                              height={boxheight}
                              clock24hr={thisWidget.clock24hr}
                              showSeconds={thisWidget.showSeconds}
                              vertical={thisWidget.vertical}
                            />
                          ),
                          SearchBar: (
                            <SearchBar
                              width={Math.floor((9 / 10) * boxwidth)}
                              height={boxheight}
                              darkMode={thisWidget.darkMode}
                            />
                          ),
                          Calendar: (
                            <Calendar
                              width={Math.floor((9 / 10) * boxwidth)}
                              height={boxheight}
                              showYear={thisWidget.showYear}
                            />
                          ),
                          NewCalendar: (
                            <NewCalendar
                              width={Math.floor((9 / 10) * boxwidth)}
                              height={boxheight}
                              darkMode={thisWidget.darkMode}
                            />
                          ),
                          Weather: (
                            <Weather
                              width={Math.floor((9 / 10) * boxwidth)}
                              height={boxheight}
                              darkMode={thisWidget.darkMode}
                            />
                          ),
                        }[thisWidget.name]
                      }
                    </div>
                    <span
                      className="border-2 border-red-500 rounded-md p-[2px] cursor-pointer absolute right-0 top-0 h-6 w-6 hidden group-hover:block z-[500]"
                      onClick={onRemoveItem}
                      id={box.i}
                    >
                      <Image
                        src="/delete.svg"
                        height={20}
                        width={20}
                        className="h-full w-full m-0 p-0 z-[500]"
                      />
                    </span>
                  </div>
                );
              })}
            </ResponsiveReactGridLayout>
          ) : (
            <h3 className="absolute text-3xl italic left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-opacity-60 text-white">
              No widgets added yet!
            </h3>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen bg-repeat bgcol bg-cover bg-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="absolute text-center text-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border border-primaryOrange rounded-lg">
          <h1 className="text-center text-3xl pb-5">
            A conflict in widget templates has been found in your local and
            cloud copies!
          </h1>
          <div className="flex p-3 justify-evenly">
            <Button
              className="h-full text-2xl p-2 bg-primaryOrange capitalize"
              onClick={() => {
                chooseLocalCopy();
              }}
            >
              Use local copy
            </Button>
            <Button
              className="h-full text-2xl p-2 bg-primaryOrange capitalize"
              onClick={() => {
                chooseCloudCopy();
              }}
            >
              Use cloud copy
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Config;
