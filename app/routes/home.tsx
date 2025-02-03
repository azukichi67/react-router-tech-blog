import BlogCard from "~/components/blog-card";
import { Cover } from "~/components/cover";
import { getArticles } from "~/lib/newt";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const { articles } = await getArticles();
  return { articles };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  return (
    <>
      <Cover />
      <BlogCard article={articles[0]} />
    </>
  );
}
