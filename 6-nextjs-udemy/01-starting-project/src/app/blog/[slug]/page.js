export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1>BlogPostPage</h1>
      {/* dynamic route */}
      <p>{params.slug}</p>
    </main>
  );
}
