import type { TierData } from "@/components/TierRow";

export interface SavedTierList {
  id: string;
  name: string;
  description: string;
  tiers: TierData[];
  thumbnail: string | null;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "wiki-nerdola-tierlists";

export const getTierLists = (): SavedTierList[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTierList = (tierList: SavedTierList): void => {
  const existing = getTierLists();
  const index = existing.findIndex((t) => t.id === tierList.id);
  
  if (index >= 0) {
    existing[index] = { ...tierList, updatedAt: Date.now() };
  } else {
    existing.push(tierList);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const deleteTierList = (id: string): void => {
  const existing = getTierLists();
  const filtered = existing.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getTierListById = (id: string): SavedTierList | null => {
  const tierLists = getTierLists();
  return tierLists.find((t) => t.id === id) || null;
};

export const generateId = (): string => {
  return `tierlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
