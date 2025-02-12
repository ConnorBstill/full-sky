"use client";

import { useQuery } from "@tanstack/react-query";

import { Posts } from "~/server/db/schema";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export const PostsFeed = () => {
  const { data: feedPosts } = useQuery<Posts>({
    queryKey: ["posts"],
  });

  const renderPosts = () => {
    if (feedPosts?.posts.length) {
      return feedPosts.posts.map(({ authorDid, createdAt, body }) => (
        <Card key={`${authorDid}${createdAt}`}>
          <span>@{feedPosts.handleMap[authorDid]}</span>
          <p>{body}</p>
        </Card>
      ));
    }
  };

  return <ScrollArea>{renderPosts()}</ScrollArea>;
};

export default PostsFeed;
