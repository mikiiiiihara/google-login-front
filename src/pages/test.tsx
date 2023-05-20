import { GetServerSideProps } from "next";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { parse } from "cookie";
import TestTemplate from "../components/templates/test-template";

type Props = {
  accessToken?: string;
};

const Home = (props: Props) => {
  const apolloClient = createApolloClient(undefined, props.accessToken || "");
  return (
    <ApolloProvider client={apolloClient}>
      <TestTemplate />
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
