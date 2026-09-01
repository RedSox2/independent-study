'use client';

import { useState } from 'react';
import { Tent, CheckCircle2, Circle, Plus, Luggage, MapPin, Trash2, AlertCircle, RefreshCw, User } from 'lucide-react';
import { useSupabasePackingList } from '@/hooks/useSupabasePackingList';

export default function Home() {
  const {
    items, errorMsg, isLoading, isSubmitting, fetchItems, addItem, togglePacked, deleteItem, packedCount, progressPercent
  } = useSupabasePackingList();

  const [newItemName, setNewItemName] = useState('');
  const [newAssignee, setNewAssignee] = useState(''); // New state for who is packing it

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || isSubmitting) return;

    const tempName = newItemName.trim();
    const tempAssignee = newAssignee.trim();
    
    setNewItemName('');
    setNewAssignee(''); // Clear both fields

    // Pass both values to the hook
    const success = await addItem(tempName, tempAssignee);
    
    if (!success) {
      setNewItemName(tempName);
      setNewAssignee(tempAssignee);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Banner Header (Unchanged) */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 shadow-xl border border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Tent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Yosemite Expedition 🏕️</h1>
                <p className="text-emerald-100 text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> Shared Live Packing List
                </p>
              </div>
            </div>
            <button onClick={fetchItems} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition text-xs flex items-center gap-1" title="Refresh database">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-1.5 bg-black/20 p-3.5 rounded-xl backdrop-blur-md">
            <div className="flex justify-between text-xs text-emerald-100 font-semibold">
              <span className="flex items-center gap-1"><Luggage className="w-3.5 h-3.5" /> Progress</span>
              <span>{packedCount} of {items.length} items ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950/40 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-300 ease-out rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500/50 text-rose-200 p-4 rounded-xl text-sm flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-300">Supabase Error Detected</p>
              <p className="text-xs text-rose-200/90 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Updated Input Form */}
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add new gear..."
            className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            disabled={isSubmitting}
          />
          <input
            type="text"
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            placeholder="Who's packing it?"
            className="w-full sm:w-40 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newItemName.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold px-5 py-3 sm:py-0 rounded-xl flex items-center justify-center gap-1.5 text-sm transition-all active:scale-95 shadow-md shadow-emerald-500/10"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        {/* Packing List */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm space-y-2">
          {isLoading ? (
            <div className="text-center py-8 text-slate-500 text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Loading items from Supabase...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No items in database yet. Add your first item above!
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${item.is_packed ? 'bg-slate-950/40 border-slate-800/50 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-200'}`}>
                <div onClick={() => togglePacked(item.id, item.is_packed)} className="flex items-center space-x-3 cursor-pointer flex-1 overflow-hidden">
                  {item.is_packed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400 shrink-0" />}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 truncate">
                    <span className={`text-sm truncate ${item.is_packed ? 'line-through' : 'font-medium'}`}>
                      {item.item_name}
                    </span>
                    {/* Display the assignee if it exists */}
                    {item.assigned_to && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 w-fit">
                        <User className="w-3 h-3" /> {item.assigned_to}
                      </span>
                    )}
                  </div>
                </div>

                <button onClick={() => deleteItem(item.id)} className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg transition-colors shrink-0" title="Delete item">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}