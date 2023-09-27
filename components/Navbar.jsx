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
    { name: "Home", to: "/" },
    { name: "About", to: "/" },
    { name: "Demo", to: "/demo" },
    { name: "Configure", to: "/config" },
    { name: "Sign Up", to: "/signup" },
    { name: "Log Out", to: "/" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="py-4 bg-transparent border-b-[#262626] backdrop-blur-sm backdrop-saturate-100"
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
            className="text-lg lg:text-xl border-b-2 border-transparent hover:border-primaryOrange py-1"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="text-lg lg:text-xl border-b-2 border-transparent hover:border-primaryOrange py-1"
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="config"
            className="text-lg lg:text-xl border-b-2 border-transparent hover:border-primaryOrange py-1"
          >
            Configure
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/demo"
            className="text-lg lg:text-xl border-b-2 border-transparent hover:border-primaryOrange py-1"
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
            variant="bordered"
            className="text-lg lg:text-xl p-4"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-transparent">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="primary" className="w-full" href={item.to} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

//  <Image src="/logo/logo.png" width={175} height={175} alt="logo" />
