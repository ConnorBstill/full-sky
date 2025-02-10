import { LucideIcon, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface Response<T> {
  data: T;
  msg: string;
  err: boolean;
}

export interface OauthSession {
  did: string;
}

export interface SideNavItem {
  text: string;
  icon: () => JSX.Element;
  href: string;
}
