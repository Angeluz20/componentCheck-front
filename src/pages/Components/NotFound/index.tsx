import { useState, useEffect } from "react";
import {
  Container,
  Subtitle
} from "./styles";
import ImgNotFound from '../../../assets/img/Empty-amico.png'

export default function NotFound() {

  return (
    <Container>
      <Subtitle style={{ color: 'var(--green-100)' }}>Item(s) não encontrados</Subtitle>
      <img src={ImgNotFound} width={400} alt="Nenhum item encontrado" />

    </Container>
  );
}
