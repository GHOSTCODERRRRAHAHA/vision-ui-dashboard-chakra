import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: window.localStorage
  }
});

// Helper to get user profile from Supabase
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Helper to get membership details from Supabase
export const getUserMembership = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    
    // Process membership features
    let features = ['Basic fact-checking'];
    
    if (data.type === 'Premium') {
      features = [
        'Advanced fact-checking',
        'Unlimited scans',
        'Priority support',
        'Custom reports',
        'AI-powered insights'
      ];
    } else if (data.type === 'Pro') {
      features = [
        'Advanced fact-checking',
        'Daily scan limit: 50',
        'Standard support',
        'Basic reports'
      ];
    } else {
      features = [
        'Basic fact-checking',
        'Daily scan limit: 10',
        'Community support'
      ];
    }
    
    return {
      ...data,
      features
    };
  } catch (error) {
    console.error('Error fetching user membership:', error);
    return {
      type: 'Free',
      since: new Date().toLocaleDateString(),
      features: [
        'Basic fact-checking',
        'Daily scan limit: 10',
        'Community support'
      ]
    };
  }
};

export default supabase; 