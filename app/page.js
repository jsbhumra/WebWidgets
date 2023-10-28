"use client";
import Nav from "../components/Navbar";
import Polygon from "../components/Polygon";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bgcol w-full h-screen">
      <Nav />
      <div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 pt-10">
          <div className="text-5xl text-white font-bold text-center">
            Welcome to
          </div>
          <div className="text-8xl text-primary font-extrabold text-center">
            WebWidgets
          </div>
          <br></br>
          <div className="text-3xl text-white text-center p-5 pb-10 font-semibold">
            Innovate. Integrate. Widgetize.
          </div>
          <br></br>

          <Button
            color="primary"
            variant="flat"
            className="left-1/2 -translate-x-1/2 px-6 py-7 text-2xl backdrop-blur-2xl font-semibold border border-primaryOrange"
            onClick={() => {
              router.push("/setup");
            }}
          >
            Get Started
            <span className="">
              <Image src="/lightning.svg" width={30} height={30} />
            </span>
          </Button>
        </div>
        <div>
          <Polygon />
        </div>
      </div>
    </div>
  );
}
