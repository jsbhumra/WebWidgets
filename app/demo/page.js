"use client";
import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Demo = () => {
  const getFromLS = (key) => {
    let ls = {};
    if (typeof window !== 'undefined' && localStorage) {
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

  // const [layouts, setLayouts] = useState(() => {
  //   const initialLayouts = getFromLS("layouts") || {};
  //   return {
  //     lg: initialLayouts.lg || [],
  //     md: initialLayouts.md || [],
  //     sm: initialLayouts.sm || [],
  //     xs: initialLayouts.xs || [],
  //     xxs: initialLayouts.xxs || [],
  //   };
  // });

  const originalLayouts = getFromLS("layouts") || {};
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  useEffect(() => {
    saveToLS("layouts", layouts);
  }, [layouts]);

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };

  // const onLayoutChange = (layout, layouts) => {
  //   saveToLS("layouts", layouts);
  //   setLayouts(layouts);
  // };

  return (
    <div className="h-screen border-2 border-red-500 overflow-hidden">
      <ResponsiveReactGridLayout
        className="border-2 border-red-500 max-h-screen"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        compactType={null}
        preventCollision={true}
      >
        <div
          key="1"
          data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}
          className="bg-white text-black"
        >
          <span className="text">1</span>
        </div>
        <div
          key="2"
          data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}
          className="bg-white text-black"
        >
          <span className="text">2</span>
        </div>
        <div
          key="3"
          data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}
          className="bg-white text-black"
        >
          <span className="text">3</span>
        </div>
        <div
          key="4"
          data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}
          className="bg-white text-black"
        >
          <span className="text">4</span>
        </div>
        <div
          key="5"
          data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}
          className="bg-white text-black"
        >
          <span className="text">5</span>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Demo;
