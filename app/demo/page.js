"use client"
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import { useState } from "react";

function Demo() {
  const [layout2, setLayout2] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 1, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ])

  const layout1 = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, static: true },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];

  const layouts = 
    {
      lg: layout2, md: layout1, sm:layout1, xs: layout1
    }
    // const layouts = getLayoutsFromSomewhere();
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rows={{ lg: 20, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="a" className="bg-indigo-500">1</div>
        <div key="b" className="bg-indigo-500">2</div>
        <div key="c" className="bg-indigo-500">3</div>
      </ResponsiveGridLayout>
    );
}

export default Demo;