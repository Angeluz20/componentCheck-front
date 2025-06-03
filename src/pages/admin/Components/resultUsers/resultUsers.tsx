import { useEffect, useState } from "react";
import httpClient from "../../../../services/api";
import {
  Container,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  InputForm,
} from "./styles";
import { Header } from "../../../Components/Header";
import { toast } from "react-toastify";
import { Trash2, ListCheck } from "lucide-react";
import { useDebounce } from "use-debounce";
import NotFound from "../../../Components/NotFound";

export default function ResultUsers() {
  const [usersResult, setUsersResult] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName] = useDebounce(searchName, 500);

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

  useEffect(() => {
    const search = async () => {
      if (!debouncedSearchName.trim()) {
        fetchUsersPerformance();
        return;
      }

      try {
        const response = await httpClient.get(
          `/users?name=${debouncedSearchName.toLowerCase()}`
        );
        setUsersResult([response.data]);
      } catch (err) {
        setUsersResult([]);
      }
    };

    search();
  }, [debouncedSearchName]);

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
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <InputForm
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>

      {usersResult.length ? <Table style={{ width: "80%" }}>
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
      </Table> : <NotFound />}

    </Container>
  );
}
