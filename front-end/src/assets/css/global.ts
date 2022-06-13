import { createGlobalStyle } from 'styled-components';
import bckground from "../img/papel.jpg"

 
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background: url(${bckground}) repeat center center;
    background-size: cover;
  }
`

 
