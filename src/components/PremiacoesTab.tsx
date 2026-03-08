import { getUser, getRanking } from "@/lib/store";
import premiacoesBanner from "@/assets/premiacoes-banner.png";

const premios = [
  { icon: "🎒", titulo: "MOCHILA", desc: "MONSTER ENERGY", num: "01" },
  { icon: "👝", titulo: "BAG DE PEITO", desc: "MONSTER ENERGY", num: "02" },
  { icon: "📦", titulo: "FARDO", desc: "MONSTER ENERGY", num: "03" },
  { icon: "🧢", titulo: "BONÉ", desc: "MONSTER ENERGY", num: "04" },
];

const PremiacoesTab = () => {
  const user = getUser();
  const ranking = getRanking();
  const userPos = user
    ? ranking.findIndex((r) => r.name === user.nome) + 1
    : 0;

  return (
    <div className="animate-fade-in relative min-h-[calc(100vh-200px)] overflow-hidden p-4">
      {/* Scanlines background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 20px, hsl(var(--nagumo-red) / 0.04) 20px, hsl(var(--nagumo-red) / 0.04) 40px)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[600px] space-y-6">
        {/* Header */}
        <div className="border-y-2 border-primary py-5 text-center">
          <p className="font-display text-xs font-semibold tracking-[4px] text-primary">
            MONSTER ENERGY × NAGUMO
          </p>
          <h1
            className="font-display text-5xl font-black uppercase leading-none text-foreground sm:text-7xl"
            style={{ textShadow: "3px 3px 0 hsl(var(--nagumo-red))" }}
          >
            GANHE!
          </h1>
          <p className="mt-1 font-display text-sm font-semibold tracking-[2px] text-primary">
            PRÊMIOS EXCLUSIVOS
          </p>
        </div>

        {/* Banner image */}
        <img
          src={premiacoesBanner}
          alt="Prêmios Monster Energy x Nagumo"
          className="w-full rounded-lg border-2 border-primary shadow-lg"
          style={{ boxShadow: "0 0 20px hsl(var(--nagumo-red) / 0.3)" }}
          loading="lazy"
        />

        {/* Prize grid */}
        <div className="grid grid-cols-2 gap-3">
          {premios.map((p, i) => (
            <div
              key={i}
              className="relative overflow-hidden border-2 border-primary bg-card p-4"
              style={{
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
                boxShadow: "0 0 15px hsl(var(--nagumo-red) / 0.25)",
              }}
            >
              {/* Diagonal lines overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  background: `repeating-linear-gradient(45deg, hsl(var(--nagumo-red)) 0px, hsl(var(--nagumo-red)) 2px, transparent 2px, transparent 12px)`,
                }}
              />
              <div className="relative flex items-center gap-3">
                <span className="text-4xl drop-shadow-lg">{p.icon}</span>
                <div>
                  <h3 className="font-display text-base font-extrabold uppercase text-foreground sm:text-lg">
                    {p.titulo}
                  </h3>
                  <p className="font-display text-[10px] font-semibold tracking-[2px] text-primary">
                    {p.desc}
                  </p>
                </div>
              </div>
              <span className="absolute bottom-1 right-3 font-display text-xs font-black text-primary opacity-20">
                {p.num}
              </span>
            </div>
          ))}
        </div>

        {/* Sorteio section */}
        <div
          className="relative overflow-hidden border-[3px] border-primary bg-card p-6"
          style={{
            clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0 100%)",
            boxShadow: "0 0 30px hsl(var(--nagumo-red) / 0.25)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              background: `repeating-linear-gradient(45deg, hsl(var(--nagumo-red)) 0px, hsl(var(--nagumo-red)) 2px, transparent 2px, transparent 10px)`,
            }}
          />
          <div className="relative text-center">
            <h2
              className="font-display text-lg font-black uppercase tracking-wider text-primary sm:text-2xl"
              style={{ textShadow: "1px 1px 0 hsl(var(--foreground) / 0.1)" }}
            >
              OS 3 MELHORES COLOCADOS CONCORREM
            </h2>
            <p className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
              A UM SORTEIO PARA LEVAR{" "}
              <span className="font-black text-primary">TUDO!</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {premios.map((p, i) => (
                <span key={i} className="text-4xl">
                  {p.icon}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-8 text-3xl">
              <span>🥇</span>
              <span>🥈</span>
              <span>🥉</span>
            </div>
          </div>
        </div>

        {/* User position */}
        {userPos > 0 && (
          <div className="flex flex-wrap items-center gap-4 border border-primary bg-card p-4">
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
            {userPos > 3 && (
              <span className="font-display text-xs font-semibold text-primary">
                FALTAM {userPos - 3} POSIÇÕES!
              </span>
            )}
            {userPos <= 3 && (
              <span className="font-display text-xs font-semibold text-primary">
                🔥 VOCÊ ESTÁ NO TOP 3!
              </span>
            )}
          </div>
        )}

        {/* Footer brands */}
        <div className="flex items-center justify-between border-y-2 border-primary py-4">
          <span className="font-display text-lg font-extrabold tracking-wider text-foreground">
            NAGUMO
          </span>
          <span className="font-display text-sm font-bold tracking-[4px] text-primary">
            ×
          </span>
          <span className="font-display text-lg font-extrabold tracking-wider text-primary">
            MONSTER ENERGY
          </span>
        </div>
      </div>
    </div>
  );
};

export default PremiacoesTab;
