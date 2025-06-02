import { useNavigate } from "react-router-dom";
import { Container, Description, Section, Subtitle, Title } from "./styles";

interface CardProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  typeCardTitle: string;
  imgIcon: string;
}

export default function CardSectionUser({
  id,
  title,
  subtitle,
  description,
  typeCardTitle,
  imgIcon,
}: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/login/${id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Section style={{ backgroundColor: "#fff" }}>
        <Title>{title}</Title>
        <img src={imgIcon} width={100} />
        <Subtitle
          style={{
            marginTop: 10,
            fontSize: 14,
            color: "var(--green-100)",
            fontWeight: 700,
          }}
        >
          {subtitle}
        </Subtitle>
        <Description>{description}</Description>
      </Section>
      <Section
        style={{
          height: "25%",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Subtitle style={{ marginTop: 10 }}>{typeCardTitle}</Subtitle>
      </Section>
    </Container>
  );
}
