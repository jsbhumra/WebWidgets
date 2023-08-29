"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import "./styles.css";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import Image from "next/image";

export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);
    function randomNum() {
        return Math.ceil(Math.random() * 20);
    }
    const bgNum=randomNum()
    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <>
        <div className="body flex justify-between pr-24 pb-44">
            <div>
            <div className="textdiv">
            <h4 className="text-3xl font-extrabold text1">SIGN UP FOR FREE</h4>
            <h2 className="text-6xl font-extrabold heading">
                Create new account.
            </h2>
            <p className="ms-1">
                {" "}
                <span className="question">Already a member?</span>{" "}
                <a className="redirect" href="../login/">
                Login
                </a>
            </p>
            </div>
            <form method="POST" action="">
            <div className="flex flex-col gap-4 mt-10 form">
                <div className="flex flex-wrap md:flex-nowrap mb-2 gap-4 inputsm">
                <Input
                    type="text"
                    classNames={{ label: "after:content-[']" }}
                    variant="bordered"
                    color="default"
                    label="First Name"
                    isRequired
                    hideRequired="true"
                />
                <Input
                    type="text"
                    classNames={{ label: "after:content-[']" }}
                    variant="bordered"
                    color="default"
                    label="Last Name"
                    isRequired
                />

                {/* <Input type="email" variant="bordered" labelPlacement="outside" label="Email" /> */}
                </div>
                {/* <div className="flex flex-wrap md:flex-nowrap mb-4 gap-4 inputsm"> */}
                {/* <Input type="email" variant="bordered" labelPlacement="outside" label="Email" /> */}
                {/* </div> */}
                <div className="flex flex-wrap md:flex-nowrap mb-2 gap-4 inputlg">
                <Input
                    type="email"
                    classNames={{ label: "after:content-[']" }}
                    variant="bordered"
                    color="default"
                    label="Email"
                    isRequired
                />
                {/* <Input type="email" variant="bordered" color="default" label="Email" startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }/> */}
                {/* <Input type="email" variant="bordered" labelPlacement="outside" label="Email" /> */}
                </div>
                <Input
                label="Password"
                variant="bordered"
                endContent={
                    <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="inputlg  mb-6"
                pattern="[a-zA-Z0-9@]{1,15}"
                title="Password should be digits (0 to 9) or alphabets (a to z)."
                classNames={{ label: "after:content-[']" }}
                isRequired
                />
                <div className="inputlg">
                <Button
                type="submit"
                color="primary"
                className="submitbtn"
                radius="full"
                variant="ghost"
                >
                Create Account
                </Button>
                </div>
                
            </div>
            </form>
            </div>
            <Image src={`/bgimages/img${bgNum}.svg`} width="600" height="400" className="bgimg"/>

        </div>
        </>
    );
}
