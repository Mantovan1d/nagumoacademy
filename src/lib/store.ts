// Simple localStorage-based state management

export interface UserData {
  nome: string;
  cpf: string;
  nascimento: string; // DD/MM/YYYY
  isAdmin: boolean;
}

export interface RankingEntry {
  name: string;
  cpf: string;
  loja: string;
  score: number;
  total: number;
  percentage: number;
  timestamp: number;
}

export interface CommentEntry {
  name: string;
  cpf: string;
  text: string;
  timestamp: number;
}

const KEYS = {
  USER: "nagumo_user",
  USERS_DB: "nagumo_users_db",
  VIDEO_WATCHED: "nagumo_video_watched",
  ATTEMPTS: "nagumo_attempts",
  RANKING: "nagumo_ranking",
  THEME: "nagumo_theme",
  COMMENTS: "nagumo_comments",
};

const ADMIN_CPF = "85455215370";
const ADMIN_NASCIMENTO = "04/02/2000";

export function isAdminCredentials(cpf: string, nascimento: string): boolean {
  return cpf === ADMIN_CPF && nascimento === ADMIN_NASCIMENTO;
}

// Theme
export function getTheme(): "dark" | "light" {
  return (localStorage.getItem(KEYS.THEME) as "dark" | "light") || "dark";
}

export function setTheme(theme: "dark" | "light") {
  localStorage.setItem(KEYS.THEME, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function initTheme() {
  const theme = getTheme();
  setTheme(theme);
}

// User
export function getUser(): UserData | null {
  try {
    const data = localStorage.getItem(KEYS.USER);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setUser(data: UserData) {
  localStorage.setItem(KEYS.USER, JSON.stringify(data));
  const users = getAllUsers();
  const existing = users.find((u) => u.cpf === data.cpf);
  if (!existing) {
    users.push(data);
    localStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));
  }
}

export function clearUser() {
  localStorage.removeItem(KEYS.USER);
  localStorage.removeItem(KEYS.VIDEO_WATCHED);
  localStorage.removeItem(KEYS.ATTEMPTS);
}

export function getAllUsers(): UserData[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.USERS_DB) || "[]");
  } catch {
    return [];
  }
}

export function removeUser(cpf: string) {
  const users = getAllUsers().filter((u) => u.cpf !== cpf);
  localStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));
  // Also remove from ranking
  removeFromRanking(cpf);
}

// Video
export function hasWatchedVideo(): boolean {
  return localStorage.getItem(KEYS.VIDEO_WATCHED) === "true";
}

export function setVideoWatched() {
  localStorage.setItem(KEYS.VIDEO_WATCHED, "true");
}

// Attempts
export function getAttempts(): number {
  return parseInt(localStorage.getItem(KEYS.ATTEMPTS) || "0", 10);
}

export function incrementAttempts() {
  localStorage.setItem(KEYS.ATTEMPTS, String(getAttempts() + 1));
}

// Ranking
export function getRanking(): RankingEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.RANKING) || "[]");
  } catch {
    return [];
  }
}

export function addToRanking(entry: RankingEntry) {
  const ranking = getRanking();
  const existing = ranking.find((r) => r.cpf === entry.cpf);
  if (existing) return;
  ranking.push(entry);
  ranking.sort((a, b) => b.percentage - a.percentage || a.timestamp - b.timestamp);
  localStorage.setItem(KEYS.RANKING, JSON.stringify(ranking));
}

export function updateRanking(newRanking: RankingEntry[]) {
  localStorage.setItem(KEYS.RANKING, JSON.stringify(newRanking));
}

export function removeFromRanking(cpf: string) {
  const ranking = getRanking().filter((r) => r.cpf !== cpf);
  localStorage.setItem(KEYS.RANKING, JSON.stringify(ranking));
}

// Comments
export function getComments(): CommentEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.COMMENTS) || "[]");
  } catch {
    return [];
  }
}

export function addComment(entry: CommentEntry) {
  const comments = getComments();
  comments.unshift(entry);
  localStorage.setItem(KEYS.COMMENTS, JSON.stringify(comments));
}

export function removeComment(timestamp: number) {
  const comments = getComments().filter((c) => c.timestamp !== timestamp);
  localStorage.setItem(KEYS.COMMENTS, JSON.stringify(comments));
}
