import Link from "next/link";
import { ReactNode } from "react";

import { Home, CircleUserRound, Settings } from "lucide-react";

import WritePostDialog from "~/components/client/write-post-dialog";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

import { isLoggedIn } from "~/lib/auth";
import { db } from "~/server/db";

import { SideNavItem } from "~/lib/types";

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
  const posts = await getPosts();
  const hasAuth = await isLoggedIn();

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
    <main className="flex h-full w-full justify-between">
      <div className="flex h-full w-1/4 flex-col items-end justify-between p-6">
        {renderLeftSide()}
      </div>

      <div className="h-full w-2/4 border-l border-r">{posts}</div>

      <div className="h-full w-1/4 p-6">
        <p>right</p>
      </div>
    </main>
  );
}
