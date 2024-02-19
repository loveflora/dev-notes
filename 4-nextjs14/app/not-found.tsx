import { Metadata } from "next";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return <h1>Not Found !</h1>;
}

// 없는 경로일 경우
// not-found.tsx
