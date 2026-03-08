import { getUser, getRanking } from "@/lib/store";
import premioMochila from "@/assets/premio-mochila.png";
import premioBag from "@/assets/premio-bag.png";
import premioFardo from "@/assets/premio-fardo.png";
import premioBone from "@/assets/premio-bone.png";

const premios = [
  { img: premioMochila, titulo: "MOCHILA", desc: "MONSTER ENERGY" },
  { img: premioBag, titulo: "BAG DE PEITO", desc: "MONSTER ENERGY" },
  { img: premioFardo, titulo: "FARDO", desc: "MONSTER ENERGY" },
  { img: premioBone, titulo: "BONÉ", desc: "MONSTER ENERGY" },
];

const PremiacoesTab = () => {
  const user = getUser();
  const ranking = getRanking();
  const userPos = user
    ? ranking.findIndex((r) => r.name === user.nome) + 1
    : 0;

  return (
    <div className="animate-fade-in relative min-h-[calc(100vh-200px)] overflow-hidden">
      {/* Dark particle/red glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, hsl(var(--nagumo-red) / 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 0% 50%, hsl(var(--nagumo-red) / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, hsl(var(--nagumo-red) / 0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[600px] space-y-6 p-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-black uppercase text-foreground sm:text-4xl">
            🏆 SORTEIO
          </h1>
          <p className="mt-1 font-display text-base font-bold uppercase text-foreground sm:text-lg">
            PARA OS{" "}
            <span className="text-primary">MELHORES COLOCADOS</span>
          </p>
        </div>

        {/* Prize grid */}
        <div className="grid grid-cols-2 gap-3">
          {premios.map((p, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-primary/40 bg-card p-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 0 20px hsl(var(--nagumo-red) / 0.25), inset 0 0 30px hsl(var(--nagumo-red) / 0.05)",
                animation: `float 3s ease-in-out ${i * 0.4}s infinite`,
              }}
            >
              {/* Red glow corners */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background: `
                    radial-gradient(circle at 0% 0%, hsl(var(--nagumo-red) / 0.2) 0%, transparent 40%),
                    radial-gradient(circle at 100% 0%, hsl(var(--nagumo-red) / 0.2) 0%, transparent 40%),
                    radial-gradient(circle at 0% 100%, hsl(var(--nagumo-red) / 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, hsl(var(--nagumo-red) / 0.15) 0%, transparent 40%)
                  `,
                }}
              />

              <img
                src={p.img}
                alt={p.titulo}
                className="relative z-10 h-32 w-32 object-contain drop-shadow-lg sm:h-40 sm:w-40"
                loading="lazy"
              />
              <h3 className="relative z-10 mt-3 font-display text-sm font-extrabold uppercase text-foreground sm:text-base">
                {p.titulo}
              </h3>
              <p className="relative z-10 font-display text-[10px] font-semibold tracking-[2px] text-primary sm:text-xs">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sorteio section */}
        <div
          className="rounded-xl border border-primary/40 bg-card p-6 text-center"
          style={{
            boxShadow: "0 0 30px hsl(var(--nagumo-red) / 0.2)",
          }}
        >
          <div className="mb-3 flex justify-center gap-4 text-3xl sm:text-4xl">
            <span>🏆</span>
            <span className="opacity-70">🏆</span>
            <span className="opacity-50">🏆</span>
          </div>
          <h2 className="font-display text-base font-black uppercase text-foreground sm:text-lg">
            OS 3 MELHORES COLOCADOS
          </h2>
          <p className="mt-1 font-display text-sm font-bold uppercase text-foreground sm:text-base">
            CONCORREM A UM{" "}
            <span className="text-primary">SORTEIO</span>
          </p>
          <p className="font-display text-sm font-bold uppercase text-foreground sm:text-base">
            PARA{" "}
            <span className="font-black text-primary">LEVAR TUDO!</span>
          </p>
        </div>

        {/* User position */}
        {userPos > 0 && (
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-primary/40 bg-card p-4">
            <span className="font-display text-sm font-semibold text-foreground">
              📊 SUA POSIÇÃO:{" "}
              <span className="text-primary">{userPos}º LUGAR</span>
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.max(5, Math.min(100, ((ranking.length - userPos + 1) / Math.max(ranking.length, 1)) * 100))}%`,
                }}
              />
            </div>
            {userPos > 3 ? (
              <span className="font-display text-xs font-semibold text-primary">
                FALTAM {userPos - 3} POSIÇÕES!
              </span>
            ) : (
              <span className="font-display text-xs font-semibold text-primary">
                🔥 VOCÊ ESTÁ NO TOP 3!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiacoesTab;
