import { useState } from "react";
import { getAllUsers, getRanking, removeFromRanking, removeUser, updateRanking, type UserData, type RankingEntry } from "@/lib/store";
import { Shield, Users, Trophy, Trash2, Edit2, Save, X, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminView = "users" | "ranking";

const AdminTab = () => {
  const [view, setView] = useState<AdminView>("users");
  const [users, setUsers] = useState<UserData[]>(getAllUsers());
  const [ranking, setRanking] = useState<RankingEntry[]>(getRanking());
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editScore, setEditScore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const refreshData = () => {
    setUsers(getAllUsers());
    setRanking(getRanking());
  };

  const handleRemoveUser = (cpf: string) => {
    if (!confirm("Tem certeza que deseja excluir este cadastro? O usuário também será removido do ranking.")) return;
    removeUser(cpf);
    refreshData();
  };

  const handleRemoveFromRanking = (cpf: string) => {
    removeFromRanking(cpf);
    refreshData();
  };

  const handleEditScore = (idx: number) => {
    setEditingIdx(idx);
    setEditScore(String(ranking[idx].percentage));
  };

  const handleSaveScore = (idx: number) => {
    const newRanking = [...ranking];
    const newPercentage = Math.max(0, Math.min(100, parseInt(editScore) || 0));
    newRanking[idx] = {
      ...newRanking[idx],
      percentage: newPercentage,
      score: Math.round((newPercentage / 100) * newRanking[idx].total),
    };
    newRanking.sort((a, b) => b.percentage - a.percentage || a.timestamp - b.timestamp);
    updateRanking(newRanking);
    setEditingIdx(null);
    refreshData();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cpf.includes(searchTerm.replace(/\D/g, ""))
  );

  const filteredRanking = ranking.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cpf.includes(searchTerm.replace(/\D/g, ""))
  );

  const exportCSV = () => {
    const allUsers = getAllUsers();
    const allRanking = getRanking();

    let csv = "=== FUNCIONÁRIOS ===\nNome,CPF,Nascimento\n";
    allUsers.forEach((u) => {
      csv += `"${u.nome}","${u.cpf}","${u.nascimento}"\n`;
    });

    csv += "\n=== RANKING ===\nPosição,Nome,CPF,Loja,Pontuação(%),Acertos,Total\n";
    allRanking.forEach((r, i) => {
      csv += `${i + 1},"${r.name}","${r.cpf}","${r.loja}",${r.percentage},${r.score},${r.total}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nagumo_academy_dados_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          <h2 className="font-display text-lg font-bold text-foreground">Painel Administrativo</h2>
        </div>
        <Button onClick={exportCSV} size="sm" variant="outline" className="border-border text-foreground">
          <Download size={14} className="mr-1" /> Exportar CSV
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome ou CPF..."
          className="border-border bg-secondary pl-9 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* View Switcher */}
      <div className="flex gap-2">
        <Button
          variant={view === "users" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("users")}
          className={view === "users" ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
        >
          <Users size={16} className="mr-1" /> Cadastros ({filteredUsers.length})
        </Button>
        <Button
          variant={view === "ranking" ? "default" : "outline"}
          size="sm"
          onClick={() => { setView("ranking"); refreshData(); }}
          className={view === "ranking" ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
        >
          <Trophy size={16} className="mr-1" /> Ranking ({filteredRanking.length})
        </Button>
      </div>

      {view === "users" && (
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[1fr_100px_100px_40px] gap-2 border-b border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
            <span>Nome</span>
            <span>CPF</span>
            <span>Nascimento</span>
            <span></span>
          </div>
          {filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Nenhum cadastro encontrado.</div>
          ) : (
            filteredUsers.map((u, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_100px_100px_40px] items-center gap-2 px-4 py-2.5 text-sm ${
                  i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                } ${u.isAdmin ? "border-l-2 border-l-primary" : ""}`}
              >
                <span className="truncate text-foreground">
                  {u.nome} {u.isAdmin && <span className="text-xs text-primary">(Admin)</span>}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {u.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.***.**$3-$4")}
                </span>
                <span className="text-xs text-muted-foreground">{u.nascimento}</span>
                <div className="flex justify-end">
                  {!u.isAdmin && (
                    <button
                      onClick={() => handleRemoveUser(u.cpf)}
                      className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-destructive"
                      title="Excluir cadastro"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === "ranking" && (
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[40px_1fr_60px_60px_60px] gap-2 border-b border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
            <span>#</span>
            <span>Nome</span>
            <span className="text-right">%</span>
            <span className="text-right">Loja</span>
            <span className="text-right">Ações</span>
          </div>
          {filteredRanking.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Ranking vazio.</div>
          ) : (
            filteredRanking.map((entry, i) => (
              <div
                key={i}
                className={`grid grid-cols-[40px_1fr_60px_60px_60px] items-center gap-2 px-4 py-2.5 text-sm ${
                  i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                }`}
              >
                <span className="font-display font-bold text-muted-foreground">{i + 1}º</span>
                <span className="truncate text-foreground">{entry.name}</span>
                <span className="text-right font-display font-bold text-foreground">
                  {editingIdx === i ? (
                    <Input
                      value={editScore}
                      onChange={(e) => setEditScore(e.target.value)}
                      className="h-7 w-14 border-border bg-secondary px-1 text-center text-xs"
                      type="number"
                      min={0}
                      max={100}
                    />
                  ) : (
                    `${entry.percentage}%`
                  )}
                </span>
                <span className="text-right text-xs text-muted-foreground">{entry.loja}</span>
                <div className="flex items-center justify-end gap-1">
                  {editingIdx === i ? (
                    <>
                      <button onClick={() => handleSaveScore(i)} className="rounded p-1 text-green-500 hover:bg-secondary">
                        <Save size={14} />
                      </button>
                      <button onClick={() => setEditingIdx(null)} className="rounded p-1 text-muted-foreground hover:bg-secondary">
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditScore(i)} className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleRemoveFromRanking(entry.cpf)} className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTab;
