// hooks/usePackingList.ts
import { useState } from 'react';
import { PackingItem, Category } from '@/types';

export function usePackingList() {
  const [items, setItems] = useState<PackingItem[]>([
    { id: 1, name: '4-Person Camping Tent', category: 'Gear', isPacked: true, assignedTo: 'Alex' },
    { id: 2, name: 'Sleeping Bags (x4)', category: 'Gear', isPacked: false, assignedTo: 'Sam' },
  ]);

  const addItem = (name: string, category: Category, assignedTo: string) => {
    if (!name.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name, category, isPacked: false, assignedTo },
    ]);
  };

  const togglePacked = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPacked: !item.isPacked } : item))
    );
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const packedCount = items.filter((i) => i.isPacked).length;
  const progressPercent = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  return { items, addItem, togglePacked, deleteItem, packedCount, progressPercent };
}