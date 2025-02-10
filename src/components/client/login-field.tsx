"use client";

import { useRef } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const LoginField = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLoginClick = async () => {
    try {
      const loginResponse = await fetch(`/api/oauth/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle: inputRef.current.value }),
      });

      const loginResponseData = await loginResponse.json();

      if (loginResponseData.data?.redirectUrl) {
        window.location.href = loginResponseData.data?.redirectUrl;
      }
    } catch (err) {
      console.error("handleLoginClick", err);
    }
  };

  return (
    <>
      <Input
        className="mr-5 w-2/3"
        placeholder="Enter your handle (e.g. alice.bsky.social)"
        ref={inputRef}
      />

      <Button onClick={handleLoginClick}>Log In</Button>
    </>
  );
};
