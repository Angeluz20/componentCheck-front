import { useNavigate } from "react-router-dom";
import { Container, Description, Section, Subtitle, Title } from "./styles";
import Logo from "../../../assets/img/logo-white.png";
import { useAuth } from "../../../auth/AuthContext";

export function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <img
        src={Logo}
        width={140}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      <Section
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          justifyContent: "flex-end",
          justifyItems: 'center',
        }}
      >
        <Subtitle style={{ margin: 0, whiteSpace: "nowrap" }}>
          {user?.name}
        </Subtitle>

        {user?.role === "admin" && (
          <>
            <button
              onClick={() => navigate("/admin-dashboard")}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              <Subtitle style={{ margin: 0 }}>Componente</Subtitle>
            </button>
            <button
              onClick={() => navigate("/admin-quiz")}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              <Subtitle style={{ margin: 0 }}>Quiz</Subtitle>
            </button>
            <button
              onClick={() => navigate("/admin-users")}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              <Subtitle style={{ margin: 0 }}>Usuários</Subtitle>
            </button>
            <button
              onClick={() => navigate("/admin-users-performance")}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              <Subtitle style={{ margin: 0 }}>Resultados</Subtitle>
            </button>
          </>
        )}

        <button
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "0.5rem",
            whiteSpace: "nowrap",
          }}
          onClick={logout}
        >
          <Subtitle style={{ margin: 0 }}>Sair</Subtitle>
        </button>
      </Section>
    </Container>
  );
}
