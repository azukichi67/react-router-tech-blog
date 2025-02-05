import { Link } from "react-router";
import type { Article } from "~/types/article";
import { format } from "~/utils/date.utils";

type Props = {
  article: Article;
};

export default function BlogCard({ article }: Props) {
  return (
    <Link to="/" className="cursor-pointer w-1/3 hover:shadow-lg">
      <div className="flex">
        <div className="p-4 flex flex-col items-start border-b-2 border-gray-100 mt-auto">
          <div className="flex gap-1">
            {article.tags?.map((x, i) => {
              return (
                <span
                  key={i}
                  className="inline-block py-1 px-2 rounded bg-green-50 text-green-500 text-xs font-medium tracking-widest"
                >
                  {`#${x.name}`}
                </span>
              );
            })}
          </div>
          <div className="p-2">
            {format(new Date(article._sys.createdAt), "YYYY/MM/DD")}
          </div>
          <h2 className="text-2xl font-medium text-gray-900 px-2 pb-2">
            {article.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
