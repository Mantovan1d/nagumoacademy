import { Video, FileText, Trophy } from "lucide-react";

export type TabId = "curso" | "quiz" | "ranking";

interface BottomTabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Video }[] = [
  { id: "curso", label: "Curso", icon: Video },
  { id: "quiz", label: "Quiz", icon: FileText },
  { id: "ranking", label: "Ranking", icon: Trophy },
];

const BottomTabs = ({ active, onChange }: BottomTabsProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="mx-auto flex max-w-[600px] items-center justify-around">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-b bg-primary" />
              )}
              <tab.icon size={22} />
              <span className="font-display text-xs font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabs;
