import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);

  const incerement = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);
  const resetValue = () => setValue(0);

  return (
    <div className="border-2 border-red-500 flex flex-col gap-10 items-center px-20 py-6 m-4 rounded-lg w-full h-full">
      <div className="text-5xl">Counter</div>
      <div className="text-8xl">{value}</div>
      <div className="flex gap-4">
        <button
          className="text-5xl px-7 border-2 border-red-500 text-center pb-2 rounded-md cursor-pointer"
          onClick={decrement}
        >
          -
        </button>
        <button
          className="text-5xl px-6 border-2 border-red-500 text-center pb-2 rounded-md cursor-pointer"
          onClick={incerement}
        >
          +
        </button>
      </div>
      <div
        className="text-4xl px-11 border-2 border-red-500 text-center pb-2 rounded-md cursor-pointer"
        onClick={resetValue}
      >
        Reset
      </div>
    </div>
  );
};

export default Counter;
