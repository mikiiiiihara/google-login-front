import { parse } from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import { redirectToPage } from "./redirect-to-page";

export const getTokens = (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  },
  res: ServerResponse
) => {
  // リクエストのクッキーを取得
  const cookies = req.headers.cookie;

  // クッキーをパースし、アクセストークンを取得
  const parsedCookies = parse(cookies || "");
  const accessToken = parsedCookies.accessToken;
  const refreshToken = parsedCookies.refreshToken;
  // アクセストークンが存在しない場合、/loginにリダイレクト
  if (accessToken == null) {
    redirectToPage(res, "/login");
  }
  return {
    accessToken,
    refreshToken,
  };
};
