import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xepnqkngtnndquygdcms.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_pzghTu9agPHQeMRpGr2rUQ_i1tjPbGM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth functions
export const signUp = async (email: string, password: string, userType: 'viajero' | 'propietario') => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType,
        },
      },
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error: any) {
    return null;
  }
};

// Properties CRUD
export const createProperty = async (property: any) => {
  try {
    const { data, error } = await supabase.from('properties').insert([property]).select();
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getProperties = async (filters?: any) => {
  try {
    let query = supabase.from('properties').select('*');
    
    if (filters?.country) {
      query = query.eq('country', filters.country);
    }
    if (filters?.minPrice && filters?.maxPrice) {
      query = query.gte('price', filters.minPrice).lte('price', filters.maxPrice);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserProperties = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', userId);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateProperty = async (id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
