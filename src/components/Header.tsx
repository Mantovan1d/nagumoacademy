import { User, LogOut, Moon, Sun } from "lucide-react";
import { clearUser, getTheme, setTheme } from "@/lib/store";
import { useState } from "react";
import nagumoLogo from "@/assets/nagumo-logo.png";

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header = ({ userName, onLogout }: HeaderProps) => {
  const [isDark, setIsDark] = useState(getTheme() === "dark");

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[600px] items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={nagumoLogo} alt="Supermercados Nagumo" className="h-8" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title={isDark ? "Modo claro" : "Modo escuro"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
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
