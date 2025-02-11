"use client";

import { useQuery } from "@tanstack/react-query";

import { FullskyPostRecord } from "~/lexicon/types/com/fullsky/post";

import { ButtonProps } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export const PostsFeed = () => {
  const { data: posts } = useQuery<FullskyPostRecord[]>({
    queryKey: ["posts"],
  });

  const renderPosts = () => {
    if (posts?.length) {
      return posts.map((post) => (
        <Card key={`${post.author_did}${post.createdAt}`}>
          <p>{post.body}</p>
        </Card>
      ));
    }
  };

  return <ScrollArea>{renderPosts()}</ScrollArea>;
};

export default PostsFeed;
