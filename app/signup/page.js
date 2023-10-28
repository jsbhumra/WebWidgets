"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import "./styles.css";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  function randomNum() {
    return Math.ceil(Math.random() * 20);
  }
  const bgNum = randomNum();
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function createUser(fname, lname, email, password) {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ fname, lname, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await createUser(data.fname, data.lname, data.email, data.password);
      router.replace("/login");
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className="body flex justify-between items-center pr-24 pb-44">
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
          <form method="POST" onSubmit={handleSubmit}>
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
                  name="fname"
                  value={data.fname}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  classNames={{ label: "after:content-[']" }}
                  variant="bordered"
                  color="default"
                  label="Last Name"
                  name="lname"
                  value={data.lname}
                  onChange={handleInputChange}
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
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
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
                name="password"
                value={data.password}
                onChange={handleInputChange}
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
        <Image
          src={`/bgimages/img${bgNum}.svg`}
          width="400"
          height="400"
          className="bgimg"
        />
      </div>
    </>
  );
}
