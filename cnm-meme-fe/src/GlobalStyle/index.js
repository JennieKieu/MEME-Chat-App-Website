import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --primary: #00AE72;
}
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .btn-primary {
        color: white !important;
    }

    /* Scrollbar dọc */
    html *::-webkit-scrollbar {
        border-radius: 0;
        width: 8px;
    }

    html *::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #02a40b99;
        height: 8px; /* Chiều cao cho thanh cuộn dọc */
    }

    html *::-webkit-scrollbar-track {
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0);
    }

    /* Scrollbar ngang */
    html *::-webkit-scrollbar {
        border-radius: 0;
        height: 6px; /* Chiều cao cho thanh cuộn ngang */
    }

    html *::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #02a40b77;
    }

    html *::-webkit-scrollbar-track {
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0);
    }

`;

export default GlobalStyle;
