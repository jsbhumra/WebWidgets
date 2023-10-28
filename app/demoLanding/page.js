"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import SearchBar from "@/widgets/SearchBar";
const AnalogClock = dynamic(() => import("@/widgets/AnalogClock"), {
  ssr: false,
});
const DigitalClock = dynamic(() => import("@/widgets/DigitalClock"), {
  ssr: false,
});
import Calendar from "@/widgets/Calendar";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}

const Demo = () => {
  const [screenHeight, screenWidth] = useWindowSize();

  const screenSize = window.innerWidth;
  let currentScreen, currCols;
  switch (true) {
    case screenSize > 1200:
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

  const getFromLS = (name, key) => {
    let ls = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem(name));
        return ls[key];
      } catch (e) {
        // console.log(e);
      }
    } else {
      {
      }
    }
  };

  const saveToLS = (name, key, value) => {
    if (localStorage) {
      localStorage.setItem(
        name,
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  const originalWidgets = getFromLS("widgetStorage", "widgets");

  const originalLayouts = getFromLS("layoutStorage", "layouts");

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

  const [currentLayout, setCurrentLayout] = useState(
    layouts[`${currentScreen}`]
  );

  const [currentWidget, setCurrentWidget] = useState(
    widgets[`${currentScreen}`]
  );

  useEffect(() => {
    setCurrentLayout(layouts[`${currentScreen}`]);
    setCurrentWidget(widgets[`${currentScreen}`]);
  }, [currentScreen]);

  const breakPointChange = (newBreakPt) => {
    setLayouts(getFromLS("layoutStorage", "layouts"));
    setWidgets(getFromLS("widgetStorage", "widgets"));
    setCurrentLayout(layouts[newBreakPt]);
    setCurrentWidget(widgets[newBreakPt]);
  };

  return (
    <div className="min-h-screen bg-repeat bgcol bg-cover bg-center">
      {currentLayout != undefined ? (
        <ResponsiveReactGridLayout
          className="border-2 border-red-500 min-h-screen"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={layouts}
          compactType={null}
          preventCollision={true}
          useCSSTransforms={true}
          margin={[15, 15]}
          onBreakpointChange={(newBreakPt) => breakPointChange(newBreakPt)}
          isResizable={false}
          isDraggable={false}
        >
          {currentLayout.map((box) => {
            console.log(currentWidget);
            var thisWidget = currentWidget.filter((ele) => ele.i == box.i)[0]
              .widget;
            var boxheight = Math.floor(box.h * 30) + 15 * (box.h - 1);
            var boxwidth =
              Math.floor(box.w * (screenWidth / currCols)) + 15 * (box.w - 1);
            return (
              <div
                key={box.i}
                // Dynamic Values from Database for w, h, minW, minH.
                data-grid={box}
                className="group flex bg-gray-950 rounded-md bg-clip-padding bg-transparent items-center justify-center"
                style={thisWidget.name=="SearchBar"?{ zIndex: 10 }:{ zIndex: 5 }}
              >
                {/* Add Paddind to remove overlap betn widget and delete btn*/}
                <div className="text w-full h-full">
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
                          // darkMode={thisWidget.darkMode}
                        />
                      ),
                    }[thisWidget.name]
                  }
                </div>
              </div>
            );
          })}
        </ResponsiveReactGridLayout>
      ) : null}
    </div>
  );
};

export default Demo;
