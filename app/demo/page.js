"use client";
import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Demo2 = () => {
  const getFromLS = (key) => {
    let ls = {};
    try {
      ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
    } catch (e) {}

    return ls[key];
  };

  const [layouts, setLayouts] = useState(() => {
    const initialLayouts = getFromLS("layouts") || {};
    return {
      lg: initialLayouts.lg || [],
      md: initialLayouts.md || [],
      sm: initialLayouts.sm || [],
      xs: initialLayouts.xs || [],
      xxs: initialLayouts.xxs || [],
    };
  });

  const saveToLS = (key, value) => {
    localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        ...getFromLS("layouts"),
        [key]: value,
      })
    );
  };

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  };

  return (
    <div className="h-screen border-2 border-red-500">
      <ResponsiveReactGridLayout
        className="border-2 border-red-500 h-screen"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        compactType={null}
        preventCollision={true}
      >
        <div
          key="1"
          data-grid={{ w: 2, h: 3, minW: 2, minH: 3 }}
          className="bg-red-500"
        >
          <span className="text">1</span>
        </div>
        <div
          key="2"
          data-grid={{ w: 2, h: 3, minW: 2, minH: 3 }}
          className="bg-red-500"
        >
          <span className="text">2</span>
        </div>
        <div
          key="3"
          data-grid={{ w: 2, h: 3, minW: 2, minH: 3 }}
          className="bg-red-500"
        >
          <span className="text">3</span>
        </div>
        <div
          key="4"
          data-grid={{ w: 2, h: 3, minW: 2, minH: 3 }}
          className="bg-red-500"
        >
          <span className="text">4</span>
        </div>
        <div
          key="5"
          data-grid={{ w: 2, h: 3, minW: 2, minH: 3 }}
          className="bg-red-500"
        >
          <span className="text">5</span>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Demo2;
