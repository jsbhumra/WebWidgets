"use client";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
const Toolbar = () => {
  return (
    <div className="bg-transparent backdrop-blur-3xl backdrop-saturate-100 flex flex-col items-center justify-center gap-4 border w-fit px-3 py-1 rounded-3xl absolute right-5 top-5">
      <Tooltip content="Home" color="primary" placement="left">
        <Link href="/">
          <Image src="/home.svg" width={40} height={40} alt="Home" />
        </Link>
      </Tooltip>
      <Tooltip content="Add" color="primary" placement="left">
        <Link href="/config/add">
          <Image src="/add.svg" width={45} height={45} alt="Add" />
        </Link>
      </Tooltip>
      <Tooltip content="Save" color="primary" placement="left">
        <Link href="/save">
          <Image src="/save.svg" width={35} height={35} alt="Save" />
        </Link>
      </Tooltip>
      <Tooltip content="Preview" color="primary" placement="left">
        <Link href="/view">
          <Image src="/preview.svg" width={35} height={35} alt="Preview" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default Toolbar;
