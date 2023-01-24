import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "../components/globalstyles";
// import client from "../lib/apollo-client";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo-client";
import Guard from "../components/guard/Guard";
const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Guard excludedRoutes="/">
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Component {...pageProps} />
            </ThemeProvider>
          </RecoilRoot>
        </Guard>
      </ApolloProvider>
    </>
  );
}
