// types/index.ts
export interface PackingItem {
  id: string | number;
  item_name: string;
  is_packed: boolean;
  assigned_to?: string;
  category?: string; // Added category field
  created_at?: string;
}