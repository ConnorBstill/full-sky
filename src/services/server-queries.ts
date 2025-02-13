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
