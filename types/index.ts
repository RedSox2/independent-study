// types/index.ts
export type Category = 'Gear' | 'Food' | 'Supplies';
export type TabType = 'packing' | 'meals' | 'costs';

export interface PackingItem {
  id: number;
  name: string;
  category: Category;
  isPacked: boolean;
  assignedTo: string;
}