import { post } from "./http-methods";

export const publishPost = async (
  postBody: string,
  createdAt: string,
  postTitle?: string,
) => {
  const response = await post(
    `/api/post`,
    JSON.stringify({ postBody, createdAt, postTitle }),
  );

  return await response;
};
