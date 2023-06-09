// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  try {
    const response = await axios.get<{ accessToken: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${cookies["refreshToken"]}`,
        },
      }
    );
    const accessToken = response.data.accessToken;
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
}
