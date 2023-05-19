import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../lib/apolloClient/apollo-client";
import { parse } from "cookie";
import EmailContext from "../features/contexts/email-context";

function App({
  Component,
  pageProps,
  accessToken,
  email,
}: AppProps & { accessToken?: string; email?: string }) {
  const apolloClient = createApolloClient(pageProps.req, accessToken);
  return (
    <EmailContext.Provider value={{ email }}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </EmailContext.Provider>
  );
}
App.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & { accessToken?: string; email?: string }> => {
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx)
    : {};

  let accessToken;
  let email;
  if (appContext.ctx.req) {
    const cookies = parse(appContext.ctx.req.headers.cookie || "");
    accessToken = cookies["accessToken"];
    email = cookies["email"];
  }

  return { pageProps, accessToken, email };
};

export default App;
