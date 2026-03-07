import { User, LogOut } from "lucide-react";
import { clearUser } from "@/lib/store";

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header = ({ userName, onLogout }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[600px] items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-primary">NAGUMO</span>{" "}
            <span className="text-foreground">ACADEMY</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User size={16} />
            <span className="max-w-[100px] truncate">{userName}</span>
          </div>
          <button
            onClick={() => {
              clearUser();
              onLogout();
            }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
