import { Video, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizTitle, videoId, videoDescription, videoDuration, questions } from "@/lib/quizData";
import { hasWatchedVideo, setVideoWatched } from "@/lib/store";
import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface CourseTabProps {
  onGoToQuiz: () => void;
}

const CourseTab = ({ onGoToQuiz }: CourseTabProps) => {
  const [watched, setWatched] = useState(hasWatchedVideo());
  const [progress, setProgress] = useState(watched ? 100 : 0);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkProgress = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      if (duration > 0) {
        const pct = (currentTime / duration) * 100;
        setProgress(Math.min(Math.round(pct), 100));
        if (pct >= 95) {
          setVideoWatched();
          setWatched(true);
          setProgress(100);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (watched) {
      setProgress(100);
      return;
    }

    const initPlayer = () => {
      if (!window.YT?.Player) return;
      playerRef.current = new window.YT.Player("yt-player", {
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(checkProgress, 2000);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              checkProgress();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [watched, checkProgress]);

  return (
    <div className="animate-fade-in space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Video size={20} className="text-primary" />
        <h2 className="font-display text-lg font-bold text-foreground">{quizTitle}</h2>
      </div>

      {/* Aviso discreto */}
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-foreground/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm text-primary">⚠️</span>
          <span className="font-body text-[13px] font-medium text-muted-foreground">
            Se sair, o vídeo reinicia
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-foreground/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm text-primary">🎓</span>
          <span className="font-body text-[13px] font-medium text-muted-foreground">
            Complete o vídeo para liberar o quiz
          </span>
        </div>
      </div>

      {/* Video Embed */}
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            id="yt-player"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&origin=${window.location.origin}`}
            title={quizTitle}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
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
        {watched ? "FAZER QUIZ" : "Assista ao vídeo (95%) para liberar o quiz"}
      </Button>
    </div>
  );
};

export default CourseTab;
