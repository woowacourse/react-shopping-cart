import { createGlobalStyle } from 'styled-components';
import resetStyle from './resetStyle';

const GlobalStyle = createGlobalStyle`
    ${resetStyle}

    button {
        border:none;
    }
`;

export default GlobalStyle;
