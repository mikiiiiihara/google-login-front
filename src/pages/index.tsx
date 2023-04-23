import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { redirectToPage } from "../features/auth/redirect-to-page";
import { setAccessTokenCookie } from "../features/auth/set-access-token-cookie";
import { getTokens } from "../features/auth/get-tokens";
import { isUnAuthorizedError } from "../features/auth/is-unauthorized-error";
import { useTickers } from "../features/hooks/useTickers";

interface Data {
  title: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  // トークンを取得
  const { accessToken, refreshToken } = getTokens(req, res);
  // APIリクエストを実行し、ヘッダーにアクセストークンを追加
  let response;
  try {
    response = await axios.get<Data>(
      `${process.env.NEXT_PUBLIC_API_URL}/secret`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    if (isUnAuthorizedError(error) && refreshToken) {
      // 401エラーが発生し、リフレッシュトークンが存在する場合
      try {
        const newTokens = await axios.get<{
          accessToken: string;
          refreshToken: string;
        }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // refreshTokenを使用して新しいアクセストークンを取得するAPIエンドポイント
          },
        });
        const newAccessToken = newTokens.data.accessToken;
        // 新しいアクセストークンをCookieに保存
        setAccessTokenCookie(newAccessToken, res);
        // 新しいアクセストークンでAPIリクエストを再試行
        response = await axios.get<Data>(
          `${process.env.NEXT_PUBLIC_API_URL}/secret`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
      } catch (refreshError) {
        if (isUnAuthorizedError(error)) {
          // リフレッシュトークンも無効な場合、/loginにリダイレクト
          redirectToPage(res, "/login");
        }
        throw refreshError;
      }
    } else {
      throw error;
    }
  }

  const data = response.data;
  // 取得したデータをpropsとして渡す
  return {
    props: {
      data,
    },
  };
}

interface Props {
  data: string;
}
const Home: React.FC<Props> = ({ data }) => {
  // 取得したデータを使用してページをレンダリング
  // GraphQLを取得
  const { getTickers } = useTickers();
  const tickers = getTickers().tickers;
  if (tickers == "loading") return <div>Loading...</div>;
  return (
    <div>
      <h1>Home</h1>
      <p>{data}</p>
      <p>useQueryからの取得値：{tickers.tickers}</p>
    </div>
  );
};

export default Home;
