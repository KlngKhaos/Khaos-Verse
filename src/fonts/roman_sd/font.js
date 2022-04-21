import { createGlobalStyle } from 'styled-components';

import RomanSD from './Roman SD.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Roman SD';
        // src: local('Font Name'), local('FontName'),
        url(${RomanSD}) format('ttf'),
        font-weight: 400;
        font-style: normal;
    }
`;