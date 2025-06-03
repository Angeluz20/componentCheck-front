import styled, { createGlobalStyle } from "styled-components";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&family=Roboto&display=swap');
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  background-color: #fff;
  padding: 10px;
  align-items:center;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
`;



export const Subtitle = styled.h1`
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 22px;
  color: #fff;
  font-weight: 400px;
  text-align: center;
`;
