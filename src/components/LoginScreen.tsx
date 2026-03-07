import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, AlertCircle } from "lucide-react";

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const testimonials = [
  {
    text: "Treinamento muito prático, já apliquei no setor de frios.",
    author: "Bruce Chan",
    role: "Gerente",
  },
  {
    text: "Conteúdo relevante para o dia a dia do supermercado.",
    author: "Naomi Bull",
    role: "Gerente",
  },
];

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-[420px] animate-fade-in space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            <span className="text-primary">NAGUMO</span>{" "}
            <span className="text-foreground">ACADEMY</span>
          </h1>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Treinamento que transforma
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Acesso do Funcionário
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block font-display text-sm font-medium text-foreground">
                Nome
              </label>
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={name.trim().length < 2}
              className="w-full bg-primary font-display font-semibold text-primary-foreground hover:bg-nagumo-red-hover"
              size="lg"
            >
              ENTRAR
            </Button>
          </form>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>Use seu nome completo cadastrado</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Star size={16} className="text-primary" />
            <h3 className="font-display text-sm font-semibold text-foreground">
              Avaliações dos Treinamentos
            </h3>
          </div>
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <div key={i} className="text-sm">
                <p className="italic text-muted-foreground">"{t.text}"</p>
                <p className="mt-1 font-display text-xs font-semibold text-foreground">
                  — {t.author},{" "}
                  <span className="font-normal text-muted-foreground">{t.role}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
