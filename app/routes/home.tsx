import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return( 
    <div>
      <div className="flex sm:ml-64">
        <h1>記事一覧</h1>
      </div>
    </div>
  );
}
