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

const KEYS = {
  USER: "nagumo_user",
  USERS_DB: "nagumo_users_db",
  VIDEO_WATCHED: "nagumo_video_watched",
  ATTEMPTS: "nagumo_attempts",
  RANKING: "nagumo_ranking",
};

const ADMIN_CPF = "85455215370";
const ADMIN_NASCIMENTO = "04/02/2000";

export function isAdminCredentials(cpf: string, nascimento: string): boolean {
  return cpf === ADMIN_CPF && nascimento === ADMIN_NASCIMENTO;
}

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
  // Also save to users DB
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
