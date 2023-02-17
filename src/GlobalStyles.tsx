import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  @keyframes lds-ripple {
    0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
  }
  .error__loc {
    font-size: x-large;
    color: rgb(0, 26, 255);
    font-weight: bold;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default GlobalStyles;
