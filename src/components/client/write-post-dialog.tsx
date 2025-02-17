"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { QueryClient, useMutation } from "@tanstack/react-query";

import { Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { publishPost } from "~/services/client-queries";

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

import {
  POST_TITLE_CHARACTER_LIMIT,
  POST_BODY_CHARACTER_LIMIT,
} from "~/lib/consts";
import * as FullskyPost from "~/lexicon/types/com/fullsky/post";
import { Input } from "../ui/input";

const WritePostDialog = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = new QueryClient();
  const router = useRouter();

  const { mutate: publishPostMutation, isPending: postIsPending } = useMutation(
    {
      mutationFn: ({ body, createdAt, title }: FullskyPost.Record) =>
        publishPost(body, createdAt, title),
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        });

        setDialogOpen(false);
        setPostBody("");
        router.refresh();
      },
    },
  );

  const handlePublishClick = () => {
    if (postBody.length < 300) {
      toast("Not enough characters", {
        description: "Post must be at least 300 characters",
      });
    } else {
      const now = new Date();

      publishPostMutation({
        body: postBody,
        createdAt: now.toISOString(),
        title: postTitle,
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className="w-1/2 pl-1 text-lg">
        <Button onClick={() => setDialogOpen(true)}>
          <Pencil className="min-h-5 min-w-5" /> Write
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`flex min-h-[90vh] min-w-[40vw] flex-col justify-between pb-7`}
      >
        <DialogHeader className="mb-1 h-1/5">
          <DialogTitle>Write your post</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <Input
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Title (optional)"
            maxLength={75}
            className="mb-1 lg:text-base"
          />

          <span className="self-end text-sm">
            {postTitle.length}/{POST_TITLE_CHARACTER_LIMIT}
          </span>
        </div>

        <div className="mb-2 flex flex-1 flex-col">
          <Textarea
            onChange={(e) => setPostBody(e.target.value)}
            id="post-textarea"
            className="mb-1 flex-1 lg:text-base"
            placeholder="No need to keep it short (at least 300 characters)."
            maxLength={3000}
          />

          <span
            className={`${postBody.length < 300 ? "text-red-700" : ""} self-end text-sm`}
          >
            {postBody.length}/{POST_BODY_CHARACTER_LIMIT}
          </span>
        </div>

        <DialogFooter className="flex h-1/5 w-full">
          {/* <span className={`${postBody.length < 300 ? "text-red-700" : ""}`}>
            {postBody.length}/{POST_BODY_CHARACTER_LIMIT}
          </span> */}

          <Button onClick={handlePublishClick} disabled={postIsPending}>
            {postIsPending ? <Loader2 /> : "Publish post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { WritePostDialog };
