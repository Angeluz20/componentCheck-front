import { useState, useEffect } from "react";
import {
  Container,
  Section,
  Title,
  Subtitle,
  Description,
  CustomButton,
} from "./styles";
import { toast } from "react-toastify";
import httpClient from "../../../services/api";

interface QuizProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  imageUrl?: string;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSelected: (questionIndex: number, answerIndex: number) => void;
  userId: number;
  quizId: number;
  category: string;
}

export default function CardQuizz({
  question,
  options,
  correctAnswerIndex,
  imageUrl,
  onNext,
  onPrevious,
  onFinish,
  onAnswerSelected,
  currentIndex,
  totalQuestions,
  userId,
  quizId,
  category,
}: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    onAnswerSelected(currentIndex, index);
  };

  const handleFinish = async () => {
    try {
      const correctAnswers = selectedOption === correctAnswerIndex ? 1 : 0;
      const score = Math.round((correctAnswers / totalQuestions) * 100);

      await httpClient.post("/quiz/performance", {
        userId,
        quizId,
        category,
        totalQuestions,
        correctAnswers,
        elapsedTime,
        score,
      });
      toast.success("Desempenho do quiz registrado com sucesso!");
      setSelectedOption(null);
      onFinish();
    } catch (err) {
      console.error("Erro ao registrar desempenho do quiz:", err);
      toast.error("Erro ao registrar desempenho do quiz.");
    }
  };

  return (
    <Container
      style={{
        cursor: "default",
        width: "100%",
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Title>{question}</Title>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Imagem da pergunta"
          style={{
            maxWidth: 200,
            maxHeight: 200,
            objectFit: "contain",
            marginBottom: 20,
            borderRadius: 8,
          }}
        />
      )}

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Subtitle style={{ color: "var(--green-100" }}>Quiz</Subtitle>

        <Section
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            height: 250,
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              // flexWrap: "wrap",
              gap: "16px",
              justifyContent: "space-between",
              backgroundColor: "transparent",
              display: "flex",
              height: 250,
            }}
          >
            {options.map((option, index) => (
              <CustomButton
                key={index}
                style={{
                  margin: 0,
                  minHeight: 50,
                  backgroundColor:
                    selectedOption === index ? "var(--green-100)" : "#f0f0f0",
                  color: selectedOption === index ? "#fff" : "#000",
                  border:
                    selectedOption === index
                      ? "2px solid var(--blue-100)"
                      : "1px solid #ccc",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </CustomButton>
            ))}
          </div>
        </Section>

        <div
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            display: "flex",
            height: 100,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <CustomButton
            onClick={() => {
              setSelectedOption(null);
              onPrevious();
            }}
            style={{ width: "30%", backgroundColor: "#ccc", color: "#000" }}
            disabled={currentIndex === 0}
          >
            Anterior
          </CustomButton>
          {currentIndex === totalQuestions - 1 ? (
            <CustomButton onClick={handleFinish} style={{ width: "30%" }}>
              Finalizar
            </CustomButton>
          ) : (
            <CustomButton
              onClick={() => {
                setSelectedOption(null);
                onNext();
              }}
              style={{ width: "30%" }}
            >
              Próximo
            </CustomButton>
          )}
        </div>
      </div>
    </Container>
  );
}
