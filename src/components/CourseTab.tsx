import { Video, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { videoUrl, quizTitle, videoDescription, videoDuration, questions } from "@/lib/quizData";
import { hasWatchedVideo, setVideoWatched } from "@/lib/store";
import { useState, useEffect } from "react";

interface CourseTabProps {
  onGoToQuiz: () => void;
}

const CourseTab = ({ onGoToQuiz }: CourseTabProps) => {
  const [watched, setWatched] = useState(hasWatchedVideo());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (watched) {
      setProgress(100);
      return;
    }
    // Simulate video watching progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          setVideoWatched();
          setWatched(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [watched]);

  return (
    <div className="animate-fade-in space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Video size={20} className="text-primary" />
        <h2 className="font-display text-lg font-bold text-foreground">{quizTitle}</h2>
      </div>

      {/* Video Embed */}
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="relative aspect-video w-full bg-secondary">
          <iframe
            src={videoUrl}
            title={quizTitle}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progresso do vídeo</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {videoDuration}
        </span>
        <span className="flex items-center gap-1">
          <FileText size={14} />
          {questions.length} perguntas após o vídeo
        </span>
      </div>

      {/* About */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
          <FileText size={16} className="text-primary" />
          Sobre o Treinamento
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{videoDescription}</p>
      </div>

      {/* CTA */}
      <Button
        onClick={onGoToQuiz}
        disabled={!watched}
        className="w-full bg-primary font-display font-semibold text-primary-foreground hover:bg-nagumo-red-hover disabled:opacity-40"
        size="lg"
      >
        {watched ? "FAZER QUIZ" : "Assista o vídeo para liberar o quiz"}
      </Button>
    </div>
  );
};

export default CourseTab;
