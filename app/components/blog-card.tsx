import type { Article } from "~/types/article";

type Props = {
  article: Article;
};

export default function BlogCard({ article }: Props) {
  return (
    <div className="p-12 md:w-1/2 flex flex-col items-start">
      <span className="inline-block py-1 px-2 rounded bg-green-50 text-green-500 text-xs font-medium tracking-widest">
        {`#${article.tags![0].name}`}
      </span>
      <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
        {article.title}
      </h2>
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
        <a className="text-green-500 inline-flex items-center">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
