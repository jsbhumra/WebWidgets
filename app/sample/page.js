"use client";

import { useSession } from "next-auth/react";
import _ from "lodash";

export default function add() {
  const { data, status } = useSession();

  const userID = data?.user._id;

  function getFromLS(name, key) {
    let ls = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem(name));

        // console.log(ls[key]);
        return ls[key];
      } catch (e) {}
    } else {
      {
      }
    }
  }

  async function getfromdb(userID) {
    const response = await fetch(`/api/widget?userID=${userID}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  async function compareData() {
    var isTrue;
    const dbdata = await getfromdb(userID);
    const db1 = dbdata?.layouts;
    const db2 = dbdata?.widgets;

    const lsdata1 = getFromLS("layoutStorage", "layouts");
    const lsdata2 = getFromLS("widgetStorage", "widgets");

    isTrue = _.isEqual(db1, lsdata1) && _.isEqual(db2, lsdata2);
    console.log(isTrue);
  }

  return (
    <>
      <button
        onClick={() => {
          compareData();
        }}
      >
        Compare
      </button>
    </>
  );
}
