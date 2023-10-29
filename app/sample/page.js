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
