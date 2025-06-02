import {
  Container,
  ContainerInput,
  CustomButton,
  CustomInput,
  Section,
  Subtitle,
  Title,
  TitleRegisterOrSignIn,
} from "./styles";
import ImageCircuit from "../../assets/img/Printed circuit board-bro.png";
import LogoWhite from "../../assets/img/logo-white.png";
import { Eye, EyeOff, Key, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import CardSectionUser from "../Components/CardSectionsUsers";
import { dataCards } from "./Components/dataCards";

export default function Home() {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <Container>
      <Section style={{ height: "30%" }}>
        <img src={LogoWhite} style={{ userSelect: "none" }} width={200} />
        <Subtitle>
          Plataforma de avaliação por quiz com resultados instantâneos e
          feedback personalizado
        </Subtitle>
      </Section>
      <Section style={{ backgroundColor: "#fff" }}>
        <Title style={{ marginBottom: -20 }}>Acesse sua área</Title>
        <Subtitle style={{ color: "gray", marginBottom: 60 }}>
          Selecione abaixo o perfil para iniciar sua jornada na plataforma
        </Subtitle>
        <div
          style={{
            flexDirection: "row",
            width: "80%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {dataCards.map((item) => (
            <CardSectionUser
              id={item.id}
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              typeCardTitle={item.typeCardTitle}
              imgIcon={item.imgIcon}
            />
          ))}
        </div>
      </Section>
    </Container>
  );
}
