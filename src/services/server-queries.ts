import { db } from "~/server/db";
import {
  createBidirectionalResolver,
  createIdResolver,
} from "./at-proto/id-resolver";
import { Posts } from "~/server/db/schema";

export const fetchPosts = async (): Promise<Posts> => {
  const posts = await db.query.post.findMany({
    orderBy: (post, { desc }) => desc(post.createdAt),
    limit: 10,
  });

  const baseIdResolver = createIdResolver();
  const resolver = createBidirectionalResolver(baseIdResolver);

  const handleMap = await resolver.resolveDidsToHandles(
    posts.map((post) => post.authorDid),
  );

  return { posts, handleMap };
};
