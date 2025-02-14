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

import { POST_CHARACTER_LIMIT } from "~/lib/consts";
import * as FullskyPost from "~/lexicon/types/com/fullsky/post";

export default function WritePostDialog() {
  const [postBody, setPostBody] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = new QueryClient();
  const router = useRouter();

  const { mutate: publishPostMutation, isPending: postIsPending } = useMutation(
    {
      mutationFn: ({ body, createdAt }: FullskyPost.Record) =>
        publishPost(body, createdAt),
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

      publishPostMutation({ body: postBody, createdAt: now.toISOString() });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className="w-1/2 pl-1 text-lg">
        <Button onClick={() => setDialogOpen(true)}>
          <Pencil className="min-h-5 min-w-5" /> Write
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-between pb-7 sm:max-w-[425px] lg:min-h-[80vh] lg:min-w-[500px]">
        <DialogHeader className="mb-1 h-1/5">
          <DialogTitle>Write your post</DialogTitle>
        </DialogHeader>

        <div className="mb-2 flex flex-1 flex-col">
          <Textarea
            onChange={(event) => setPostBody(event.target.value)}
            id="post-textarea"
            className="mb-1 flex-1"
            placeholder="No need to keep it short (at least 300 characters)."
            maxLength={3000}
          />
        </div>

        <DialogFooter className="flex h-1/5 w-full sm:items-center sm:justify-between lg:items-center lg:justify-between">
          <span className={`${postBody.length < 300 ? "text-red-700" : ""}`}>
            {postBody.length}/{POST_CHARACTER_LIMIT}
          </span>

          <Button onClick={handlePublishClick} disabled={postIsPending}>
            {postIsPending ? <Loader2 /> : "Publish post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
