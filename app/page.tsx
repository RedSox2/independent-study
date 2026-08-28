'use client';

import { useState } from 'react';
import { Tent, CheckCircle2, Circle, Plus, Luggage, Users, MapPin, Utensils, DollarSign, Trash2, ShieldAlert } from 'lucide-react';

interface PackingItem {
  id: number;
  name: string;
  category: 'Gear' | 'Food' | 'Supplies';
  isPacked: boolean;
  assignedTo: string;
}

export default function Home() {
  const [items, setItems] = useState<PackingItem[]>([
    { id: 1, name: '4-Person Camping Tent', category: 'Gear', isPacked: true, assignedTo: 'Alex' },
    { id: 2, name: 'Sleeping Bags (x4)', category: 'Gear', isPacked: false, assignedTo: 'Sam' },
    { id: 3, name: 'S\'mores Kit & Marshmallows', category: 'Food', isPacked: false, assignedTo: 'Jordan' },
    { id: 4, name: 'Portable Camp Stove', category: 'Supplies', isPacked: true, assignedTo: 'Taylor' },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [category, setCategory] = useState<'Gear' | 'Food' | 'Supplies'>('Gear');
  const [assignedTo, setAssignedTo] = useState('Alex');
  const [activeTab, setActiveTab] = useState<'packing' | 'meals' | 'costs'>('packing');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: Date.now(),
      name: newItemName,
      category,
      isPacked: false,
      assignedTo,
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const togglePacked = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, isPacked: !item.isPacked } : item));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const packedCount = items.filter(i => i.isPacked).length;
  const progressPercent = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md shadow-inner">
                <Tent className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="inline-block bg-emerald-950/40 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-semibold mb-1 backdrop-blur-sm">
                  Senior Road Trip 🌲
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Yosemite Expedition</h1>
                <p className="text-emerald-100/80 text-xs sm:text-sm flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-200" /> July 14–18 • 4 Travelers
                </p>
              </div>
            </div>

            {/* Avatar Group */}
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="w-9 h-9 rounded-full bg-amber-500 border-2 border-emerald-700 flex items-center justify-center text-xs font-bold text-slate-950">AL</span>
                <span className="w-9 h-9 rounded-full bg-indigo-500 border-2 border-emerald-700 flex items-center justify-center text-xs font-bold text-white">SM</span>
                <span className="w-9 h-9 rounded-full bg-rose-500 border-2 border-emerald-700 flex items-center justify-center text-xs font-bold text-white">JD</span>
                <span className="w-9 h-9 rounded-full bg-cyan-500 border-2 border-emerald-700 flex items-center justify-center text-xs font-bold text-slate-950">TY</span>
              </div>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-xs font-semibold">
                + Invite
              </button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2 bg-black/20 p-4 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-emerald-100">
              <span className="flex items-center gap-1.5">
                <Luggage className="w-4 h-4 text-emerald-300" /> Packing Status
              </span>
              <span>{packedCount} of {items.length} packed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-950/40 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-200 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('packing')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'packing' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Luggage className="w-4 h-4" /> Gear & Packing
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'meals' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Utensils className="w-4 h-4" /> Meals & Grocery
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'costs' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Split Costs
          </button>
        </div>

        {/* Tab 1: Packing List */}
        {activeTab === 'packing' && (
          <div className="space-y-4">
            {/* Add Item Form */}
            <form onSubmit={addItem} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Add item (e.g., Portable Charger, First Aid Kit)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 rounded-xl flex items-center gap-1 text-sm transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Category:</span>
                  {(['Gear', 'Food', 'Supplies'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1 rounded-lg border transition-all ${
                        category === cat
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Bring by:</span>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Alex">Alex</option>
                    <option value="Sam">Sam</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Taylor">Taylor</option>
                  </select>
                </div>
              </div>
            </form>

            {/* Packing List Display */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm space-y-2">
              {items.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  Your packing list is empty. Add an item above to get started!
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      item.isPacked
                        ? 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div 
                      onClick={() => togglePacked(item.id)}
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      {item.isPacked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 flex-shrink-0 hover:text-slate-400" />
                      )}
                      <div>
                        <p className={`text-sm ${item.isPacked ? 'line-through text-slate-500' : 'font-medium'}`}>
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-400">Assigned to: <strong className="text-slate-300">{item.assignedTo}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Meals Placeholder */}
        {activeTab === 'meals' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <Utensils className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold">Trip Meal Planner</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Plan daily breakfasts, cookout dinners, dietary preferences, and auto-generated grocery shopping lists.
            </p>
          </div>
        )}

        {/* Tab 3: Split Costs Placeholder */}
        {activeTab === 'costs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <DollarSign className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold">Expense Splitter</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Log gas receipts, campsite fees, and snack runs. Automatically calculates who owes whom at the end of the trip.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}