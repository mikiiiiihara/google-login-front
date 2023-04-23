import { CookieSerializeOptions, serialize } from "cookie";
import { ServerResponse } from "http";

export const setAccessTokenCookie = (
  accessToken: string,
  res: ServerResponse
) => {
  const options: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "strict",
    path: "/",
  };

  res.setHeader("Set-Cookie", serialize("accessToken", accessToken, options));
};
