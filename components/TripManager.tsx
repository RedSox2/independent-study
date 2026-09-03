import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface Trip {
  id: string;
  name: string;
  collaborators: string[]; // Array of emails or user UUIDs
  created_at: string;
}

export function useTripManager(currentUserIdentifier: string | null) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Fetch trips for the logged-in user
  const fetchUserTrips = useCallback(async () => {
    if (!currentUserIdentifier) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .contains('collaborators', [currentUserIdentifier]); // Filter by user

      if (error) throw error;
      if (data) setTrips(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, [currentUserIdentifier]);

  useEffect(() => {
    fetchUserTrips();
  }, [fetchUserTrips]);

  // 2. Create a new trip
  const createTrip = async (name: string): Promise<Trip | null> => {
    if (!currentUserIdentifier) return null;

    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([
          {
            name,
            collaborators: [currentUserIdentifier], // Owner is automatically a collaborator
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTrips((prev) => [data, ...prev]);
        return data;
      }
      return null;
    } catch (err: any) {
      setErrorMsg(`Failed to create trip: ${err.message}`);
      return null;
    }
  };

  // 3. Add a collaborator to an existing trip
  const addCollaborator = async (tripId: string, newCollaborator: string): Promise<boolean> => {
    try {
      const { data: trip, error: fetchError } = await supabase
        .from('trips')
        .select('collaborators')
        .eq('id', tripId)
        .single();

      if (fetchError || !trip) throw fetchError;

      // Avoid duplicates using a Set
      const updatedCollaborators = Array.from(
        new Set([...(trip.collaborators || []), newCollaborator])
      );

      const { error: updateError } = await supabase
        .from('trips')
        .update({ collaborators: updatedCollaborators })
        .eq('id', tripId);

      if (updateError) throw updateError;

      // Update local state to reflect changes instantly
      setTrips((prev) =>
        prev.map((t) => (t.id === tripId ? { ...t, collaborators: updatedCollaborators } : t))
      );

      return true;
    } catch (err: any) {
      setErrorMsg(`Failed to add collaborator: ${err.message}`);
      return false;
    }
  };

  return {
    trips,
    loading,
    errorMsg,
    fetchUserTrips,
    createTrip,
    addCollaborator,
  };
}
