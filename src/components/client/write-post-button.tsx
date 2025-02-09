"use client";

import { Pencil } from "lucide-react";

import { Button, ButtonProps } from "../ui/button";

export const WritePostButton = (props: ButtonProps) => {
  return (
    <Button className={props.className}>
      <Pencil /> Write
    </Button>
  );
};

export default WritePostButton;
