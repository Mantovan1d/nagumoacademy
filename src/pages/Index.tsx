import { useState, useCallback, useEffect } from "react";
import LoginScreen from "@/components/LoginScreen";
import Header from "@/components/Header";
import BottomTabs, { type TabId } from "@/components/BottomTabs";
import CourseTab from "@/components/CourseTab";
import QuizTab from "@/components/QuizTab";
import ResultScreen from "@/components/ResultScreen";
import RankingTab from "@/components/RankingTab";
import CommentsTab from "@/components/CommentsTab";
import AdminTab from "@/components/AdminTab";
import PremiacoesTab from "@/components/PremiacoesTab";
import { getUser, setUser, initTheme, type UserData } from "@/lib/store";

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(getUser());
  const [activeTab, setActiveTab] = useState<TabId>("curso");
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    initTheme();
  }, []);

  const handleLogin = useCallback((user: UserData) => {
    setUser(user);
    setUserData(user);
  }, []);

  const handleLogout = useCallback(() => {
    setUserData(null);
    setActiveTab("curso");
    setQuizResult(null);
  }, []);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    setQuizResult({ score, total });
  }, []);

  if (!userData) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header userName={userData.nome} onLogout={handleLogout} />

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
        {activeTab === "comentarios" && <CommentsTab />}
        {activeTab === "admin" && userData.isAdmin && <AdminTab />}
      </main>

      <BottomTabs
        active={activeTab}
        onChange={(tab) => {
          if (tab !== "quiz") setQuizResult(null);
          if (tab === "admin" && !userData.isAdmin) return;
          setActiveTab(tab);
        }}
        isAdmin={userData.isAdmin}
      />
    </div>
  );
};

export default Index;
