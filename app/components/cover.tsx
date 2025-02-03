import { getApp } from "~/lib/newt";

export async function Cover() {
  const app = await getApp();

  return (
    <div
      className="w-full h-72 bg-cover bg-center"
      style={{ backgroundImage: `url(${app.cover?.value})` }}
    >
      &nbsp;
    </div>
  );
}
