import Link from "next/link";

import { EllipsisVertical } from "lucide-react";

import { FeedPost } from "~/server/db/schema";

import { UserInfo } from "./user-info";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export const PostsFeed = ({ posts }: { posts: FeedPost[] }) => {
  const renderPosts = () => {
    if (posts?.length) {
      console.log("feedPosts", posts);
      return posts.map(({ post, profile }) => {
        let postBody;
        const href = `view-post/${post.uuid}`;

        if (post.body.length > 450) {
          postBody = (
            <span>
              {post.body.slice(0, 425).trimEnd()}...{" "}
              <Link href={href} className="text-blue-500">
                [cont.]
              </Link>
            </span>
          );
        } else {
          postBody = post.body;
        }

        return (
          <Card
            key={`${post.authorDid}${post.createdAt}`}
            className="my-6 flex w-full flex-col bg-secondary p-5"
          >
            <div className="mb-3 mr-3 flex h-11 w-full justify-between">
              <UserInfo profile={profile} postCreatedAt={post.createdAt} />

              <EllipsisVertical className="cursor-pointer" />
            </div>

            <h1 className="mb-3 text-2xl">{post.title}</h1>

            <p className="w-full whitespace-normal break-words">{postBody}</p>
          </Card>
        );
      });
    }
  };

  return (
    <ScrollArea id="feed-scroll-area" className="h-screen w-full px-8">
      {renderPosts()}
    </ScrollArea>
  );
};

export default PostsFeed;
