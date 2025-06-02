import { useEffect, useState } from "react";
import httpClient from "../../services/api";
import { useAuth } from "../../auth/AuthContext";
import { Header } from "../Components/Header";
import {
  Container,
  CustomButton,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Form,
  InputForm,
  Textarea,
  CardGrid,
  Card,
  CardImage,
  CardActions,
  Subtitle,
} from "./styles";
import { Edit, Edit2, Trash, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";

interface ComponentData {
  id: string;
  name: string;
  description: string;
  urlImage: string;
  userId: string;
}

export default function ComponentManager() {
  const { user, logout } = useAuth();
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    urlImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlerLogOut = async () => {
    logout();
  };

  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Você não está autorizado a acessar essa página");
      handlerLogOut();
    }
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await httpClient.get("/components/list");
      setComponents(response.data);
    } catch (err) {
      console.error("Erro ao buscar componentes:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", urlImage: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (isEditing && editingId) {
        await httpClient.put(`/components/${editingId}`, {
          ...formData,
          userId: user.id,
        });
      } else {
        await httpClient.post("/components/create/", {
          ...formData,
          userId: user.id,
        });
      }

      resetForm();
      setShowModal(false);
      fetchComponents();

      toast.success(
        `Componente ${
          isEditing && editingId ? "editado" : "criado"
        } com sucesso!`
      );
    } catch (err) {
      toast.error(`Erro ao salvar componente: ${err}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await httpClient.delete(`/components/delete/${id}`);
      fetchComponents();
      toast.success(`Component excluído com sucesso!`);
    } catch (err) {
      toast.error(`Erro ao excluir componente: ${err}`);
    }
  };

  const handleEdit = (component: ComponentData) => {
    setFormData({
      name: component.name,
      description: component.description,
      urlImage: component.urlImage,
    });
    setEditingId(component.id);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <Container>
      <Header />

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <CustomButton
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          Novo Componente
        </CustomButton>
      </div>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={handleCloseModal}>✕</ModalCloseButton>
            <Subtitle style={{ color: "var(--gree-100)" }}>
              {isEditing ? "Editar Componente" : "Cadastrar Componente"}
            </Subtitle>

            <Form onSubmit={handleSubmit}>
              <InputForm
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputForm
                name="urlImage"
                placeholder="URL da Imagem"
                value={formData.urlImage}
                onChange={handleChange}
                required
              />
              <Textarea
                name="description"
                placeholder="Descrição"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <CustomButton type="submit">Salvar</CustomButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      <Subtitle style={{ color: "var(--gree-100)" }}>
        Lista de Componentes
      </Subtitle>

      <CardGrid>
        {components
          .filter((comp) => comp.userId === user?.id)
          .map((comp) => (
            <Card key={comp.id}>
              <CardImage src={comp.urlImage} alt={comp.name} />
              <CardActions>
                <Edit2 onClick={() => handleEdit(comp)} size={16} />
                <Trash2 onClick={() => handleDelete(comp.id)} size={16} />
              </CardActions>
              <strong>{comp.name}</strong>
              <p>{comp.description}</p>
            </Card>
          ))}
      </CardGrid>
    </Container>
  );
}
