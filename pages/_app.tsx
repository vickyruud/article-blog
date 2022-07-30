import "../styles/globals.css";
import type { AppProps } from "next/app";
import BlogApolloProvider from "../graphql/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlogApolloProvider>
      <Component {...pageProps} />
    </BlogApolloProvider>
  );
}

export default MyApp;
