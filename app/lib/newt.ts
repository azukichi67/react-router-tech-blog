import { createClient, type GetContentQuery } from "newt-client-js";
import type { Article } from "~/types/article";

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + "",
  token: process.env.NEWT_API_TOKEN + "",
  apiType: process.env.NEWT_API_TYPE as "cdn" | "api",
});

export const getArticles = async (query?: GetContentQuery) => {
  const { items: articles, total } = await client.getContents<Article>({
    appUid: process.env.NEWT_APP_UID + "",
    modelUid: process.env.NEWT_ARTICLE_MODEL_UID + "",
    query: {
      depth: 2,
      ...query,
    },
  });

  return {
    articles,
    total,
  };
};
