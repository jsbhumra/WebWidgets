import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function App() {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <Dropdown
      color="primary"
      variant="flat"
      className="bg-transparent text-white "
    >
      <DropdownTrigger>
        <Button
          color="primary"
          variant="flat"
          className="text-lg lg:text-2xl p-4"
        >
          {data?.user.fname}
          <span>
            <Image src="/arrow.svg" width={30} height={30} />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        // onAction={(key) => alert(key)}
        className="backdrop-blur-lg border border-primary rounded-lg"
      >
        <DropdownItem className="text-4xl text-center">
          {" "}
          <Link href="/config" className="text-lg">Configure</Link>
        </DropdownItem>
        <DropdownItem
          color="danger"
          className="text-danger text-4xl font-bold text-center"
          onClick={() => {
            signOut();
          }}
        ><span className="text-lg font-semibold">Logout</span>
          
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
