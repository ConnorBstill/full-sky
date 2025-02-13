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

const navItems: SideNavItem[] = [
  {
    text: "Home",
    icon: () => <Home className="min-h-6 min-w-6" />,
    href: "/",
  },
  {
    text: "Profile",
    icon: () => <CircleUserRound className="min-h-6 min-w-6" />,
    href: "/",
  },
  {
    text: "Settings",
    icon: () => <Settings className="min-h-6 min-w-6" />,
    href: "/",
  },
];

export default async function HomePage() {
  const hasAuth = await isLoggedIn();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const renderLeftSide = () => {
    if (hasAuth) {
      return (
        <>
          <nav className="items- flex h-1/2 w-full justify-end">
            <ul className="h-full w-1/2">
              {navItems.map(({ href, icon, text }: SideNavItem) => {
                return (
                  <li key={text} className="w-full">
                    <Button
                      variant="ghost"
                      asChild
                      className="flex h-12 justify-start"
                    >
                      <Link href={href} className="h-full w-full">
                        {icon()}
                        <span className="text-xl">{text}</span>
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <WritePostDialog />
        </>
      );
    } else {
      return (
        <Link
          href="/login"
          className={buttonVariants({ variant: "secondary" })}
        >
          Log in with Bluesky
        </Link>
      );
    }
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full w-full justify-between">
        <div className="flex h-full w-1/4 flex-col items-end justify-between p-6">
          {renderLeftSide()}
        </div>

        <div className="h-full w-2/4 border-l border-r p-10">
          <PostsFeed />
        </div>

        <div className="h-full w-1/4 p-6">
          <p>right</p>
        </div>
      </main>
    </HydrationBoundary>
  );
}
