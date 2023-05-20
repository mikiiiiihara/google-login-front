import { gql, useQuery } from "@apollo/client";

export const useTickers = () => {
  const GET_TICKERS = gql`
    query GetTickers {
      tickers
    }
  `;
  const { loading, data } = useQuery(GET_TICKERS);
  const getTickers = () => {
    if (loading) return { tickers: "loading" };
    return { tickers: data };
  };
  return { getTickers };
};
