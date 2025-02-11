import { db } from "~/server/db";

export const fetchPosts = async () => {
  const posts = await db.query.post.findMany({
    orderBy: (post, { desc }) => desc(post.createdAt),
    limit: 10,
  });

  return posts;
};
