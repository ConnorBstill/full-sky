import Link from "next/link";

import { Home, CircleUserRound, Settings } from "lucide-react";

import { fetchPosts } from "~/services/server-queries";

import { WritePostDialog } from "~/components/client/write-post-dialog";
import { buttonVariants } from "~/components/ui/button";
import { Button } from "~/components/ui/button";

import { isLoggedIn } from "~/lib/auth";
import { SideNavItem } from "~/lib/types";

import { PostsFeed } from "~/components/server/posts-feed";

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
  const posts = await fetchPosts();

  const renderLeftSide = () => {
    if (hasAuth) {
      return (
        <>
          <nav className="flex h-1/2 w-full justify-end">
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
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <main className="flex h-screen w-full justify-between">
      <div className="flex h-screen w-1/4 flex-col items-end justify-between p-6">
        {renderLeftSide()}
      </div>

      <div className="h-screen w-1/2 border-l border-r">
        <PostsFeed posts={posts} />
      </div>

      <div className="h-screen w-1/4 p-6"></div>
    </main>
    // </HydrationBoundary>
  );
}
