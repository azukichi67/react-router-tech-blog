import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("blog", [route(":slug", "routes/blog/article.tsx")]),
  ]),
] satisfies RouteConfig;
