import Link from "next/link";
import { ReactNode } from "react";

import { Home, CircleUserRound, Settings } from "lucide-react";

import WritePostDialog from "~/components/server/write-post-dialog";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import { isLoggedIn } from "~/lib/auth";
import { db } from "~/server/db";

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

const navItems = [{}];

export default async function HomePage() {
  const posts = await getPosts();
  const hasAuth = await isLoggedIn();

  const renderLeftSide = () => {
    if (hasAuth) {
      return (
        <nav className="items- flex h-1/2 w-full justify-end">
          <ul className="h-full w-1/2">
            <li className="w-full">
              <Button
                variant="ghost"
                asChild
                className="flex h-12 justify-start"
              >
                <Link href="/login" className="h-full w-full">
                  <Home className="min-h-6 min-w-6" />{" "}
                  <span className="text-xl">Home</span>
                </Link>
              </Button>
            </li>

            <li className="w-full">
              <Button
                variant="ghost"
                asChild
                className="flex h-12 justify-start"
              >
                <Link href="/login" className="w-full">
                  <CircleUserRound className="min-h-6 min-w-6" />{" "}
                  <span className="text-xl">Profile</span>
                </Link>
              </Button>
            </li>

            <li className="w-full">
              <Button
                variant="ghost"
                asChild
                className="flex h-12 justify-start"
              >
                <Link href="/login" className="w-full">
                  <Settings className="min-h-6 min-w-6" />{" "}
                  <span className="text-xl">Settings</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
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
      <div className="h-full w-1/4 p-6">{renderLeftSide()}</div>

      <div className="h-full w-2/4 border-l border-r">
        {posts}

        {hasAuth ? <WritePostDialog /> : <></>}
      </div>

      <div className="h-full w-1/4 p-6">
        <p>right</p>
      </div>
    </main>
  );
}
