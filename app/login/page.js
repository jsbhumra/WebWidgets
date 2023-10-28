"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import "./styles.css";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.back();
      }
    });
  });

  const [isVisible, setIsVisible] = React.useState(false);
  function randomNum() {
    return Math.ceil(Math.random() * 20);
  }
  const bgNum = randomNum();
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function handleSubmit(event) {
    console.log(data);
    event.preventDefault();

    const email = data.email;
    const password = data.password;

    await signIn("credentials", {
      email: email,
      password: password,
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className="body flex justify-between items-center pr-32 pb-44">
        <div>
          <div className="textdiv">
            <h4 className="text-3xl font-extrabold text1">
              LOG IN TO CONTINUE
            </h4>
            <h2 className="text-6xl font-extrabold heading">Welcome back.</h2>
            <p className="ms-1">
              {" "}
              <span className="question">Become a member?</span>{" "}
              <a className="redirect" href="../signup">
                Register
              </a>
            </p>
          </div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-10 form">
              <div className="flex flex-wrap md:flex-nowrap mb-2 gap-4 inputlg">
                <Input
                  classNames={{ label: "after:content-[']" }}
                  type="email"
                  variant="bordered"
                  color="default"
                  label="Email "
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  isRequired
                />
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
                classNames={{ label: "after:content-[']" }}
                name="password"
                value={data.password}
                onChange={handleInputChange}
                isRequired
              />
              <Button
                type="submit"
                color="primary"
                className="submitbtn"
                radius="full"
                variant="ghost"
              >
                Log In
              </Button>
            </div>
          </form>
        </div>

        <Image
          src={`/bgimages/img${bgNum}.svg`}
          width="500"
          height="500"
          className="bgimg"
        />
      </div>
    </>
  );
}
