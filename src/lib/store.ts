// Simple localStorage-based state management

export interface RankingEntry {
  name: string;
  loja: string;
  score: number;
  total: number;
  percentage: number;
  timestamp: number;
}

const KEYS = {
  USER: "nagumo_user",
  VIDEO_WATCHED: "nagumo_video_watched",
  ATTEMPTS: "nagumo_attempts",
  RANKING: "nagumo_ranking",
};

export function getUser(): string | null {
  return localStorage.getItem(KEYS.USER);
}

export function setUser(name: string) {
  localStorage.setItem(KEYS.USER, name);
}

export function clearUser() {
  localStorage.removeItem(KEYS.USER);
  localStorage.removeItem(KEYS.VIDEO_WATCHED);
  localStorage.removeItem(KEYS.ATTEMPTS);
}

export function hasWatchedVideo(): boolean {
  return localStorage.getItem(KEYS.VIDEO_WATCHED) === "true";
}

export function setVideoWatched() {
  localStorage.setItem(KEYS.VIDEO_WATCHED, "true");
}

export function getAttempts(): number {
  return parseInt(localStorage.getItem(KEYS.ATTEMPTS) || "0", 10);
}

export function incrementAttempts() {
  localStorage.setItem(KEYS.ATTEMPTS, String(getAttempts() + 1));
}

export function getRanking(): RankingEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.RANKING) || "[]");
  } catch {
    return [];
  }
}

export function addToRanking(entry: RankingEntry) {
  const ranking = getRanking();
  // Only keep first attempt per user
  const existing = ranking.find((r) => r.name === entry.name);
  if (existing) return;
  ranking.push(entry);
  ranking.sort((a, b) => b.percentage - a.percentage || a.timestamp - b.timestamp);
  localStorage.setItem(KEYS.RANKING, JSON.stringify(ranking));
}
