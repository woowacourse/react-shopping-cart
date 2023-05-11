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
    
    @font-face {
        font-family: 'BM-HANNA';
        src: url('https://cdn.jsdelivr.net/gh/wizfile/font/BM-HANNA.eot');
        src:url('https://cdn.jsdelivr.net/gh/wizfile/font/BM-HANNA.woff') format('woff');
        font-style: normal;
    }
`;

export default GlobalStyle;
