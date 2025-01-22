import type { Route } from ".react-router/types/app/routes/+types/popular";
import { Article, type ArticleJson } from "~/domain/article";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(
    "https://qiita.com/api/v2/items?page=1&per_page=20&query=user%3ASicut_study",
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
}

export default function Popular({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  return (
    <div>
      <div className="flex sm:ml-64">
        <h1>人気記事</h1>
        <div className="container mx-auto px-4 py-8">
          {articles.map((x) => (
            <p key={x.url}>{x.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
