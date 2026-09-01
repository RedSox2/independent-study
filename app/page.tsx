'use client';

import { useState } from 'react';
import { Tent, CheckCircle2, Circle, Plus, Luggage, MapPin, Utensils, DollarSign, Trash2 } from 'lucide-react';
import { Category, TabType } from '@/types';
import { usePackingList } from '@/hooks/usePackingList';

export default function Home() {
  const { items, addItem, togglePacked, deleteItem, packedCount, progressPercent } = usePackingList();

  const [newItemName, setNewItemName] = useState('');
  const [category, setCategory] = useState<Category>('Gear');
  const [assignedTo, setAssignedTo] = useState('Alex');
  const [activeTab, setActiveTab] = useState<TabType>('packing');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    addItem(newItemName, category, assignedTo);
    setNewItemName('');
  };

  return (
    <div className="page-container">
      <div className="page-wrapper">
        
        {/* Header Card */}
        <div className="header-card">
          <div className="header-blur-bg" />
          
          <div className="header-top">
            <div className="flex items-center space-x-4">
              <div className="header-icon-box">
                <Tent className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="header-badge">Senior Road Trip 🌲</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Yosemite Expedition</h1>
                <p className="header-subtext">
                  <MapPin className="w-3.5 h-3.5 text-emerald-200" /> July 14–18 • 4 Travelers
                </p>
              </div>
            </div>

            {/* Avatar Group */}
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="avatar-initial bg-amber-500 text-slate-950">AL</span>
                <span className="avatar-initial bg-indigo-500 text-white">SM</span>
                <span className="avatar-initial bg-rose-500 text-white">JD</span>
                <span className="avatar-initial bg-cyan-500 text-slate-950">TY</span>
              </div>
              <button className="invite-btn">+ Invite</button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="progress-card">
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-emerald-100">
              <span className="flex items-center gap-1.5">
                <Luggage className="w-4 h-4 text-emerald-300" /> Packing Status
              </span>
              <span>{packedCount} of {items.length} packed ({progressPercent}%)</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button
            onClick={() => setActiveTab('packing')}
            className={`tab-btn ${activeTab === 'packing' ? 'tab-btn-active' : ''}`}
          >
            <Luggage className="w-4 h-4" /> Gear & Packing
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`tab-btn ${activeTab === 'meals' ? 'tab-btn-active' : ''}`}
          >
            <Utensils className="w-4 h-4" /> Meals & Grocery
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`tab-btn ${activeTab === 'costs' ? 'tab-btn-active' : ''}`}
          >
            <DollarSign className="w-4 h-4" /> Split Costs
          </button>
        </div>

        {/* Tab 1: Packing List */}
        {activeTab === 'packing' && (
          <div className="space-y-4">
            {/* Add Item Form */}
            <form onSubmit={handleFormSubmit} className="form-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Add item (e.g., Portable Charger, First Aid Kit)..."
                  className="input-field"
                />
                <button type="submit" className="primary-btn">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Category:</span>
                  {(['Gear', 'Food', 'Supplies'] as Category[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`category-chip ${category === cat ? 'category-chip-active' : ''}`}
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
                    className="select-field"
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
            <div className="items-card">
              {items.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  Your packing list is empty. Add an item above to get started!
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className={`list-item ${item.isPacked ? 'list-item-packed' : ''}`}>
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
                          <span className="category-tag">{item.category}</span>
                          <span className="text-xs text-slate-400">
                            Assigned to: <strong className="text-slate-300">{item.assignedTo}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="delete-btn"
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
          <div className="placeholder-card">
            <Utensils className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold">Trip Meal Planner</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Plan daily breakfasts, cookout dinners, dietary preferences, and auto-generated grocery shopping lists.
            </p>
          </div>
        )}

        {/* Tab 3: Split Costs Placeholder */}
        {activeTab === 'costs' && (
          <div className="placeholder-card">
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