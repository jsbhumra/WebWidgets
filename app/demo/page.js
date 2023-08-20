"use client";
import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Demo = () => {
  const getFromLS = (key) => {
    let ls = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        console.log(e);
      }
    }
    return ls[key];
  };

  const saveToLS = (key, value) => {
    if (localStorage) {
      localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  const originalLayouts = getFromLS("layouts") || {
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
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );
  const [currentLayout, setCurrentLayout] = useState([
    { i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 },
    { i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 },
    { i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 },
    { i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 },
    { i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 },
  ]);

  useEffect(() => {
    saveToLS("layouts", layouts);
  }, [layouts]);

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
    console.log(layout);
    setCurrentLayout(layout);
  };

  const onRemoveItem = (e) => {
    const id = e.target.id;
    // setLayouts((prevLayout) => {
    //   console.log(prevLayout);
    //   return prevLayout;
    // });
    setCurrentLayout((prevLayout) =>
      prevLayout.filter((layout) => layout.i != id)
    );

    // saveToLS("layouts", currentLayout);
  };

  return (
    <div className="min-h-screen h-auto bg-repeat bg-[url('/demobg.jpg')] bg-cover bg-center">
      <ResponsiveReactGridLayout
        className="border-2 border-red-500 h-screen overflow-hidden"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={true}
        margin={[15, 15]}
      >
        {currentLayout.map((box) => {
          return (
            <div
              key={box.i}
              data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}
              className="flex flex-row bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 outline-dashed outline-offset-[3.5px] outline-[3.5px] outline-lime-200 hover:outline-lime-500 active:outline-indigo-500 items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <span className="text">{box.i}</span>
              <span
                className="border-2 border-red-500 rounded-md px-2 py-1 cursor-pointer absolute right-0 top-0"
                onClick={onRemoveItem}
                id={box.i}
              >
                <img src="/delete.svg" />
              </span>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Demo;
