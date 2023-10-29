"use client";

import { useSession } from "next-auth/react";

export default function add() {
  const { data, status } = useSession();

  const userID = data?.user._id;

  const getFromLS = (name, key) => {
    let ls = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem(name));

        console.log(ls[key]);
        return ls[key];
      } catch (e) {}
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

  async function saveToDB(userID, widgets, layouts) {
    const response = await fetch("/api/widget", {
      method: "PUT",
      body: JSON.stringify({ userID, widgets, layouts }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  const widgets = {
    lg: [
      {
        i: 2,
        widget: {
          name: "SearchBar",
          darkMode: true,
        },
      },
      {
        i: 3,
        widget: {
          name: "DigitalClock",
          clock24hr: true,
          showSeconds: true,
          vertical: false,
        },
      },
      {
        i: 6,
        widget: {
          name: "DigitalClock",
          clock24hr: true,
          showSeconds: true,
          vertical: true,
        },
      },
      {
        i: 7,
        widget: {
          name: "Calendar",
          showYear: true,
        },
      },
      {
        i: 8,
        widget: {
          name: "SearchBar",
          darkMode: false,
        },
      },
    ],
    md: [
      {
        i: 1,
        widget: {
          name: "empty",
        },
      },
      {
        i: 2,
        widget: {
          name: "AnalogClock",
          showSeconds: true,
          smooth: false,
        },
      },
      {
        i: 3,
        widget: {
          name: "empty",
        },
      },
      {
        i: 4,
        widget: {
          name: "SearchBar",
          darkMode: false,
        },
      },
      {
        i: 5,
        widget: {
          name: "empty",
        },
      },
    ],
    sm: [
      {
        i: 1,
        widget: {
          name: "empty",
        },
      },
      {
        i: 2,
        widget: {
          name: "empty",
        },
      },
      {
        i: 3,
        widget: {
          name: "AnalogClock",
          showSeconds: true,
          smooth: true,
        },
      },
      {
        i: 4,
        widget: {
          name: "empty",
        },
      },
      {
        i: 5,
        widget: {
          name: "empty",
        },
      },
    ],
    xs: [
      {
        i: 1,
        widget: {
          name: "empty",
        },
      },
      {
        i: 2,
        widget: {
          name: "empty",
        },
      },
      {
        i: 3,
        widget: {
          name: "empty",
        },
      },
      {
        i: 4,
        widget: {
          name: "AnalogClock",
          showSeconds: true,
          smooth: true,
        },
      },
      {
        i: 5,
        widget: {
          name: "empty",
        },
      },
    ],
    xxs: [
      {
        i: 1,
        widget: {
          name: "empty",
        },
      },
      {
        i: 2,
        widget: {
          name: "empty",
        },
      },
      {
        i: 3,
        widget: {
          name: "empty",
        },
      },
      {
        i: 4,
        widget: {
          name: "empty",
        },
      },
      {
        i: 5,
        widget: {
          name: "AnalogClock",
          showSeconds: true,
          smooth: true,
        },
      },
    ],
  };

  const layouts = {
    lg: [
      {
        w: 3,
        h: 3,
        x: 6,
        y: 6,
        i: "2",
        minW: 2,
        maxW: 10,
        minH: 3,
        maxH: 10,
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 5,
        x: 3,
        y: 1,
        i: "3",
        minW: 2,
        maxW: 10,
        minH: 3,
        maxH: 10,
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 5,
        x: 6,
        y: 1,
        i: "6",
        minW: 2,
        maxW: 10,
        minH: 3,
        maxH: 10,
        moved: false,
        static: false,
      },
      {
        w: 6,
        h: 5,
        x: 3,
        y: 9,
        i: "7",
        minW: 2,
        maxW: 10,
        minH: 3,
        maxH: 10,
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 3,
        x: 3,
        y: 6,
        i: "8",
        minW: 2,
        maxW: 10,
        minH: 3,
        maxH: 10,
        moved: false,
        static: false,
      },
    ],
    md: [
      {
        i: 1,
        w: 2,
        h: 3,
        x: 0,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 2,
        w: 2,
        h: 3,
        x: 2,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 3,
        w: 2,
        h: 3,
        x: 4,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 4,
        w: 2,
        h: 3,
        x: 6,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 5,
        w: 2,
        h: 3,
        x: 8,
        y: 0,
        minW: 2,
        minH: 3,
      },
    ],
    sm: [
      {
        i: 1,
        w: 2,
        h: 3,
        x: 0,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 2,
        w: 2,
        h: 3,
        x: 2,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 3,
        w: 2,
        h: 3,
        x: 4,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 4,
        w: 2,
        h: 3,
        x: 6,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 5,
        w: 2,
        h: 3,
        x: 8,
        y: 0,
        minW: 2,
        minH: 3,
      },
    ],
    xs: [
      {
        i: 1,
        w: 2,
        h: 3,
        x: 0,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 2,
        w: 2,
        h: 3,
        x: 2,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 3,
        w: 2,
        h: 3,
        x: 4,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 4,
        w: 2,
        h: 3,
        x: 6,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 5,
        w: 2,
        h: 3,
        x: 8,
        y: 0,
        minW: 2,
        minH: 3,
      },
    ],
    xxs: [
      {
        i: 1,
        w: 2,
        h: 3,
        x: 0,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 2,
        w: 2,
        h: 3,
        x: 2,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 3,
        w: 2,
        h: 3,
        x: 4,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 4,
        w: 2,
        h: 3,
        x: 6,
        y: 0,
        minW: 2,
        minH: 3,
      },
      {
        i: 5,
        w: 2,
        h: 3,
        x: 8,
        y: 0,
        minW: 2,
        minH: 3,
      },
    ],
  };

  return (
    <>
      <button
        onClick={() => {
          getFromLS("widgetStorage", "widgets");
        }}
      >
        {" "}
        GET WIDGET
      </button>
      <br />
      <button
        onClick={() => {
          getFromLS("layoutStorage", "layouts");
        }}
      >
        {" "}
        GET LAYOUT
      </button>
      <br />
      <button
        onClick={() => {
          saveToDB(userID, widgets, layouts);
        }}
      >
        Save Layout
      </button>
    </>
  );
}
