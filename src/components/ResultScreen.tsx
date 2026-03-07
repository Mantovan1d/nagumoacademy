import { Button } from "@/components/ui/button";
import { getAttempts } from "@/lib/store";
import { CheckCircle2, XCircle } from "lucide-react";

interface ResultScreenProps {
  score: number;
  total: number;
  onGoToRanking: () => void;
  onRetry: () => void;
}

const ResultScreen = ({ score, total, onGoToRanking, onRetry }: ResultScreenProps) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;
  const attempts = getAttempts();
  const canRetry = attempts < 3;

  return (
    <div className="flex flex-col items-center justify-center p-6 animate-scale-in">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center">
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">🎯 Resultado</h2>

        {/* Score Circle */}
        <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary bg-primary/10">
          <span className="font-display text-3xl font-bold text-primary">{percentage}%</span>
        </div>

        {/* Status */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {passed ? (
            <>
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="font-display font-semibold text-green-500">
                Parabéns! Você foi aprovado!
              </span>
            </>
          ) : (
            <>
              <XCircle size={20} className="text-destructive" />
              <span className="font-display font-semibold text-destructive">
                Nota mínima não atingida
              </span>
            </>
          )}
        </div>

        {/* Details */}
        <div className="mb-6 space-y-1 text-sm text-muted-foreground">
          <p>Acertos: {score} de {total}</p>
          <p>Nota mínima: 70%</p>
          <p>Tentativa: {attempts}/3</p>
          {attempts === 1 && <p className="text-primary">Você está no ranking!</p>}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={onGoToRanking}
            className="w-full bg-primary font-display font-semibold text-primary-foreground hover:bg-nagumo-red-hover"
          >
            VER RANKING
          </Button>
          {canRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="w-full border-border font-display font-semibold text-foreground hover:bg-secondary"
            >
              TENTAR NOVAMENTE ({3 - attempts} restante{3 - attempts !== 1 ? "s" : ""})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
