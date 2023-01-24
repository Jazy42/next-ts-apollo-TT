import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Avenir, Medium';
    src: url('/fonts/AvenirLTSd-Black.otf') format('otf');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Avenir, Book';
    src: url('/fonts/AvenirLTSd-Book.otf') format('otf');
    font-style: bold;
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'Avenir, Heavy';
    src: url('/fonts/AvenirLTSd-Roman.otf') format('otf');
    font-style: bold;
    font-weight: 700;
    font-display: swap;
  }

`;

export default GlobalStyle;
