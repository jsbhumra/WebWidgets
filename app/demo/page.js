"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Counter from "@/components/Counter";
const AnalogClock = dynamic(() => import("@/widgets/AnalogClock"), {
  ssr: false,
});
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

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

  const saveToLS = (name,key, value) => {
    if (localStorage) {
      localStorage.setItem(
        name,
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  const originalWidgets = getFromLS("widgetStorage","widgets") || {
    lg: [
      {i: 1, widget: {name: 'AnalogClock', showSeconds: false}},
      {i: 2, widget: {name: 'empty'}},
      {i: 3, widget: {name: 'empty'}},
      {i: 4, widget: {name: 'empty'}},
      {i: 5, widget: {name: 'empty'}},
    ],
    md: [
      {i: 1, widget: {name: 'empty'}},
      {i: 2, widget: {name: 'AnalogClock', showSeconds: true}},
      {i: 3, widget: {name: 'empty'}},
      {i: 4, widget: {name: 'empty'}},
      {i: 5, widget: {name: 'empty'}},
    ],
    sm: [
      {i: 1, widget: {name: 'empty'}},
      {i: 2, widget: {name: 'empty'}},
      {i: 3, widget: {name: 'AnalogClock', showSeconds: true}},
      {i: 4, widget: {name: 'empty'}},
      {i: 5, widget: {name: 'empty'}},
    ],
    xs: [
      {i: 1, widget: {name: 'empty'}},
      {i: 2, widget: {name: 'empty'}},
      {i: 3, widget: {name: 'empty'}},
      {i: 4, widget: {name: 'AnalogClock', showSeconds: true}},
      {i: 5, widget: {name: 'empty'}},
    ],
    xxs: [
      {i: 1, widget: {name: 'empty'}},
      {i: 2, widget: {name: 'empty'}},
      {i: 3, widget: {name: 'empty'}},
      {i: 4, widget: {name: 'empty'}},
      {i: 5, widget: {name: 'AnalogClock', showSeconds: true}},
    ],
  }

  const originalLayouts = getFromLS("layoutStorage","layouts") || {
    lg: [
      { i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 },
      { i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 },
      { i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 },
      { i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 },
      { i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 },
    ],
    md: [
      { i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 },
      { i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 },
      { i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 },
      { i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 },
      { i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 },
    ],
    sm: [
      { i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 },
      { i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 },
      { i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 },
      { i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 },
      { i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 },
    ],
    xs: [
      { i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 },
      { i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 },
      { i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 },
      { i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 },
      { i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 },
    ],
    xxs: [
      { i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 },
      { i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 },
      { i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 },
      { i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 },
      { i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 },
    ],
  };

  const onSaveOriginalLayouts = () => {
    saveToLS("layoutStorage","layouts", originalLayouts);
  };

  const onSaveOriginalWidgets = () => {
    saveToLS("widgetStorage","widgets", originalWidgets)
  };

  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const [widgets, setWidgets] = useState(
    JSON.parse(JSON.stringify(originalWidgets))
  )

  if (layouts === undefined) {
    onSaveOriginalLayouts();
    location.reload();
  }

  if (widgets === undefined) {
    onSaveOriginalWidgets();
    location.reload();
  }

  const onSave = () => {
    onWidgetChange()
    saveToLS("layoutStorage","layouts", layouts);
    saveToLS("widgetStorage","widgets", widgets);
    console.log(currentLayout)
    console.log(currentWidget)
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

  const [widgetCounter, setWidgetCounter] = useState(currentLayout[currentLayout.length-1].i);

  const onAdd = () => {
    setCurrentLayout((prevLayout) => [
      ...prevLayout,
      {
        i: widgetCounter + 1,
        x: Infinity,
        y: Infinity,
        w: 3,
        h: 4,
      },
    ]);
    setCurrentWidget((prevWidget) => [
      ...prevWidget,
      {
        i: widgetCounter + 1,
        widget: {name: 'empty'}
      },
    ]);
    setWidgetCounter(widgetCounter + 1);
    toast.success("Widget Added");
  };


  const breakPointChange = (newBreakPt) => {
    setLayouts(getFromLS("layoutStorage","layouts"));
    setWidgets(getFromLS("widgetStorage","widgets"));
    setCurrentLayout(layouts[newBreakPt]);
    setCurrentWidget(widgets[newBreakPt]);
  };

  const onLayoutChange = (layout, layouts) => {
    // console.log(layout)
    setCurrentLayout(layout);
    setLayouts(layouts);
  };

  function onWidgetChange() {
    const editWidget = widgets;
    editWidget[`${currentScreen}`] = currentWidget
    setWidgets(editWidget);
  }

  const onRemoveItem = (e) => {
    const id = e.target.id;
    setCurrentLayout((prevLayout) =>
      prevLayout.filter((layout) => layout.i != id)
    );
    console.log('layout removed')
    // console.log(id)
    setCurrentWidget((prevWidget) =>
      prevWidget.filter((currWidget) => currWidget.i != id)
    );
    onWidgetChange()
    console.log(currentLayout)
    console.log(currentWidget)
    console.log('widget removed')
    // setLayouts(JSON.parse(JSON.stringify(getFromLS("layoutStorage","layouts"))));
    // setWidgets(JSON.parse(JSON.stringify(getFromLS("widgetStorage","widgets"))));
    console.log(currentLayout)
    console.log(currentWidget)
    toast.success("Widget Deleted");
  };

  return (
    <div className="min-h-screen bg-repeat bgcol bg-cover bg-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Button
        color="warning"
        className="absolute z-10 top-5 right-5 text-xl font-medium"
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        color="warning"
        className="absolute z-10 top-5 right-28 text-xl font-medium"
        onClick={onAdd}
      >
        Add
      </Button>
      <ResponsiveReactGridLayout
        className="border-2 border-red-500 min-h-screen"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={true}
        margin={[15, 15]}
        onBreakpointChange={(newBreakPt) => breakPointChange(newBreakPt)}
      >
        {currentLayout.map((box) => {
          var thisWidget = currentWidget.filter(ele => ele.i == box.i)[0].widget
          var boxheight = Math.floor(box.h * 30) + 15 * (box.h - 1);
          var boxwidth = Math.floor(box.w * (screenWidth / currCols)) + 15 * (box.w - 1);
          return (
            <div
              key={box.i}
              // Dynamic Values from Database for w, h, minW, minH.
              data-grid={{
                w: 2,
                h: 3,
                x: 0,
                y: 0,
                minW: 2,
                minH: 3,
                maxW: 10,
                maxH: 10,
              }}
              className="group flex  bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 outline-dashed outline-offset-[3.5px] outline-[3.5px] outline-lime-200 hover:outline-lime-500 active:outline-indigo-500 items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {/* Add Paddind to remove overlap betn widget and delete btn*/}
              <div className="text w-full h-full">
                {/* {parentRef?.current[box.i]?.clientWidth} */}
                {/* <Counter width={parentRef.current[box.i]?.clientWidth} height={parentRef.current[box.i]?.clientHeight} /> */}
                {/* <p>Height: {boxheight}<br />Width: {boxwidth}</p> */}
                {
                  {
                    'empty': <></>,
                    'AnalogClock': <AnalogClock width={Math.floor((9 / 10) * boxwidth)} height={boxheight} showSeconds={thisWidget.showSeconds} />,
                    // 'bar': <Bar />
                  }[thisWidget.name]
                }
              </div>
              <span
                className="border-2 border-red-500 rounded-md p-[2px] cursor-pointer absolute right-0 top-0 h-6 w-6 hidden group-hover:block"
                onClick={onRemoveItem}
                id={box.i}
              >
                <Image
                  src="/delete.svg"
                  height={20}
                  width={20}
                  className="h-full w-full m-0 p-0"
                />
              </span>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Demo;
