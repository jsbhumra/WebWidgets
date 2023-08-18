"use client";
import Image from 'next/image';
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

  const originalLayouts = getFromLS("layouts") || {lg: [{i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3},{i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3},{i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3},{i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3},{i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}],md: [{i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3},{i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3},{i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3},{i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3},{i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}],sm: [{i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3},{i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3},{i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3},{i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3},{i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}],xs: [{i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3},{i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3},{i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3},{i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3},{i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}],xxs: [{i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3},{i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3},{i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3},{i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3},{i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}]};
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );
  const [currentLayout, setCurrentLayout] = useState([{i: 1, w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3},{i: 2, w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3},{i: 3, w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3},{i: 4, w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3},{i: 5, w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3}])

  useEffect(() => {
    saveToLS("layouts", layouts);
  }, [layouts]);

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
    console.log(layout)
    setCurrentLayout(layout)
    console.log(currentLayout)
    console.log(currentLayout[3].i)
  };

  console.log(layouts)
  return (
    <div className="h-screen">
      <Image className="absolute h-screen top-0 start-0" height={1080} width={1920} src='/demobg.jpg' alt='BG-image'></Image>
      <ResponsiveReactGridLayout
        className="border-2 border-red-500 h-screen"
        breakpoints = {{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        compactType={null}
        preventCollision={true}
        resizeHandles={['e','s']}
      >
        {currentLayout.map((box) => 
    <div
    key={box.i}
    data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}
    className="bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-lime-500 border-2"
  >
    <span className="text">{box.i}</span>
  </div>)}
        {/* <div
          key="1"
          data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}
          className="bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-lime-500 border-2"
        >
          <span className="text">1</span>
        </div>
        <div
          key="2"
          data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}
          className="bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-lime-500 border-2"
        >
          <span className="text">2</span>
        </div>
        <div
          key="3"
          data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}
          className="bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-lime-500 border-2"
        >
          <span className="text">3</span>
        </div>
        <div
          key="4"
          data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}
          className="bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-lime-500 border-2"
        >
          <span className="text">4</span>
        </div>
        <div
          key="5"
          data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}
          className="bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 border border-lime-500 border-2"
        >
          <span className="text">5</span>
        </div> */}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Demo;
