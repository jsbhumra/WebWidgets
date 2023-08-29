"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import "./styles.css";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <div className="body">
        <div className="textdiv">
          <h4 className="text-3xl font-extrabold text1">LOG IN TO CONTINUE</h4>
          <h2 className="text-6xl font-extrabold heading">Welcome back.</h2>
          <p className="ms-1">
            {" "}
            <span className="question">Become a member?</span>{" "}
            <a className="redirect" href="../signup">
              Register
            </a>
          </p>
        </div>
        <form method="POST" action="../api/login/page">
          <div className="flex flex-col gap-4 mt-10 form">
            <div className="flex flex-wrap md:flex-nowrap mb-2 gap-4 inputlg">
              <Input
                classNames={{ label: "after:content-[']" }}
                type="email"
                name="email"
                variant="bordered"
                color="default"
                label="Email "
                isRequired
              />
            </div>
            <Input
              label="Password"
              name="pass"
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
    </>
  );
}
