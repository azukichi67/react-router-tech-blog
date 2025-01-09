import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/sidemenu.tsx", [
    index("routes/home.tsx"),
    route("popular", "routes/popular.tsx"),
    route("search", "routes/search.tsx"),
  ]),
] satisfies RouteConfig;
