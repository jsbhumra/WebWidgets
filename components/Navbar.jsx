"use client";
import React, { useState } from "react";
import Image from "next/image.js";
import "./styles.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Home",
    "About",
    "Demo",
    "Configure",
    "Sign Up",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="py-4 bg-black border-b-[#262626]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src="/logos/logo.png" width={150} height={150} alt="logo" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-5 lg:gap-8" justify="center">
        <NavbarItem>
          <Link
            href="#"
            className="text-lg lg:text-xl border-b-2 border-black hover:border-primaryOrange py-1"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-lg lg:text-xl border-b-2 border-black hover:border-primaryOrange py-1"
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-lg lg:text-xl border-b-2 border-black hover:border-primaryOrange py-1"
          >
            Configure
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/demo"
            className="text-lg lg:text-xl border-b-2 border-black hover:border-primaryOrange py-1"
          >
            Demo
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="login"
            variant="flat"
            className="text-lg lg:text-xl p-4"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            color="primary"
            href="signup"
            variant="flat"
            className="text-lg lg:text-xl p-4"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-black">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="primary" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

//  <Image src="/logo/logo.png" width={175} height={175} alt="logo" />
