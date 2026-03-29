// Cookie utility functions for authentication and user data storage

export interface UserData {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  solverHistory?: SolverHistoryItem[];
  exerciseHistory?: ExerciseHistoryItem[];
}

export interface SolverHistoryItem {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export interface ExerciseHistoryItem {
  id: string;
  topic: string;
  difficulty: string;
  exercises: string;
  timestamp: string;
}

// JWT Token management
const TOKEN_KEY = 'chatlomhat_token';
const USER_KEY = 'chatlomhat_user';

export function setAuthToken(token: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

// Set a cookie with optional expiration
export function setCookie(name: string, value: string, days: number = 30): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Get a cookie value by name
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

// Delete a cookie
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// Store user session in cookie
export function setUserSession(user: UserData): void {
  setCookie('user_session', JSON.stringify(user), 30);
}

// Get user session from cookie
export function getUserSession(): UserData | null {
  const session = getCookie('user_session');
  if (!session) return null;
  
  try {
    return JSON.parse(session) as UserData;
  } catch {
    return null;
  }
}

// Clear user session
export function clearUserSession(): void {
  deleteCookie('user_session');
}

// Store user data (history, preferences) in cookie
export function setUserData(data: Partial<UserData>): void {
  const currentSession = getUserSession();
  if (currentSession) {
    const updatedSession = { ...currentSession, ...data };
    setUserSession(updatedSession);
  }
}

// Add solver history item
export function addSolverHistory(item: Omit<SolverHistoryItem, 'id' | 'timestamp'>): void {
  const session = getUserSession();
  if (!session) return;
  
  const newItem: SolverHistoryItem = {
    ...item,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  
  const history = session.solverHistory || [];
  // Keep last 50 items
  const updatedHistory = [newItem, ...history].slice(0, 50);
  
  setUserData({ solverHistory: updatedHistory });
}

// Add exercise history item
export function addExerciseHistory(item: Omit<ExerciseHistoryItem, 'id' | 'timestamp'>): void {
  const session = getUserSession();
  if (!session) return;
  
  const newItem: ExerciseHistoryItem = {
    ...item,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  
  const history = session.exerciseHistory || [];
  // Keep last 50 items
  const updatedHistory = [newItem, ...history].slice(0, 50);
  
  setUserData({ exerciseHistory: updatedHistory });
}

// Generate a simple unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Export user data as JSON (for backup)
export function exportUserData(): string | null {
  const session = getUserSession();
  if (!session) return null;
  return JSON.stringify(session, null, 2);
}

// Import user data from JSON
export function importUserData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as UserData;
    if (data.id && data.email) {
      setUserSession(data);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
