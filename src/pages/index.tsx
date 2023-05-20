import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { parse } from "cookie";
import { GetServerSideProps } from "next";
import TopTemplate from "../components/templates/top-template";
import router from "next/router";
import { useEffect } from "react";

type Props = {
  accessToken?: string;
};

const Home = (props: Props) => {
  // accessTokenが取得できなかった場合、ログイン画面に飛ばす
  useEffect(() => {
    if (props.accessToken == null || props.accessToken.length === 0)
      router.push("/login");
  }, [props.accessToken]);
  const apolloClient = createApolloClient(undefined, props.accessToken);
  return (
    <ApolloProvider client={apolloClient}>
      <TopTemplate />
    </ApolloProvider>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let accessToken = "";
  if (context.req.headers.cookie) {
    const cookies = parse(context.req.headers.cookie);
    accessToken = cookies["accessToken"]; // Remove const before accessToken here
  }

  // Fetch your page props here...

  return {
    props: {
      accessToken,
    },
  };
};
