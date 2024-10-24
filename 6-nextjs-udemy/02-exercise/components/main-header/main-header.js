// "use client";
//_ 가능한 아래에 추가하는게 기능을 잃지 않음 => nav-link 파일을 따로 만듦

import Link from "next/link";
import Image from "next/image";

import logoImg from "/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
//_ import { usePathname } from "next/navigation";

export default function MainHeader() {
  //_ const path = usePathname();
  // client components 에서만 작동함

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* <img src={logoImg.src} alt="A plate with food on it" /> */}
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              {/* NavLink만 client에서 렌더링됨 */}
              <NavLink href="/meals">Browse Meal</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>

              {/* <Link
                href="/community"
                className={
                  path.startsWith("/community") ? classes.active : undefined
                }
              >
                Foodies Community
              </Link> */}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
