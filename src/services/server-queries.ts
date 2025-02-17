import { AtpAgent } from "@atproto/api";

import { db } from "~/server/db";
import { FeedPost } from "~/server/db/schema";

export const fetchPosts = async (): Promise<FeedPost[]> => {
  try {
    const agent = new AtpAgent({ service: "https://public.api.bsky.app" });
    const posts = await db.query.post.findMany({
      orderBy: (post, { desc }) => desc(post.createdAt),
      limit: 10,
    });

    const authorDids = posts.map((post) => post.authorDid);
    const { data } = await agent.app.bsky.actor.getProfiles({
      actors: authorDids,
    });

    return posts.map((post, index) => {
      return {
        post,
        profile: data.profiles[index],
      };
    });
  } catch (err) {
    console.log("fetchPosts err", err);

    return [];
  }
};

export const fetchPost = async (postId: string): Promise<FeedPost> => {
  try {
    const agent = new AtpAgent({ service: "https://public.api.bsky.app" });
    const post = await db.query.post.findFirst({
      where: (post, { eq }) => eq(post.uuid, postId),
    });

    const { data: profile } = await agent.app.bsky.actor.getProfile({
      actor: post.authorDid,
    });

    return {
      post,
      profile,
    };
  } catch (err) {
    console.log("fetchPosts err", err);

    return {
      post: null,
      profile: null,
    };
  }
};
