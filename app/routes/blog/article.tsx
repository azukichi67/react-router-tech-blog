import type { Route } from ".react-router/types/app/routes/blog/+types/article";

import { getArticle } from "~/lib/newt";
import { format } from "~/utils/date.utils";

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getArticle(params.slug);
  return { article };
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;

  if (!article) {
    return <div>Not Found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-start w-1/3">
        <div className="border-b-2 border-gray-500 w-full">
          <div className="text-4xl font-bold pt-2">{article.title}</div>
          <div className="text-2xl pt-1 ">
            {format(new Date(article._sys.createdAt), "YYYY/MM/DD")}
          </div>
        </div>
        <div
          className="py-4"
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></div>
      </div>
    </div>
  );
}
