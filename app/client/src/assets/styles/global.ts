import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {}

    html, body, #root {
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;

    }

    #root {
        display: relative;
    }
`;

export default GlobalStyle;
