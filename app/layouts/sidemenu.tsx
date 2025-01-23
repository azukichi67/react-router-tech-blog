import { List, SearchIcon, TrendingUp, type LucideProps } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function Sidemenu() {
  const menuItems: SideMenuItem[] = [
    { name: "記事一覧", path: "/", icon: List },
    { name: "人気記事", path: "/popular", icon: TrendingUp },
    { name: "記事検索", path: "/search", icon: SearchIcon },
  ];

  return (
    <div>
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-lg">
        <div>
          <div>
            <nav>
              {menuItems.map((x, i) => (
                <Link
                  key={i}
                  to={x.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <x.icon className="mr-3 h-4 w-5" />
                  {x.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

type SideMenuItem = {
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
