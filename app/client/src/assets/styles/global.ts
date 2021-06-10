import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --grid-background: #270722;

        /* Node color */
        --node-origin: #a8dadc;
        --node-open: #f1faee; // #ecce8e
        --node-target: #e63946;
        --node-closed: #c2c6a7;
        --node-current: #1d3557;
        --node-path: #457b9d;
        --sidebar-background: #240046;
        --persian-indigo: #3c096c;
        --purple: #5a189a;
        --french-violet: #7b2cbf;
        --dark-orchid: #9d4edd;


    }

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
