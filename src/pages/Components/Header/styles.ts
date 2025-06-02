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
  width: 100%;
  height: 68px;
  flex-direction: row;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  background-color: var(--green-100);
  padding:5px;
`;

export const Section = styled.section`
  display: flex;
  width: 600px;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const CustomInput = styled(Input)`
  padding: 20px 8px;
  background-color: #fff;
  border-radius: 6px;
  outline: none;
  width: 100%;
  font-family: "Plus Jakarta Sans", sans-serif;
`;

export const CustomButton = styled(Button)`
  padding: 20px;
  background-color: var(--secundary-color);
  border-radius: 6px;
  margin-bottom: 30px;
  width: 40%;
  font-family: "Plus Jakarta Sans", sans-serif;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #24614a;
  }
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 28px;
  color: var(--green-100);
  font-weight: bold;
  letter-spacing: 2px;
`;

export const Subtitle = styled.h1`
  margin: 6px 30px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 16px;
  color: #fff;
  font-weight: 400px;
  text-align: center;
`;

export const Description = styled.h1`
  padding: 10px 20px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 14px;
  color: var(--green-50);
  font-weight: 400px;
  text-align: justify;
`;

export const TitleRegisterOrSignIn = styled.a`
  margin-bottom: 30px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
`;
