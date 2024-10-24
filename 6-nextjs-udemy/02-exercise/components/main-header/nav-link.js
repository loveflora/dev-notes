"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  // href, children : to make configurable
  const path = usePathname();

  return (
    <Link
      href={href}
      // href="/meals"
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
      // className={path.startsWith("/meals") ? classes.active : undefined}
    >
      {children}
      {/* Browse Meals */}
    </Link>
  );
}
