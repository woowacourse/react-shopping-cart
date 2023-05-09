import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    ul,
    li {
        list-style: none;
    }
    button, input {
        all:unset;
    }
`;

export default GlobalStyle;
