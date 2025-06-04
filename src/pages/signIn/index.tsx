import {
  Container,
  ContainerInput,
  CustomButton,
  CustomInput,
  Section,
  Title,
  TitleRegisterOrSignIn,
} from "./styles";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/logo.png";
import { Eye, EyeOff, Key, Mail, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { toast } from "react-toastify";

type UserRole = "candidate" | "collaborator" | "manager" | "admin";

export default function SignIn() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { login, register, isAuthenticated, user } = useAuth();

  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>("collaborator");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const roleId = parseInt(id);
      switch (roleId) {
        case 1:
          setUserRole("candidate");
          break;
        case 2:
          setUserRole("collaborator");
          break;
        case 3:
          setUserRole("manager");
          break;
        case 4:
          setUserRole("admin");
          break;
        default:
          setUserRole("collaborator");
      }
    }
  }, [id]);

  useEffect(() => {
    if (isAuthenticated) {
      switch (user?.role) {
        case "candidate":
          navigate("/candidate-dashboard");
          break;
        case "collaborator":
          navigate("/collaborator");
          break;
        case "manager":
          navigate("/manager-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, navigate, user]);

  // useEffect(() => {
  //   if (!isRegister) {
  //     const handleBackButton = () => {
  //       navigate("/", { replace: true });
  //     };

  //     window.addEventListener('popstate', handleBackButton);
  //     return () => {
  //       window.removeEventListener('popstate', handleBackButton);
  //     };
  //   }
  // }, [isRegister, navigate]);

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

const handleSubmit = async () => {
  setError(null);
  setLoading(true);

  try {
    if (isRegister) {
      await register(name, email, password, userRole);
      toast.success("Registro bem-sucedido! Faça login.");
      setIsRegister(false);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      await login(email, password);
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

  const handleToggleRegister = () => {
    setIsRegister(!isRegister);
    setError(null);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const getRoleTitle = () => {
    switch (userRole) {
      case "candidate":
        return "Candidate Access";
      case "collaborator":
        return "Collaborator Access";
      case "manager":
        return "Manager Access";
      case "admin":
        return "Admin Access";
      default:
        return isRegister ? "Register" : "Login";
    }
  };

  return (
    <Container>
      <Section style={{ backgroundColor: "#fff", width: "100%" }}>
        <img src={Logo} style={{ userSelect: "none" }} width={300} alt="Logo" />

        <Title>
          {getRoleTitle()} {isRegister ? "Registration" : ""}
        </Title>

        {isRegister && (
          <ContainerInput>
            <UserRound color="gray" />
            <CustomInput
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </ContainerInput>
        )}

        <ContainerInput>
          <Mail color="gray" />
          <CustomInput
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ContainerInput>

        <ContainerInput>
          <Key color="gray" />
          <CustomInput
            placeholder="Senha"
            type={visiblePassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {visiblePassword ? (
            <EyeOff
              onClick={handleVisiblePassword}
              color="gray"
              style={{ cursor: "pointer", marginRight: 10 }}
            />
          ) : (
            <Eye
              onClick={handleVisiblePassword}
              color="gray"
              style={{ cursor: "pointer", marginRight: 10 }}
            />
          )}
        </ContainerInput>

        {isRegister && (
          <ContainerInput>
            <Key color="gray" />
            <CustomInput
              placeholder="Confirme a senha"
              type={visiblePassword ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </ContainerInput>
        )}

        {error && (
          <p style={{ color: "red", marginTop: 10, textAlign: "center" }}>
            {error}
          </p>
        )}

        <CustomButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar"}
        </CustomButton>

        <TitleRegisterOrSignIn
          style={{ color: "var(--green-100)", cursor: "pointer" }}
          onClick={handleToggleRegister}
        >
          {userRole !== "admin" &&
            (isRegister
              ? "Já possui uma conta? Entrar"
              : "Não possui uma conta? Cadastrar-se")}
        </TitleRegisterOrSignIn>
      </Section>
    </Container>
  );
}
