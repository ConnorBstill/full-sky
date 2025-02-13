"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { FeedPost } from "~/server/db/schema";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export const PostsFeed = () => {
  const { data: feedPosts } = useQuery<FeedPost[]>({
    queryKey: ["posts"],
  });

  const renderPosts = () => {
    if (feedPosts?.length) {
      console.log("feedPosts", feedPosts);
      return feedPosts.map(({ post, profile }) => (
        <Card key={`${post.authorDid}${post.createdAt}`}>
          <Image
            src={profile.avatar}
            width={40}
            height={40}
            className="rounded-full border"
            alt={`${profile.displayName}'s avatar`}
          />
          <span>@{profile.handle}</span>
          <p>{post.body}</p>
        </Card>
      ));
    }
  };

  return <ScrollArea>{renderPosts()}</ScrollArea>;
};

export default PostsFeed;
