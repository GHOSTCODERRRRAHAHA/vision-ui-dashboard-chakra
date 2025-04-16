import getSupabaseClient from './client';

/**
 * Shared authentication service - can be used across website, desktop app, and extension
 */
export class AuthService {
  constructor() {
    this.supabase = getSupabaseClient();
  }
  
  /**
   * Sign in with email/password
   */
  async signIn(email, password) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { data, error };
    } catch (error) {
      return { error };
    }
  }
  
  /**
   * Sign up with email/password
   */
  async signUp(email, password, redirectTo) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`
        }
      });
      
      return { data, error };
    } catch (error) {
      return { error };
    }
  }
  
  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle(redirectTo) {
    try {
      // Get current origin for dynamic redirect
      const origin = window.location.origin;
      const redirectUrl = redirectTo || `${origin}/auth/callback`;
      
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          skipBrowserRedirect: false
        }
      });

      if (error) {
        console.error('Google OAuth error:', error);
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
  
  /**
   * Sign out the current user
   */
  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  }
  
  /**
   * Get the current session
   */
  async getSession() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      return { session: data.session, error };
    } catch (error) {
      return { session: null, error };
    }
  }
  
  /**
   * Get the current user
   */
  async getUser() {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      return { user: data.user, error };
    } catch (error) {
      return { user: null, error };
    }
  }
  
  /**
   * Fetch the user's profile from the database
   */
  async getProfile(userId) {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      return { profile: data, error: null };
    } catch (error) {
      return { profile: null, error };
    }
  }
  
  /**
   * Create a profile for a new user
   */
  async createProfile(
    userId, 
    email, 
    fullName = '', 
    avatarUrl = null
  ) {
    try {
      const newProfile = {
        id: userId,
        email,
        full_name: fullName,
        subscription_tier: 'free',
        subscription_status: 'inactive',
        avatar_url: avatarUrl,
      };
      
      const { data, error } = await this.supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();
        
      if (error) throw error;
      
      return { profile: data, error: null };
    } catch (error) {
      return { profile: null, error };
    }
  }
  
  /**
   * Update a user's profile
   */
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
        
      if (error) throw error;
      
      return { profile: data, error: null };
    } catch (error) {
      return { profile: null, error };
    }
  }
  
  /**
   * Set up auth state change listener
   */
  onAuthStateChange(callback) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
  
  /**
   * Exchange OAuth code for session (used in auth callback)
   */
  async exchangeCodeForSession(code) {
    try {
      const { data, error } = await this.supabase.auth.exchangeCodeForSession(code);
      return { data, error };
    } catch (error) {
      return { error };
    }
  }
  
  /**
   * Refresh the current session
   */
  async refreshSession() {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      return { data, error };
    } catch (error) {
      return { error };
    }
  }
  
  /**
   * Get membership details from the database
   */
  async getUserMembership(userId) {
    try {
      const { data, error } = await this.supabase
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
  }
}

// Create and export a singleton instance
export const authService = new AuthService();

// Default export for convenient imports
export default authService; 