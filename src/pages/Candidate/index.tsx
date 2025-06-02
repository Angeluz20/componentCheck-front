import { useEffect, useState } from "react";
import { Container, Section, Title, Subtitle, CustomButton } from "./styles";
import CardQuizz from "../Components/CardQuizz";
import httpClient from "../../services/api";
import { useAuth } from "../../auth/AuthContext";
import { Header } from "../Components/Header";
import { toast } from "react-toastify";

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
  difficulty: "easy" | "medium" | "hard";
}

interface Quiz {
  id: number;
  title: string;
  difficulty: string;
  questions: Question[];
}

export default function Candidate() {
  const { user, logout } = useAuth();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | ""
  >("");
  const [startQuizz, setStartQuizz] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (user?.role !== "candidate") {
      toast.error("Você não está autorizado a acessar essa página");
      logout();
    } else {
      fetchQuizzes();
    }
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await httpClient.get<Quiz[]>("quiz/list");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Erro ao buscar quizzes:", error);
    }
  };

  const handleStartQuiz = () => {
    if (!selectedDifficulty) {
      toast.error("Por favor, selecione um nível para iniciar");
      return;
    }

    const allQuestions = quizzes.flatMap((quiz) => quiz);
    const questions = allQuestions.filter(
      (q) => q.difficulty === selectedDifficulty
    );

    const questionsForLevel: Question[] = questions[0]?.questions || [];

    setUserAnswers(Array(questionsForLevel.length).fill(-1));
    setFilteredQuestions(questionsForLevel);
    setStartQuizz(true);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswerSelected = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleFinish = () => {
    const unanswered = userAnswers.some((answer) => answer === -1);

    if (unanswered) {
      toast.error("Por favor, responda todas as perguntas antes de finalizar");
      return;
    }

    const score = filteredQuestions.reduce((acc, question, index) => {
      const correctAnswerIndex = question.answers.findIndex((a) => a.isCorrect);
      return acc + (userAnswers[index] === correctAnswerIndex ? 1 : 0);
    }, 0);

    toast.success(
      `Quiz finalizado! Você acertou ${score} de ${filteredQuestions.length} perguntas`,
      {
        autoClose: false,
        closeButton: true,
      }
    );

    setStartQuizz(false);
    setCurrentIndex(0);
    setFilteredQuestions([]);
    setSelectedDifficulty("");
    setUserAnswers([]);
  };

  console.log(userAnswers);
  return (
    <Container>
      <Header />
      <Section style={{ backgroundColor: "#fff" }}>
        {!startQuizz ? (
          <div
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Title style={{ marginBottom: -20 }}>Escolha o Nível</Title>
            <Subtitle style={{ color: "gray", marginBottom: 20, fontSize: 16 }}>
              Selecione o nível do quiz para iniciar
            </Subtitle>

            <select
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(
                  e.target.value as "easy" | "medium" | "hard"
                )
              }
              style={{
                marginBottom: 40,
                padding: 10,
                fontSize: 16,
                borderRadius: 6,
                backgroundColor: "#fff",
                width: "40%",
                borderWidth: 1,
                cursor: "pointer",
              }}
            >
              <option value="" disabled>
                -- Selecione um nível --
              </option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>

            <CustomButton onClick={handleStartQuiz}>Iniciar Quiz</CustomButton>
          </div>
        ) : filteredQuestions.length > 0 ? (
          <div
            style={{
              flexDirection: "row",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            {filteredQuestions.length > 0 && (
              <div
                key={filteredQuestions[currentIndex].id}
                style={{ width:'60%' }}
              >
                {filteredQuestions[currentIndex].answers.length === 0 ? (
                  <div>Não há itens</div>
                ) : (
                  <CardQuizz
                    question={filteredQuestions[currentIndex].question}
                    options={filteredQuestions[currentIndex].answers.map(
                      (a) => a.text
                    )}
                    correctAnswerIndex={filteredQuestions[
                      currentIndex
                    ].answers.findIndex((a) => a.isCorrect)}
                    currentIndex={currentIndex}
                    totalQuestions={filteredQuestions.length}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onFinish={handleFinish}
                    onAnswerSelected={handleAnswerSelected}
                    userId={Number(user?.id)}
                    quizId={quizzes[0].id}
                    category={""}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Quiz sem perguntas ou carregando...</p>
        )}
      </Section>
    </Container>
  );
}
