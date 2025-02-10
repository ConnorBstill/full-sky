"use client";

import { Pencil } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Textarea } from "../ui/textarea";

export default function WritePostDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil /> Write
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-between sm:max-w-[425px] lg:min-h-[80vh] lg:min-w-[500px]">
        <DialogHeader className="h-1/6">
          <DialogTitle>Write your post</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1">
          <Textarea
            id="post-textarea"
            className="mb-1 flex-1"
            placeholder="No need to keep it short."
            maxLength={3000}
          />
        </div>

        <DialogFooter className="h-1/6">
          <Button type="submit">Publish post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
