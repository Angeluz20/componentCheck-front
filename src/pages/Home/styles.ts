import styled, { createGlobalStyle } from "styled-components";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&family=Roboto&display=swap');
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  background-color: gray;
  width: 100vw;
  height: 100vh;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction:column;
    justify-content: space-between;
  }
`;
export const ContainerInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  background-color: #fff;
  padding: 0px 10px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
`;


export const Section = styled.section`
  display: flex;
  background-color: var(--green-100);
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;

    @media (max-width: 768px) {
      width: 100%;
    flex-direction:column;
    justify-content: space-between;
  }
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
  color: var(--primary-color);
  font-weight: bold;
  letter-spacing: 2px;
`;

export const Subtitle = styled.h1`
  margin: 25px 30px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 22px;
  color: #fff;
  font-weight: 400px;
  letter-spacing: 2px;
`;
export const TitleRegisterOrSignIn = styled.a`
  margin-bottom: 30px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
`;
