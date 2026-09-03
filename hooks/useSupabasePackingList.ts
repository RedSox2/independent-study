import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PackingItem } from '@/types';

export function useSupabasePackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
    const channel = supabase
      .channel('packing_items_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'packing_items' }, () => fetchItems())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchItems = async () => {
    try {
      setErrorMsg(null);
      const { data, error } = await supabase
        .from('packing_items')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      if (data) setItems(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch items');
    } finally {
      setIsLoading(false);
    }
  };

  // Updated to accept category parameter
  const addItem = async (itemName: string, assignedTo: string, category: string): Promise<boolean> => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase
        .from('packing_items')
        .insert([{ 
          item_name: itemName, 
          is_packed: false, 
          assigned_to: assignedTo || null,
          category: category || null // Saves category or null if blank
        }])
        .select();

      if (error) throw error;
      if (data) {
        setItems((prev) => [...prev, ...data]);
      } else {
        await fetchItems();
      }
      return true;
    } catch (err: any) {
      setErrorMsg(`Add failed: ${err.message}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePacked = async (id: string | number, currentStatus: boolean) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, is_packed: !currentStatus } : item)));
    try {
      const { error } = await supabase.from('packing_items').update({ is_packed: !currentStatus }).eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, is_packed: currentStatus } : item)));
    }
  };

  const deleteItem = async (id: string | number) => {
    const originalItems = [...items];
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      const { error } = await supabase.from('packing_items').delete().eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      setItems(originalItems);
    }
  };

  const packedCount = items.filter((i) => i.is_packed).length;
  const progressPercent = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  return { items, errorMsg, isLoading, isSubmitting, fetchItems, addItem, togglePacked, deleteItem, packedCount, progressPercent };
}