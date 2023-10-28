import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function App() {
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
          className="text-lg lg:text-xl p-4"
        >
          Dhruv
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => alert(key)}
      >
        <DropdownItem key="new" className="text-4xl">
          Create
        </DropdownItem>
        <DropdownItem key="copy" className="text-4xl">
          Copy link
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          className="text-danger text-lg lg:text-xl"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
