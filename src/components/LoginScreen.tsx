import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { isAdminCredentials } from "@/lib/store";
import type { UserData } from "@/lib/store";

interface LoginScreenProps {
  onLogin: (user: UserData) => void;
}

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [error, setError] = useState("");

  const cpfDigits = cleanCPF(cpf);
  const dateDigits = nascimento.replace(/\D/g, "");
  const isValid = nome.trim().length >= 2 && cpfDigits.length === 11 && dateDigits.length === 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValid) return;

    const cleanedCpf = cpfDigits;
    const formattedDate = nascimento;
    const admin = isAdminCredentials(cleanedCpf, formattedDate);

    onLogin({
      nome: nome.trim(),
      cpf: cleanedCpf,
      nascimento: formattedDate,
      isAdmin: admin,
    });
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
                Nome Completo
              </label>
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-display text-sm font-medium text-foreground">
                CPF
              </label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-display text-sm font-medium text-foreground">
                Data de Nascimento
              </label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/AAAA"
                value={nascimento}
                onChange={(e) => setNascimento(formatDate(e.target.value))}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full bg-primary font-display font-semibold text-primary-foreground hover:bg-nagumo-red-hover"
              size="lg"
            >
              ENTRAR
            </Button>
          </form>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>Use seu CPF e data de nascimento para acessar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
