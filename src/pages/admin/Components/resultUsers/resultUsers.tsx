import { useEffect, useState } from "react";
import httpClient from "../../../../services/api";
import {
  Container,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "./styles";
import { Header } from "../../../Components/Header";
import { toast } from "react-toastify";
import { Trash2, ListCheck } from "lucide-react";

export default function ResultUsers() {
  const [usersResult, setUsersResult] = useState<any[]>([]);

  const fetchUsersPerformance = async () => {
    try {
      const response = await httpClient.get("quiz/performance/list");
      setUsersResult(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchUsersPerformance();
  }, []);

  const handleDeleteUser = async (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o resultado do usuário "${name}"?`
    );
    if (!confirmDelete) return;

    try {
      await httpClient.delete(`/quiz/performance/${id}`);
      toast.success("Resultado excluído com sucesso!");
      fetchUsersPerformance();
    } catch (err) {
      console.error("Erro ao excluir o resultado:", err);
      toast.error("Erro ao excluir resultado.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTranslatedLevel = (level: string) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "Iniciante";
      case "medium":
        return "Intermediário";
      case "hard":
        return "Avançado";
      default:
        return level;
    }
  };

  return (
    <Container>
      <Header />
      <Title
        style={{
          marginTop: 25,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ListCheck size={48} color="var(--green-100)" />
        Resultado do quiz
      </Title>

      <Table style={{ width: "80%" }}>
        <thead>
          <TableRow>
            <TableHeader>Quiz ID</TableHeader>
            <TableHeader>Usuário</TableHeader>
            <TableHeader>Número de acertos</TableHeader>
            <TableHeader>Pontuação</TableHeader>
            <TableHeader>Total de questões</TableHeader>
            <TableHeader>Tempo</TableHeader>
            <TableHeader>Nível</TableHeader>
            <TableHeader>Nível Quiz</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Ações</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {usersResult.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u?.quizId}</TableCell>
              <TableCell>{u?.user?.name}</TableCell>
              <TableCell>{u.correctAnswers}</TableCell>
              <TableCell>{u.score}</TableCell>
              <TableCell>{u.totalQuestions}</TableCell>
              <TableCell>{u.elapsedTime}</TableCell>
              <TableCell>{u?.user?.role}</TableCell>
              <TableCell>{getTranslatedLevel(u?.quiz?.difficulty)}</TableCell>
              <TableCell>{formatDate(u?.attemptedAt)}</TableCell>

              <TableCell>
                {/* <Pencil
                  size={18}
                  color="#666"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditUser(u)}
                /> */}
                <Trash2
                  size={18}
                  color="#d00"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteUser(u.id, u?.user?.name)}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={closeModal}>✕</ModalCloseButton>
            <Subtitle style={{ color: "var(--green-100)" }}>
              {isEditing ? "Editar Usuário" : "Novo Usuário"}
            </Subtitle>
            <Form>
              <InputForm
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputForm
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputForm
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <Option value="admin">Admin</Option>
                <Option value="manager">Gerente</Option>
                <Option value="collaborator">Colaborador</Option>
                <Option value="candidate">Candidato</Option>
              </Select>
              <CustomButton
                type="button"
                onClick={isEditing ? handleUpdateUser : handleCreateUser}
              >
                {isEditing ? "Atualizar" : "Salvar"}
              </CustomButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )} */}
    </Container>
  );
}
