import { Outlet } from "react-router";
import Haader from "~/components/header";

export default function RootLayout() {
  return (
    <div>
      <Haader />
      <Outlet />
    </div>
  );
}
