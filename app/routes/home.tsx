import { motion } from "framer-motion";
import BlogCard2 from "~/components/BlogCard2";
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
    <div className="flex-1 sm:ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-800">記事一覧</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg-grid-cols-3">
          {articles.map((x) => (
            <BlogCard2 key={x._id} article={x} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
