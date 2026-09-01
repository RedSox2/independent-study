// types/index.ts
export type Category = 'Gear' | 'Food' | 'Supplies';
export type TabType = 'packing' | 'meals' | 'costs';

export interface PackingItem {
  id: string | number;
  item_name: string;
  is_packed: boolean;
  assigned_to?: string; // New field added
  created_at?: string;
}