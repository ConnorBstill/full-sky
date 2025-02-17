import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Home, CircleUserRound, Settings } from "lucide-react";

import { fetchPosts } from "~/services/server-queries";

import WritePostDialog from "~/components/client/write-post-dialog";
import { buttonVariants } from "~/components/ui/button";
import { Button } from "~/components/ui/button";

import { isLoggedIn } from "~/lib/auth";
import { SideNavItem } from "~/lib/types";

import PostsFeed from "~/components/client/posts-feed";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

interface ViewPostPageProps {
  params: { slug: string };
}

export default async function ViewPostPage({ params }: ViewPostPageProps) {
  const { slug } = await params;
  const post = await db.query.post.findFirst({
    where: (data, { eq }) => eq(data.uuid, slug),
  });

  return (
    <main>
      <div className="mx-auto max-w-3xl p-6">
        {/* <h1 className="text-3xl font-bold mb-4">{post}</h1> */}
        <article className="text-lg">{post.body}</article>
      </div>
    </main>
  );
}
