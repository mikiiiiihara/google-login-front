import { ServerResponse } from "http";

export const redirectToPage = (res: ServerResponse, redirectToUrl: string) => {
  res.statusCode = 302;
  res.setHeader("Location", redirectToUrl);
  res.end();
  return { props: {} };
};
