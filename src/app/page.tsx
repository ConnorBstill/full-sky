import { accessSync } from "fs";
import Link from "next/link";
import { ReactNode } from "react";

import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { WritePostButton } from "~/components/client/write-post-button";
import WritePostDialog from "~/components/server/write-post-dialog";

import { db } from "~/server/db";

const getPosts = async (): Promise<ReactNode[]> => {
  const posts = await db.query.post.findMany({
    orderBy: (post, { asc }) => asc(post.createdAt),
    limit: 10,
  });

  return posts.map((post) => {
    return (
      <Card>
        <CardContent>{post.body}</CardContent>
      </Card>
    );
  });
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex h-full w-full justify-between">
      <div className="h-full w-1/4">
        <p>left</p>
      </div>

      <div className="h-full w-2/4 border-l border-r">
        {posts}

        <WritePostDialog />
      </div>

      <div className="h-full w-1/4">
        <p>right</p>
      </div>
    </main>
  );
}
