import type { Route } from ".react-router/types/app/routes/+types/search";
import { useEffect, useRef } from "react";
import { useFetcher, useLoaderData } from "react-router";
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

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

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
  const featcher = useFetcher<LoaderData>();
  const articles = featcher.data?.articles || loader.articles;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (featcher.state === "idle") {
      formRef.current?.reset();
    }
  }, [featcher.state]);

  return (
    <div className="flex sm:ml-64">
      <div>
        <featcher.Form method="post" ref={formRef}>
          <input name="keywords" type="text" />
          <button type="submit" name="_action" value="search">
            Submit
          </button>
        </featcher.Form>
      </div>
      <div>
        <div>
          {articles.map((x) => (
            <div key={x.url}>
              <p>{x.title}</p>
              <featcher.Form method="post">
                <input type="hidden" name="title" value={x.title} />
                <button type="submit" name="_action" value="like">
                  ★
                </button>
              </featcher.Form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
