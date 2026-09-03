'use client';

import { Tag, CheckCircle2, Circle, User, Trash2, RefreshCw } from 'lucide-react';
import { PackingItem } from '@/types';
import { CATEGORIES } from './AddItemForm';

interface CategoryGroupProps {
  items: PackingItem[];
  isLoading: boolean;
  onTogglePacked: (id: string | number, currentStatus: boolean) => void;
  onDeleteItem: (id: string | number) => void;
}

export function CategoryGroup({
  items,
  isLoading,
  onTogglePacked,
  onDeleteItem,
}: CategoryGroupProps) {
  const groupedItems = items.reduce<Record<string, PackingItem[]>>((acc, item) => {
    const cat = item.category && CATEGORIES.includes(item.category as any) ? item.category : 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin" /> Loading items from Supabase...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
        No items in database yet. Add your first item above!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {CATEGORIES.map((categoryName) => {
        const categoryItems = groupedItems[categoryName];
        if (!categoryItems || categoryItems.length === 0) return null;

        return (
          <div key={categoryName} className="space-y-2">
            <div className="flex items-center gap-2 px-1 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <Tag className="w-3.5 h-3.5" />
              <span>{categoryName}</span>
              <span className="text-slate-500 text-[10px] font-normal">
                ({categoryItems.length})
              </span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 backdrop-blur-sm space-y-2">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    item.is_packed
                      ? 'bg-slate-950/40 border-slate-800/50 text-slate-500'
                      : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div
                    onClick={() => onTogglePacked(item.id, item.is_packed)}
                    className="flex items-center space-x-3 cursor-pointer flex-1 overflow-hidden"
                  >
                    {item.is_packed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400 shrink-0" />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 truncate">
                      <span
                        className={`text-sm truncate ${
                          item.is_packed ? 'line-through' : 'font-medium'
                        }`}
                      >
                        {item.item_name}
                      </span>
                      {item.assigned_to && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 w-fit">
                          <User className="w-3 h-3" /> {item.assigned_to}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg transition-colors shrink-0"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}