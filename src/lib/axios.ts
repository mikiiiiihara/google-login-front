import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, // NestJS APIエンドポイント
  withCredentials: true, // Cookieをサポートするため
});

// JWTトークンを取得する関数（例: Cookie、localStorageから取得）
const getToken = () => {
  // ここでCookieからトークンを取得
  return Cookies.get("accessToken");
};

// Axiosインターセプターを使用して、すべてのリクエストに認証ヘッダーを追加
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
