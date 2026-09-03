'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export const CATEGORIES = ['Food', 'Supplies', 'Clothes', 'Gear', 'Other'] as const;

interface AddItemFormProps {
  onAddItem: (name: string, assignee: string, category: string) => Promise<boolean>;
  isSubmitting: boolean;
  uniqueAssignees: string[];
}

export function AddItemForm({ onAddItem, isSubmitting, uniqueAssignees }: AddItemFormProps) {
  const [newItemName, setNewItemName] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newCategory, setNewCategory] = useState<string>('Gear');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || isSubmitting) return;

    const tempName = newItemName.trim();
    const tempAssignee = newAssignee.trim();
    const tempCategory = newCategory;

    setNewItemName('');
    setNewAssignee('');
    setNewCategory('Gear');

    const success = await onAddItem(tempName, tempAssignee, tempCategory);

    if (!success) {
      setNewItemName(tempName);
      setNewAssignee(tempAssignee);
      setNewCategory(tempCategory);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Add new gear..."
        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
        disabled={isSubmitting}
      />

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <input
            list="assignees-list"
            type="text"
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            placeholder="Who's packing it?"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            disabled={isSubmitting}
          />
          <datalist id="assignees-list">
            {uniqueAssignees.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-200 cursor-pointer"
          disabled={isSubmitting}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isSubmitting || !newItemName.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold px-6 py-3 sm:py-0 rounded-xl flex items-center justify-center gap-1.5 text-sm transition-all active:scale-95 shadow-md shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </form>
  );
}