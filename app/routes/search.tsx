import type { Route } from ".react-router/types/app/routes/+types/search";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFetcher, useLoaderData } from "react-router";
import BlogCardWithFavorite from "~/components/BlogCardWithFavorite";
import { Article, type ArticleJson } from "~/domain/article";

export async function loader({ params }: Route.LoaderArgs) {
  const { articles } = await fetchArticles();
  return { articles };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

const fetchArticles = async (keyword?: string) => {
  const query = `user:Sicut_study${keyword ? `+title:${keyword}` : ""}`;
  const res = await fetch(
    `https://qiita.com/api/v2/items?page=1&per_page=20&query=${query}`,
    {
      headers: {
        Authorization: `Bearer [token]`,
      },
    }
  );

  const articlesJson: ArticleJson[] = await res.json();
  const articles = articlesJson.map(
    (x) =>
      new Article(x.title, x.url, x.likes_count, x.stocks_count, x.created_at)
  );

  return { articles };
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const _action = formData.get("_action");

  switch (_action) {
    case "search": {
      const keywords = formData.get("keywords") as string;
      const { articles } = await fetchArticles(keywords);
      return { articles };
    }

    case "like": {
      const title = formData.get("title") as string;
      console.log(`${title} をお気に入りしました`);
      const { articles } = await fetchArticles();
      return { articles };
    }
  }
}

export default function Search() {
  const loader = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();
  const articles = fetcher.data?.articles || loader.articles;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle") {
      formRef.current?.reset();
    }
  }, [fetcher.state]);

  return (
    <div className="flex-1 sm:ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-800">記事を検索</h2>
        <fetcher.Form method="post" ref={formRef} className="mb-8 flex">
          <input
            type="text"
            name="keywords"
            placeholder="キーワードを入力..."
            className="flex-grow rounded-l-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            name="_action"
            value="search"
            className="flex items-center rounded-r-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            <SearchIcon className="mr-2 h-5 w-5" />
            検索
          </button>
        </fetcher.Form>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <fetcher.Form method="post" key={article.url}>
              <BlogCardWithFavorite article={article} />
            </fetcher.Form>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
