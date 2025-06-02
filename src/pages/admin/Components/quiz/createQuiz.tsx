// import { useEffect, useState } from "react";
// import httpClient from "../../../../services/api";
// import { useAuth } from "../../../../auth/AuthContext";
// import {
//   Container,
//   CustomButton,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   Form,
//   InputForm,
//   Subtitle,
//   Select,
//   Option,
//   QuestionList,
//   QuestionItem,
//   AnswerInput,
//   CorrectCheckbox,
//   Title,
//   CardGrid,
//   Card,
// } from "./styles";
// import { Header } from "../../../../pages/Components/Header";
// import { MessageCircleMore } from "lucide-react";
// import { toast } from "react-toastify";

// interface ComponentData {
//   id: string;
//   name: string;
// }

// interface Answer {
//   text: string;
//   isCorrect: boolean;
// }

// interface Quiz {
//   id: number;
//   title: string;
//   difficulty: string;
// }

// export default function CreateQuizModal() {
//   const { user } = useAuth();
//   const [components, setComponents] = useState<ComponentData[]>([]);
//   const [selectedComponentId, setSelectedComponentId] = useState<string>("");
//   const [title, setTitle] = useState("");
//   const [difficulty, setDifficulty] = useState("medium");
//   const [quizId, setQuizId] = useState<number | null>(null);
//   const [questions, setQuestions] = useState<
//     { question: string; answers: Answer[] }[]
//   >([]);
//   const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);

//   useEffect(() => {
//     const fetchComponents = async () => {
//       try {
//         const response = await httpClient.get("/components/list");
//         setComponents(response.data);
//       } catch (err) {
//         console.error("Erro ao buscar componentes:", err);
//       }
//     };

//     const fetchQuizzes = async () => {
//       try {
//         const response = await httpClient.get("/quiz/list");
//         setQuizzes(response.data);
//       } catch (err) {
//         console.error("Erro ao buscar quizzes:", err);
//       }
//     };

//     fetchComponents();
//     fetchQuizzes();
//   }, []);

//   // Passo 1: criar quiz
//   const handleCreateQuiz = async () => {
//     if (!title.trim() || !selectedComponentId) {
//       toast.info("Por favor, preencha o título e selecione um componente.");
//       return;
//     }
//     try {
//       const response = await httpClient.post("/quiz/create", {
//         title,
//         difficulty,
//         componentId: selectedComponentId,
//       });
//       setQuizId(response.data.id);
//       setCurrentStep(2);
//       setQuestions([{ question: "", answers: [] }]);
//       setCurrentQuestionIndex(0);
//     } catch (err) {
//       console.error("Erro ao criar quiz:", err);
//       toast.error("Erro ao criar quiz.");
//     }
//   };

//   const handleUpdateCurrentQuestion = (text: string) => {
//     const updated = [...questions];
//     updated[currentQuestionIndex].question = text;
//     setQuestions(updated);
//   };

//   const handleAddAnswer = () => {
//     const updated = [...questions];
//     if (updated[currentQuestionIndex].answers.length >= 4) return;
//     updated[currentQuestionIndex].answers.push({ text: "", isCorrect: false });
//     setQuestions(updated);
//   };

//   const handleAnswerChange = (aIndex: number, text: string) => {
//     const updated = [...questions];
//     updated[currentQuestionIndex].answers[aIndex].text = text;
//     setQuestions(updated);
//   };

//   const handleSetCorrect = (aIndex: number) => {
//     const updated = [...questions];
//     updated[currentQuestionIndex].answers = updated[
//       currentQuestionIndex
//     ].answers.map((ans, idx) => ({
//       ...ans,
//       isCorrect: idx === aIndex,
//     }));
//     setQuestions(updated);
//   };

//   const handleNextQuestion = () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     if (!currentQuestion.question.trim()) {
//       toast.info("Digite a pergunta.");
//       return;
//     }
//     if (
//       currentQuestion.answers.length === 0 ||
//       !currentQuestion.answers.some((a) => a.isCorrect)
//     ) {
//       toast.info("Adicione alternativas e marque a correta.");
//       return;
//     }

//     if (currentQuestionIndex < 3) {
//       if (questions.length <= currentQuestionIndex + 1) {
//         setQuestions([...questions, { question: "", answers: [] }]);
//       }
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setCurrentStep(3);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else if (currentStep === 3) {
//       setCurrentStep(2);
//     }
//   };

//   const handleSubmitQuestions = async () => {
//     if (!quizId) return;
//     try {
//       for (const q of questions) {
//         const response = await httpClient.post(`/quiz/${quizId}/questions`, [
//           {
//             question: q.question,
//             quizId,
//           },
//         ]);
//         const questionId = response.data[0]?.id;
//         await httpClient.post(
//           `/quiz/questions/${questionId}/answers`,
//           q.answers
//         );
//       }

//       toast.success("Quiz criado com sucesso!");
//       setIsModalOpen(false);
//       setTitle("");
//       setDifficulty("medium");
//       setSelectedComponentId("");
//       setQuestions([]);
//       setQuizId(null);
//       setCurrentStep(1);
//       setCurrentQuestionIndex(0);
//       const updatedQuizzes = await httpClient.get("/quiz/list");
//       setQuizzes(updatedQuizzes.data);
//     } catch (err) {
//       console.error("Erro ao criar perguntas ou respostas:", err);
//       toast.error("Erro ao salvar perguntas e respostas.");
//     }
//   };

//   // Reseta o modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setTitle("");
//     setDifficulty("medium");
//     setSelectedComponentId("");
//     setQuestions([]);
//     setQuizId(null);
//     setCurrentStep(1);
//     setCurrentQuestionIndex(0);
//   };

//   return (
//     <Container>
//       <Header />
//       <Title
//         style={{
//           marginTop: 25,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <MessageCircleMore color="var(--green-100)" size={64} />
//         Gerenciar Quizzes
//       </Title>

//       <CustomButton
//         style={{ width: "30%" }}
//         onClick={() => setIsModalOpen(true)}
//       >
//         Criar Novo Quiz
//       </CustomButton>

//       <CardGrid
//         style={{
//           width: "100%",
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "flex-start",
//         }}
//       >
//         {quizzes.map((quiz) => (
//           <Card key={quiz.id}>
//             <div
//               style={{
//                 width: "100%",
//                 backgroundColor: "var(--green-100)",
//                 padding: 5,
//                 borderTopLeftRadius: 8,
//                 borderTopRightRadius: 8,
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}
//             >
//               <MessageCircleMore color="#fff" size={34} />
//               <Subtitle style={{ fontSize: 16 }}>{quiz.title}</Subtitle>
//             </div>
//             <div
//               style={{
//                 width: "100%",
//                 padding: 5,
//                 marginTop: 20,
//                 height: 100,
//               }}
//             >
//               <p>Dificuldade: {quiz.difficulty}</p>
//             </div>
//           </Card>
//         ))}
//       </CardGrid>

//       {isModalOpen && (
//         <ModalOverlay>
//           <ModalContent>
//             <ModalCloseButton onClick={handleCloseModal}>✕</ModalCloseButton>

//             {/* Passo 1: Criar quiz */}
//             {currentStep === 1 && (
//               <>
//                 <Subtitle style={{ color: "var(--green-100)" }}>
//                   Criar Quiz
//                 </Subtitle>
//                 <Form>
//                   <Select
//                     style={{ padding: 16, outline: "none", border: "none" }}
//                     value={selectedComponentId}
//                     onChange={(e) => setSelectedComponentId(e.target.value)}
//                     required
//                   >
//                     <option value="">Selecione um componente</option>
//                     {components.map((comp) => (
//                       <Option key={comp.id} value={comp.id}>
//                         {comp.name}
//                       </Option>
//                     ))}
//                   </Select>
//                   <InputForm
//                     placeholder="Título do Quiz"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                   <Select
//                     value={difficulty}
//                     onChange={(e) => setDifficulty(e.target.value)}
//                   >
//                     <option value="easy">Fácil</option>
//                     <option value="medium">Médio</option>
//                     <option value="hard">Difícil</option>
//                   </Select>
//                   <CustomButton type="button" onClick={handleCreateQuiz}>
//                     Criar Quiz
//                   </CustomButton>
//                 </Form>
//               </>
//             )}

//             {/* Passo 2: Criar perguntas */}
//             {currentStep === 2 && (
//               <>
//                 <Subtitle style={{ color: "var(--green-100)" }}>
//                   Pergunta {currentQuestionIndex + 1} de 4
//                 </Subtitle>
//                 <InputForm
//                   style={{ marginBottom: -50 }}
//                   placeholder="Digite a pergunta"
//                   value={questions[currentQuestionIndex]?.question || ""}
//                   onChange={(e) => handleUpdateCurrentQuestion(e.target.value)}
//                 />
//                 <Subtitle>Alternativas</Subtitle>
//                 {questions[currentQuestionIndex]?.answers.map((a, aIndex) => (
//                   <div
//                     key={aIndex}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 8,
//                       width: "100%",
//                       marginBottom: 10,
//                     }}
//                   >
//                     <AnswerInput
//                       placeholder="Resposta"
//                       value={a.text}
//                       onChange={(e) =>
//                         handleAnswerChange(aIndex, e.target.value)
//                       }
//                     />
//                     <CorrectCheckbox
//                       type="checkbox"
//                       checked={a.isCorrect}
//                       onChange={() => handleSetCorrect(aIndex)}
//                     />
//                   </div>
//                 ))}
//                 {questions[currentQuestionIndex]?.answers.length < 4 && (
//                   <CustomButton onClick={handleAddAnswer}>
//                     Adicionar Alternativa
//                   </CustomButton>
//                 )}
//                 <div
//                   style={{
//                     marginTop: 16,
//                     width: "100%",
//                     flexDirection: "row",
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <CustomButton
//                     style={{ width: "40%" }}
//                     onClick={handlePrevQuestion}
//                     disabled={currentQuestionIndex === 0}
//                   >
//                     Anterior
//                   </CustomButton>
//                   <CustomButton
//                     style={{ width: "40%" }}
//                     onClick={handleNextQuestion}
//                   >
//                     {currentQuestionIndex === 3
//                       ? "Finalizar"
//                       : "Próxima Pergunta"}
//                   </CustomButton>
//                 </div>
//               </>
//             )}

//             {/* Passo 3: Confirmar e salvar */}
//             {currentStep === 3 && (
//               <>
//                 <Subtitle>Revisar e Salvar</Subtitle>
//                 <QuestionList>
//                   {questions.map((q, i) => (
//                     <QuestionItem key={i}>
//                       <strong>Pergunta {i + 1}:</strong> {q.question}
//                       <ul>
//                         {q.answers.map((a, ai) => (
//                           <li key={ai}>
//                             {a.text} {a.isCorrect ? "(Correta)" : ""}
//                           </li>
//                         ))}
//                       </ul>
//                     </QuestionItem>
//                   ))}
//                 </QuestionList>
//                 <CustomButton onClick={handlePrevQuestion}>Voltar</CustomButton>
//                 <CustomButton
//                   onClick={handleSubmitQuestions}
//                   style={{ marginLeft: 8 }}
//                 >
//                   Salvar Quiz
//                 </CustomButton>
//               </>
//             )}
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </Container>
//   );
// }

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
  QuestionList,
  QuestionItem,
  AnswerInput,
  CorrectCheckbox,
  Title,
  CardGrid,
  Card,
  ButtonGroup,
  IconButton,
} from "./styles";
import { Header } from "../../../../pages/Components/Header";
import { Edit2, MessageCircleMore, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface ComponentData {
  id: string;
  name: string;
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  id: number;
  title: string;
  difficulty: string;
}

export default function CreateQuizModal() {
  const { user } = useAuth();
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [quizId, setQuizId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<
    { question: string; answers: Answer[] }[]
  >([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await httpClient.get("/components/list");
        setComponents(response.data);
      } catch (err) {
        console.error("Erro ao buscar componentes:", err);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const response = await httpClient.get("/quiz/list");
        setQuizzes(response.data);
      } catch (err) {
        console.error("Erro ao buscar quizzes:", err);
      }
    };

    fetchComponents();
    fetchQuizzes();
  }, []);

  const handleCreateQuiz = async () => {
    if (!title.trim() || !selectedComponentId) {
      toast.info("Por favor, preencha o título e selecione um componente.");
      return;
    }
    try {
      const response = await httpClient.post("/quiz/create", {
        title,
        difficulty,
        componentId: selectedComponentId,
      });
      setQuizId(response.data.id);
      setCurrentStep(2);
      setQuestions([{ question: "", answers: [] }]);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error("Erro ao criar quiz:", err);
      toast.error("Erro ao criar quiz.");
    }
  };

  const handleUpdateQuiz = async () => {
    if (!editingQuiz || !title.trim() || !selectedComponentId) {
      toast.info("Por favor, preencha o título e selecione um componente.");
      return;
    }
    try {
      await httpClient.put(`/quiz/${editingQuiz.id}`, {
        title,
        difficulty,
        componentId: selectedComponentId,
      });
      toast.success("Quiz atualizado com sucesso!");
      setIsModalOpen(false);
      setTitle("");
      setDifficulty("medium");
      setSelectedComponentId("");
      setEditingQuiz(null);
      const updatedQuizzes = await httpClient.get("/quiz/list");
      setQuizzes(updatedQuizzes.data);
    } catch (err) {
      console.error("Erro ao atualizar quiz:", err);
      toast.error("Erro ao atualizar quiz.");
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    try {
      await httpClient.delete(`/quiz/${quizId}`);
      toast.success("Quiz excluído com sucesso!");
      const updatedQuizzes = await httpClient.get("/quiz/list");
      setQuizzes(updatedQuizzes.data);
    } catch (err) {
      console.error("Erro ao excluir quiz:", err);
      toast.error("Erro ao excluir quiz.");
    }
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setTitle(quiz.title);
    setDifficulty(quiz.difficulty);
    setSelectedComponentId("");
    setQuizId(quiz.id);
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const handleUpdateCurrentQuestion = (text: string) => {
    const updated = [...questions];
    updated[currentQuestionIndex].question = text;
    setQuestions(updated);
  };

  const handleAddAnswer = () => {
    const updated = [...questions];
    if (updated[currentQuestionIndex].answers.length >= 4) return;
    updated[currentQuestionIndex].answers.push({ text: "", isCorrect: false });
    setQuestions(updated);
  };

  const handleAnswerChange = (aIndex: number, text: string) => {
    const updated = [...questions];
    updated[currentQuestionIndex].answers[aIndex].text = text;
    setQuestions(updated);
  };

  const handleSetCorrect = (aIndex: number) => {
    const updated = [...questions];
    updated[currentQuestionIndex].answers = updated[
      currentQuestionIndex
    ].answers.map((ans, idx) => ({
      ...ans,
      isCorrect: idx === aIndex,
    }));
    setQuestions(updated);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion.question.trim()) {
      toast.info("Digite a pergunta.");
      return;
    }
    if (
      currentQuestion.answers.length === 0 ||
      !currentQuestion.answers.some((a) => a.isCorrect)
    ) {
      toast.info("Adicione alternativas e marque a correta.");
      return;
    }

    if (currentQuestionIndex < 3) {
      if (questions.length <= currentQuestionIndex + 1) {
        setQuestions([...questions, { question: "", answers: [] }]);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep(3);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleSubmitQuestions = async () => {
    if (!quizId) return;
    try {
      for (const q of questions) {
        const response = await httpClient.post(`/quiz/${quizId}/questions`, [
          {
            question: q.question,
            quizId,
          },
        ]);
        const questionId = response.data[0]?.id;
        await httpClient.post(
          `/quiz/questions/${questionId}/answers`,
          q.answers
        );
      }

      toast.success("Quiz criado com sucesso!");
      setIsModalOpen(false);
      setTitle("");
      setDifficulty("medium");
      setSelectedComponentId("");
      setQuestions([]);
      setQuizId(null);
      setCurrentStep(1);
      setCurrentQuestionIndex(0);
      setEditingQuiz(null);
      const updatedQuizzes = await httpClient.get("/quiz/list");
      setQuizzes(updatedQuizzes.data);
    } catch (err) {
      console.error("Erro ao criar perguntas ou respostas:", err);
      toast.error("Erro ao salvar perguntas e respostas.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDifficulty("medium");
    setSelectedComponentId("");
    setQuestions([]);
    setQuizId(null);
    setCurrentStep(1);
    setCurrentQuestionIndex(0);
    setEditingQuiz(null);
  };

  return (
    <Container>
      <Header />
      <Title
        style={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MessageCircleMore color="var(--green-100)" size={64} />
        Gerenciar Quizzes
      </Title>

      <CustomButton
        style={{ width: "30%" }}
        onClick={() => setIsModalOpen(true)}
      >
        Criar Novo Quiz
      </CustomButton>

      <CardGrid
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <div
              style={{
                width: "100%",
                backgroundColor: "var(--green-100)",
                padding: 5,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MessageCircleMore color="#fff" size={34} />
              <Subtitle style={{ fontSize: 16 }}>{quiz.title}</Subtitle>
              <ButtonGroup>
                <IconButton onClick={() => handleEditQuiz(quiz)}>
                  <Edit2 color="#fff" size={16} />
                </IconButton>
                <IconButton onClick={() => handleDeleteQuiz(quiz.id)}>
                  <Trash2 color="#fff" size={16} />
                </IconButton>
              </ButtonGroup>
            </div>
            <div
              style={{
                width: "100%",
                padding: 5,
                marginTop: 20,
                height: 100,
              }}
            >
              <p>Dificuldade: {quiz.difficulty}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              ></div>
            </div>
          </Card>
        ))}
      </CardGrid>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={handleCloseModal}>✕</ModalCloseButton>

            {/* Passo 1: Criar ou editar quiz */}
            {currentStep === 1 && (
              <>
                <Subtitle style={{ color: "var(--green-100)" }}>
                  {editingQuiz ? "Editar Quiz" : "Criar Quiz"}
                </Subtitle>
                <Form>
                  <Select
                    style={{ padding: 16, outline: "none", border: "none" }}
                    value={selectedComponentId}
                    onChange={(e) => setSelectedComponentId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um componente</option>
                    {components.map((comp) => (
                      <Option key={comp.id} value={comp.id}>
                        {comp.name}
                      </Option>
                    ))}
                  </Select>
                  <InputForm
                    placeholder="Título do Quiz"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <Select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                  </Select>
                  <CustomButton
                    type="button"
                    onClick={editingQuiz ? handleUpdateQuiz : handleCreateQuiz}
                  >
                    {editingQuiz ? "Atualizar Quiz" : "Criar Quiz"}
                  </CustomButton>
                </Form>
              </>
            )}

            {/* Passo 2: Criar perguntas */}
            {currentStep === 2 && (
              <>
                <Subtitle style={{ color: "var(--green-100)" }}>
                  Pergunta {currentQuestionIndex + 1} de 4
                </Subtitle>
                <InputForm
                  style={{ marginBottom: -50 }}
                  placeholder="Digite a pergunta"
                  value={questions[currentQuestionIndex]?.question || ""}
                  onChange={(e) => handleUpdateCurrentQuestion(e.target.value)}
                />
                <Subtitle>Alternativas</Subtitle>
                {questions[currentQuestionIndex]?.answers.map((a, aIndex) => (
                  <div
                    key={aIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      marginBottom: 10,
                    }}
                  >
                    <AnswerInput
                      placeholder="Resposta"
                      value={a.text}
                      onChange={(e) =>
                        handleAnswerChange(aIndex, e.target.value)
                      }
                    />
                    <CorrectCheckbox
                      type="checkbox"
                      checked={a.isCorrect}
                      onChange={() => handleSetCorrect(aIndex)}
                    />
                  </div>
                ))}
                {questions[currentQuestionIndex]?.answers.length < 4 && (
                  <CustomButton onClick={handleAddAnswer}>
                    Adicionar Alternativa
                  </CustomButton>
                )}
                <div
                  style={{
                    marginTop: 16,
                    width: "100%",
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomButton
                    style={{ width: "40%" }}
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Anterior
                  </CustomButton>
                  <CustomButton
                    style={{ width: "40%" }}
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex === 3
                      ? "Finalizar"
                      : "Próxima Pergunta"}
                  </CustomButton>
                </div>
              </>
            )}

            {/* Passo 3: Confirmar e salvar */}
            {currentStep === 3 && (
              <>
                <Subtitle>Revisar e Salvar</Subtitle>
                <QuestionList>
                  {questions.map((q, i) => (
                    <QuestionItem key={i}>
                      <strong>Pergunta {i + 1}:</strong> {q.question}
                      <ul>
                        {q.answers.map((a, ai) => (
                          <li key={ai}>
                            {a.text} {a.isCorrect ? "(Correta)" : ""}
                          </li>
                        ))}
                      </ul>
                    </QuestionItem>
                  ))}
                </QuestionList>
                <CustomButton onClick={handlePrevQuestion}>Voltar</CustomButton>
                <CustomButton
                  onClick={handleSubmitQuestions}
                  style={{ marginLeft: 8 }}
                >
                  Salvar Quiz
                </CustomButton>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
