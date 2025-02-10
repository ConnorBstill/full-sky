"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";

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

import { POST_CHARACTER_LIMIT } from "~/lib/consts";

export default function WritePostDialog() {
  const [postBody, setPostBody] = useState("");

  const handlePublishClick = () => {
    if (postBody.length < 300) {
      toast("Not enough characters", {
        description: "Post must be at least 300 characters",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-1/2 pl-1 text-lg">
        <Button>
          <Pencil className="min-h-5 min-w-5" /> Write
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-between pb-7 sm:max-w-[425px] lg:min-h-[80vh] lg:min-w-[500px]">
        <DialogHeader className="mb-1 h-1/5">
          <DialogTitle>Write your post</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 flex-col">
          <Textarea
            onChange={(event) => setPostBody(event.target.value)}
            id="post-textarea"
            className="mb-1 flex-1"
            placeholder="No need to keep it short."
            maxLength={3000}
          />
        </div>

        <DialogFooter className="flex h-1/5 w-full sm:items-center sm:justify-between lg:items-center lg:justify-between">
          <span className={`${postBody.length < 300 ? "text-red-700" : ""}`}>
            {postBody.length}/{POST_CHARACTER_LIMIT}
          </span>
          <Button onClick={handlePublishClick}>Publish post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
