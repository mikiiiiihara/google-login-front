import { gql, useQuery } from "@apollo/client";

export const useTickers = () => {
  const GET_TICKERS = gql`
    query GetTickers {
      tickers
    }
  `;
  const { loading, error, data } = useQuery(GET_TICKERS, {
    ssr: true, // SSR を有効にします
  });
  const getTickers = () => {
    if (loading) return { tickers: "loading" };
    return { tickers: data };
  };
  return { getTickers };
};
