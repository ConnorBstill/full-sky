import Image from "next/image";

import { DateTime } from "luxon";

import { fetchPost } from "~/services/server-queries";
import { UserInfo } from "~/components/server/user-info";
import { ScrollArea } from "~/components/ui/scroll-area";
interface ViewPostPageProps {
  params: { slug: string };
}

export default async function ViewPostPage({ params }: ViewPostPageProps) {
  const { slug } = await params;
  const { post, profile } = await fetchPost(slug);

  return (
    <main className="h-full w-full">
      <ScrollArea>
        <div className="mx-auto w-1/2 p-6">
          <article className="text-lg">
            <div className="mb-7 mr-3 flex h-11 w-full justify-between">
              <UserInfo profile={profile} postCreatedAt={post.createdAt} />
            </div>

            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

            {post.body}
          </article>
        </div>
      </ScrollArea>
    </main>
  );
}
