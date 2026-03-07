import { useState, useCallback } from "react";
import LoginScreen from "@/components/LoginScreen";
import Header from "@/components/Header";
import BottomTabs, { type TabId } from "@/components/BottomTabs";
import CourseTab from "@/components/CourseTab";
import QuizTab from "@/components/QuizTab";
import ResultScreen from "@/components/ResultScreen";
import RankingTab from "@/components/RankingTab";
import { getUser, setUser } from "@/lib/store";

const Index = () => {
  const [userName, setUserName] = useState<string | null>(getUser());
  const [activeTab, setActiveTab] = useState<TabId>("curso");
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  const handleLogin = useCallback((name: string) => {
    setUser(name);
    setUserName(name);
  }, []);

  const handleLogout = useCallback(() => {
    setUserName(null);
    setActiveTab("curso");
    setQuizResult(null);
  }, []);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    setQuizResult({ score, total });
  }, []);

  if (!userName) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header userName={userName} onLogout={handleLogout} />

      <main className="mx-auto max-w-[600px]">
        {activeTab === "curso" && (
          <CourseTab onGoToQuiz={() => setActiveTab("quiz")} />
        )}
        {activeTab === "quiz" && !quizResult && (
          <QuizTab onComplete={handleQuizComplete} />
        )}
        {activeTab === "quiz" && quizResult && (
          <ResultScreen
            score={quizResult.score}
            total={quizResult.total}
            onGoToRanking={() => {
              setActiveTab("ranking");
              setQuizResult(null);
            }}
            onRetry={() => setQuizResult(null)}
          />
        )}
        {activeTab === "ranking" && <RankingTab />}
      </main>

      <BottomTabs active={activeTab} onChange={(tab) => {
        if (tab !== "quiz") setQuizResult(null);
        setActiveTab(tab);
      }} />
    </div>
  );
};

export default Index;
