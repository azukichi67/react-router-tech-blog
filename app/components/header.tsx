import { getApp } from "~/lib/newt";

export default async function Haader() {
  const app = await getApp();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex tiimagetle-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={app.icon?.value} alt="icon" className="w-10 h-10" />
          <span className="ml-3 text-xl">Guccigu's Blog</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a>
        </nav>
      </div>
    </header>
  );
}
