import { useState } from "react";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getComments, addComment, removeComment, getUser, type CommentEntry } from "@/lib/store";

const CommentsTab = () => {
  const [comments, setComments] = useState<CommentEntry[]>(getComments());
  const [text, setText] = useState("");
  const user = getUser();
  const isAdmin = user?.isAdmin;

  const handleSubmit = () => {
    if (!text.trim() || !user) return;
    addComment({
      name: user.nome,
      cpf: user.cpf,
      text: text.trim(),
      timestamp: Date.now(),
    });
    setText("");
    setComments(getComments());
  };

  const handleDelete = (timestamp: number) => {
    removeComment(timestamp);
    setComments(getComments());
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  return (
    <div className="animate-fade-in space-y-4 p-4">
      <div className="flex items-center gap-2">
        <MessageCircle size={20} className="text-primary" />
        <h2 className="font-display text-lg font-bold text-foreground">Comentários do Treinamento</h2>
      </div>

      {/* New comment */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva seu comentário..."
          className="border-border bg-secondary text-foreground placeholder:text-muted-foreground resize-none"
          rows={3}
        />
        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="w-full bg-primary font-display font-semibold text-primary-foreground hover:bg-nagumo-red-hover disabled:opacity-40"
        >
          <Send size={16} className="mr-1" />
          ENVIAR
        </Button>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          Nenhum comentário ainda. Seja o primeiro!
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.timestamp} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-display font-semibold text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">· {formatDate(c.timestamp)}</span>
                </div>
                {(isAdmin || c.cpf === user?.cpf) && (
                  <button
                    onClick={() => handleDelete(c.timestamp)}
                    className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsTab;
