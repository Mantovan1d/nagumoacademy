import { getUser, getRanking } from "@/lib/store";

const premios = [
  { icon: "🎒", titulo: "MOCHILA", desc: "MONSTER ENERGY" },
  { icon: "👝", titulo: "BAG DE PEITO", desc: "MONSTER ENERGY" },
  { icon: "📦", titulo: "FARDO", desc: "MONSTER ENERGY" },
  { icon: "🧢", titulo: "BONÉ", desc: "MONSTER ENERGY" },
];

const PremiacoesTab = () => {
  const user = getUser();
  const ranking = getRanking();
  const userPos = user
    ? ranking.findIndex((r) => r.name === user.nome) + 1
    : 0;

  return (
    <div className="animate-fade-in min-h-[calc(100vh-200px)] p-6">
      <div className="mx-auto max-w-[600px] space-y-8">
        {/* Título */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-black uppercase text-primary sm:text-5xl">
            🏆 SORTEIO
          </h1>
          <p className="mt-2 font-display text-sm font-semibold tracking-widest text-muted-foreground">
            para os melhores colocados
          </p>
        </div>

        {/* Grid de produtos flutuando */}
        <div className="grid grid-cols-2 gap-4">
          {premios.map((p, i) => (
            <div
              key={i}
              className="group flex cursor-default flex-col items-center rounded-2xl border-2 border-primary bg-card p-6 text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                boxShadow: "0 10px 30px hsl(var(--nagumo-red) / 0.3)",
                animation: `float 3s ease-in-out ${i * 0.5}s infinite`,
              }}
            >
              <span className="text-6xl drop-shadow-lg">{p.icon}</span>
              <h3 className="mt-3 font-display text-lg font-extrabold uppercase text-foreground">
                {p.titulo}
              </h3>
              <p className="font-display text-[11px] font-semibold tracking-[2px] text-primary">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sorteio */}
        <div className="rounded-2xl border-2 border-primary bg-card p-8 text-center"
          style={{ boxShadow: "0 0 30px hsl(var(--nagumo-red) / 0.2)" }}
        >
          <div className="mb-4 flex justify-center gap-6 text-4xl">
            <span>🥇</span>
            <span>🥈</span>
            <span>🥉</span>
          </div>
          <h2 className="font-display text-lg font-black uppercase tracking-wider text-primary sm:text-xl">
            OS 3 MELHORES COLOCADOS
          </h2>
          <p className="mt-1 font-display text-base font-bold text-foreground sm:text-lg">
            CONCORREM A UM SORTEIO
          </p>
          <p className="mt-1 text-lg font-bold text-foreground sm:text-xl">
            PARA LEVAR{" "}
            <span className="font-black text-primary">TUDO!</span>
          </p>
        </div>

        {/* Posição do usuário */}
        {userPos > 0 && (
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-primary bg-card p-4">
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
