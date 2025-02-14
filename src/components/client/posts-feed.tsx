"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { FeedPost } from "~/server/db/schema";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { EllipsisVertical } from "lucide-react";

export const PostsFeed = () => {
  const { data: feedPosts } = useQuery<FeedPost[]>({
    queryKey: ["posts"],
  });

  const renderPosts = () => {
    if (feedPosts?.length) {
      console.log("feedPosts", feedPosts);
      return feedPosts.map(({ post, profile }) => (
        <Card
          key={`${post.authorDid}${post.createdAt}`}
          className="my-6 flex w-full flex-col p-5"
        >
          <div className="mb-4 mr-3 flex h-11 w-full justify-between">
            <div className="flex">
              <Image
                src={profile.avatar}
                width={42}
                height={42}
                className="mr-1 cursor-pointer rounded-full border"
                alt={`${profile.displayName}'s avatar`}
              />

              <div>
                <span className="mr-1 cursor-pointer font-bold">
                  {profile.displayName}Connor Steele
                </span>
                <span className="mr-1 cursor-pointer text-gray-400">
                  @{profile.handle}
                </span>

                <div>
                  <span className="text-gray-400">
                    {DateTime.fromISO(post.createdAt).toLocaleString(
                      DateTime.DATETIME_MED,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <EllipsisVertical className="cursor-pointer" />
          </div>

          <p className="w-full whitespace-normal break-words">{post.body}</p>
        </Card>
      ));
    }
  };

  return (
    <ScrollArea id="feed-scroll-area" className="h-screen w-full px-8">
      {renderPosts()}
    </ScrollArea>
  );
};

export default PostsFeed;
