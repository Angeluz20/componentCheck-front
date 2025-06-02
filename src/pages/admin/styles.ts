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
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  font-family: "Plus Jakarta Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;

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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputForm = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  // border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Textarea = styled.textarea`
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  // border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 0px 40px;

  @media (max-width: 1024px) {
    & > div {
      width: calc(50% - 20px);
    }
  }

  @media (max-width: 600px) {
    & > div {
      width: 100%;
    }
  }
`;

export const Card = styled.div`
  width: calc(25% - 20px);
  min-width: 350px;
  // border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  padding: 20px;
  width:100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardImage = styled.img`
  width: 80%;
  border-radius: 4px;
  margin-top: 10px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;

  svg {
    cursor: pointer;
    color: var(--green-100, #28a745);
  }
`;
