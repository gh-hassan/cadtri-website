import { requireAdminSession } from "../../_lib/session";
import { BlogForm } from "../blog-form";

export default async function NewBlogPostPage() {
  await requireAdminSession();

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="mb-8">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-secondary">Admin · Blog</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Write New Post</h1>
      </div>
      <BlogForm />
    </main>
  );
}
