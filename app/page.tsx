'use client';

import { AlertCircle } from 'lucide-react';
import { useSupabasePackingList } from '@/hooks/useSupabasePackingList';
import { Header } from '@/components/Header';
import { AddItemForm } from '@/components/AddItemForm';
import { CategoryGroup } from '@/components/CategoryGroup';
import { useTripManager } from '@/components/TripManager';


export default function Home() {
  const {
    items,
    errorMsg,
    isLoading,
    isSubmitting,
    fetchItems,
    addItem,
    togglePacked,
    deleteItem,
    packedCount,
    progressPercent,
  } = useSupabasePackingList();

  const uniqueAssignees = Array.from(
    new Set(items.map((item) => item.assigned_to).filter(Boolean))
  ) as string[];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <Header
          packedCount={packedCount}
          totalCount={items.length}
          progressPercent={progressPercent}
          isLoading={isLoading}
          onRefresh={fetchItems}
        />

        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500/50 text-rose-200 p-4 rounded-xl text-sm flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-300">Supabase Error Detected</p>
              <p className="text-xs text-rose-200/90 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        <AddItemForm
          onAddItem={addItem}
          isSubmitting={isSubmitting}
          uniqueAssignees={uniqueAssignees}
        />

        <CategoryGroup
          items={items}
          isLoading={isLoading}
          onTogglePacked={togglePacked}
          onDeleteItem={deleteItem}
        />
      </div>
    </div>
  );
}