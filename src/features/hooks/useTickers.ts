import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import EmailContext from "../contexts/email-context";

export const useTickers = () => {
  const { email } = useContext(EmailContext);
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
