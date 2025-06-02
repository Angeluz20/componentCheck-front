import { useEffect, useState } from "react";
import httpClient from "../../../../services/api";
import { useAuth } from "../../../../auth/AuthContext";
import {
  Container,
  CustomButton,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Form,
  InputForm,
  Subtitle,
  Select,
  Option,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "./styles";
import { Header } from "../../../Components/Header";
import { toast } from "react-toastify";
import { UserPlus, Trash2, Pencil } from "lucide-react";

export default function ManageUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("collaborator");

  const fetchUsers = async () => {
    try {
      const response = await httpClient.get("/users/list");
      setUsers(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("collaborator");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingUserId(null);
    resetForm();
  };

  const handleCreateUser = async () => {
    if (!name || !email || !password || !role) {
      toast.info("Preencha todos os campos.");
      return;
    }
    try {
      await httpClient.post("/users/create", {
        name,
        email,
        password,
        role,
      });
      toast.success("Usuário criado com sucesso!");
      closeModal();
      fetchUsers();
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      toast.error("Erro ao criar usuário.");
    }
  };

  const handleEditUser = (user: any) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
  };

  const handleUpdateUser = async () => {
    if (!name || !email || !role) {
      toast.info("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await httpClient.put(`/users/${editingUserId}`, {
        name,
        email,
        password: password || undefined, // só envia se houver
        role,
      });
      toast.success("Usuário atualizado com sucesso!");
      closeModal();
      fetchUsers();
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      toast.error("Erro ao atualizar usuário.");
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o usuário "${name}"?`
    );
    if (!confirmDelete) return;

    try {
      await httpClient.delete(`/users/${id}`);
      toast.success("Usuário excluído com sucesso!");
      fetchUsers();
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      toast.error("Erro ao excluir usuário.");
    }
  };

      const getTranslatedLevel = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'admin':
        return 'Administrador';
      case 'collaborator':
        return 'Colaborador';
      case 'candidate':
        return 'Candidato';
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
        <UserPlus size={48} color="var(--green-100)" />
        Gerenciar Usuários
      </Title>

      <CustomButton
        style={{ width: "30%" }}
        onClick={() => setIsModalOpen(true)}
      >
        Criar Novo Usuário
      </CustomButton>

      <Table style={{ width: "80%" }}>
        <thead>
          <TableRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Tipo</TableHeader>
            <TableHeader>Ações</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{getTranslatedLevel(u.role)}</TableCell>
              <TableCell>
                <Pencil
                  size={18}
                  color="#666"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditUser(u)}
                />
                <Trash2
                  size={18}
                  color="#d00"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteUser(u.id, u.name)}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
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
      )}
    </Container>
  );
}
