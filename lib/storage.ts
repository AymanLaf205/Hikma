// Types for our storage
export interface ThoughtData {
  thought: string;
  date: string;
  lastRegenerated?: number;
  isArabic?: boolean;
}

// Check if we're on the client side before accessing localStorage
const isClient = typeof window !== 'undefined';

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Save thought to localStorage
export const saveThought = (thought: string, isArabic: boolean = false): void => {
  if (!isClient) return;
  
  const today = getTodayDate();
  const thoughtData: ThoughtData = {
    thought,
    date: today,
    lastRegenerated: Date.now(),
    isArabic
  };
  
  localStorage.setItem('dailyThought', JSON.stringify(thoughtData));
};

// Get thought from localStorage
export const getStoredThought = (): ThoughtData | null => {
  if (!isClient) return null;
  
  const storedData = localStorage.getItem('dailyThought');
  if (!storedData) return null;
  
  try {
    const thoughtData: ThoughtData = JSON.parse(storedData);
    return thoughtData;
  } catch (error) {
    console.error('Error parsing stored thought:', error);
    return null;
  }
};

// Check if the thought is from today
export const isThoughtFromToday = (thoughtData: ThoughtData | null): boolean => {
  if (!thoughtData) return false;
  
  const today = getTodayDate();
  return thoughtData.date === today;
};

// Check if regeneration is allowed (once per 10 seconds)
export const canRegenerateThought = (thoughtData: ThoughtData | null): boolean => {
  if (!thoughtData || !thoughtData.lastRegenerated) return true;
  
  const tenSecondsInMs = 10 * 1000;
  const now = Date.now();
  
  return now - thoughtData.lastRegenerated >= tenSecondsInMs;
};

// Get time remaining until next regeneration is allowed
export const getTimeUntilNextRegeneration = (thoughtData: ThoughtData | null): number => {
  if (!thoughtData || !thoughtData.lastRegenerated) return 0;
  
  const tenSecondsInMs = 10 * 1000;
  const now = Date.now();
  const elapsed = now - thoughtData.lastRegenerated;
  
  return Math.max(0, tenSecondsInMs - elapsed);
};