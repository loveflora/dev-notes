// error 가 있을 때마다 렌더링

// client components 이어야 함 (페이지가 server에서 렌더링된 후)
"use client";

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
