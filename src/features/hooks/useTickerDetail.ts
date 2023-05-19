import { gql, useQuery } from "@apollo/client";

export const useTickerDetail = () => {
  const GET_TICKER_DETAIL = gql`
    query TickerDetail {
      tickerDetail
    }
  `;
  const { loading, data } = useQuery(GET_TICKER_DETAIL);
  const getTickerDetail = () => {
    if (loading) return { tickerDetail: "loading" };
    return { tickerDetail: data };
  };
  return { getTickerDetail };
};
