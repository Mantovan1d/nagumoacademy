import { useState } from "react";
import { Button } from "@/components/ui/button";
import { questions, quizTitle } from "@/lib/quizData";
import { hasWatchedVideo, getAttempts, incrementAttempts, addToRanking, getUser } from "@/lib/store";
import { Lock, CheckCircle2, XCircle } from "lucide-react";

interface QuizTabProps {
  onComplete: (score: number, total: number) => void;
}

const QuizTab = ({ onComplete }: QuizTabProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const watched = hasWatchedVideo();
  const attempts = getAttempts();

  if (!watched) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center animate-fade-in">
        <Lock size={48} className="text-muted-foreground" />
        <h2 className="font-display text-lg font-bold text-foreground">Quiz Bloqueado</h2>
        <p className="text-sm text-muted-foreground">
          Assista ao vídeo do curso para liberar o quiz.
        </p>
      </div>
    );
  }

  if (attempts >= 3) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center animate-fade-in">
        <XCircle size={48} className="text-muted-foreground" />
        <h2 className="font-display text-lg font-bold text-foreground">Tentativas Esgotadas</h2>
        <p className="text-sm text-muted-foreground">
          Você já utilizou suas 3 tentativas. Confira o ranking!
        </p>
      </div>
    );
  }

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setShowFeedback(false);
    setSelected(null);

    if (isLast) {
      // Calculate score
      let score = 0;
      newAnswers.forEach((ans, i) => {
        if (ans === questions[i].correta) score++;
      });

      const isFirstAttempt = attempts === 0;
      incrementAttempts();

      if (isFirstAttempt) {
        addToRanking({
          name: getUser() || "Anônimo",
          loja: ["Centro", "Norte", "Sul", "Leste", "Oeste"][Math.floor(Math.random() * 5)],
          score,
          total: questions.length,
          percentage: Math.round((score / questions.length) * 100),
          timestamp: Date.now(),
        });
      }

      onComplete(score, questions.length);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleSelect = (label: string) => {
    if (showFeedback) return;
    setSelected(label);
    setShowFeedback(true);
  };

  const isCorrect = selected === question.correta;

  return (
    <div className="animate-fade-in space-y-4 p-4">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">📝 Quiz: {quizTitle}</h2>
        <p className="text-xs text-muted-foreground">
          Tentativa: {attempts + 1}/3 · {attempts === 0 ? "Esta tentativa vale para o ranking" : "Tentativa de treino"}
        </p>
      </div>

      {/* Question Card */}
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="mb-1 text-xs font-semibold text-muted-foreground">
          Pergunta {currentQ + 1}/{questions.length}
        </p>
        <p className="mb-4 font-display text-base font-semibold text-foreground">
          {question.texto}
        </p>

        <div className="space-y-2">
          {question.alternativas.map((alt) => {
            let optionClass =
              "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all text-sm";

            if (showFeedback) {
              if (alt.label === question.correta) {
                optionClass += " border-green-500 bg-green-500/10 text-foreground";
              } else if (alt.label === selected && !isCorrect) {
                optionClass += " border-destructive bg-destructive/10 text-foreground";
              } else {
                optionClass += " border-border text-muted-foreground opacity-50";
              }
            } else if (selected === alt.label) {
              optionClass += " border-primary bg-primary/10 text-foreground";
            } else {
              optionClass += " border-border text-foreground hover:border-primary/50 hover:bg-secondary";
            }

            return (
              <button
                key={alt.label}
                onClick={() => handleSelect(alt.label)}
                className={optionClass}
                disabled={showFeedback}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current font-display text-xs font-bold">
                  {alt.label}
                </span>
                <span>{alt.texto}</span>
                {showFeedback && alt.label === question.correta && (
                  <CheckCircle2 size={18} className="ml-auto text-green-500" />
                )}
                {showFeedback && alt.label === selected && !isCorrect && (
                  <XCircle size={18} className="ml-auto text-destructive" />
                )}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleNext}
          disabled={!showFeedback}
          className="mt-4 w-full bg-primary font-display font-semibold text-primary-foreground hover:bg-nagumo-red-hover"
        >
          {isLast ? "FINALIZAR" : "PRÓXIMA"}
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-right text-xs text-muted-foreground">
          {currentQ + 1}/{questions.length}
        </p>
      </div>
    </div>
  );
};

export default QuizTab;
