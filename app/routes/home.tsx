import { Article, type ArticleJson } from "~/domain/article";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch("https://qiita.com/api/v2/authenticated_user/items", {
    headers: {
      Authorization: `Bearer [token]`,
    },
  });

  const articlesJson: ArticleJson[] = await res.json();
  const articles = articlesJson.map(
    (x) =>
      new Article(x.title, x.url, x.likes_count, x.stocks_count, x.created_at)
  );

  return { articles };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  return (
    <div>
      <div className="flex sm:ml-64">
        <h1>記事一覧</h1>
        <div className="container mx-auto px-4 py-8">
          {articles.map((x) => (
            <p key={x.url}>{x.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
