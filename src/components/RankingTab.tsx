import { getRanking, getUser } from "@/lib/store";
import { quizTitle } from "@/lib/quizData";
import { Trophy } from "lucide-react";

const medals = ["🥇", "🥈", "🥉"];

const RankingTab = () => {
  const ranking = getRanking();
  const currentUser = getUser();

  return (
    <div className="animate-fade-in space-y-4 p-4">
      <div>
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-primary" />
          <h2 className="font-display text-lg font-bold text-foreground">Ranking Oficial</h2>
        </div>
        <p className="text-xs text-muted-foreground">{quizTitle} · 1ª tentativa apenas</p>
      </div>

      {ranking.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <Trophy size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Nenhum resultado ainda. Seja o primeiro!</p>
        </div>
      ) : (
        <>
          {ranking.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              {ranking.slice(0, 3).map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    currentUser && entry.cpf === currentUser.cpf ? "bg-primary/10" : ""
                  } ${i < 2 ? "border-b border-border" : ""}`}
                >
                  <span className="text-xl">{medals[i]}</span>
                  <span className="font-display text-sm font-bold text-foreground">
                    {i + 1}º
                  </span>
                  <span className="flex-1 truncate text-sm text-foreground">{entry.name}</span>
                  <span className="font-display text-sm font-bold text-primary">
                    {entry.percentage}%
                  </span>
                  <span className="text-xs text-muted-foreground">{entry.loja}</span>
                </div>
              ))}
            </div>
          )}

          {ranking.length > 3 && (
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[40px_1fr_60px_60px] gap-2 border-b border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
                <span>#</span>
                <span>Nome</span>
                <span className="text-right">Pontos</span>
                <span className="text-right">Loja</span>
              </div>
              {ranking.slice(3).map((entry, i) => (
                <div
                  key={i + 3}
                  className={`grid grid-cols-[40px_1fr_60px_60px] gap-2 px-4 py-2.5 text-sm ${
                    currentUser && entry.cpf === currentUser.cpf
                      ? "bg-primary/10"
                      : i % 2 === 0
                      ? "bg-card"
                      : "bg-secondary/50"
                  }`}
                >
                  <span className="font-display font-bold text-muted-foreground">{i + 4}º</span>
                  <span className="truncate text-foreground">{entry.name}</span>
                  <span className="text-right font-display font-bold text-foreground">
                    {entry.percentage}%
                  </span>
                  <span className="text-right text-xs text-muted-foreground">{entry.loja}</span>
                </div>
              ))}
            </div>
          )}

          {currentUser && ranking.some((r) => r.cpf === currentUser.cpf) && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-center">
              <p className="text-sm text-foreground">
                Sua posição:{" "}
                <span className="font-display font-bold text-primary">
                  {ranking.findIndex((r) => r.cpf === currentUser.cpf) + 1}º lugar
                </span>{" "}
                ({ranking.find((r) => r.cpf === currentUser.cpf)?.percentage}%)
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RankingTab;
