import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './auth-service';

// Type definition for the context value
const AuthContext = createContext(undefined);

/**
 * Authentication provider component for React applications
 * Can be used in website, electron app with React, or browser extension with React
 */
export const AuthProvider = ({ 
  children,
  onAuthStateChange
}) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        const newUser = session?.user ?? null;
        setUser(newUser);
        
        // Call the optional callback
        if (onAuthStateChange) {
          onAuthStateChange(newUser);
        }
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { session, error } = await authService.getSession();
        console.log("Initial session check:", session ? "Session found" : "No session");
        
        if (error) {
          console.error("Error getting session:", error);
          setSession(null);
          setUser(null);
          setProfile(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Call the optional callback
          if (onAuthStateChange && session?.user) {
            onAuthStateChange(session.user);
          }
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [onAuthStateChange]);

  const fetchProfile = async (userId) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { profile, error } = await authService.getProfile(userId);

      if (error) {
        console.error('Error fetching profile:', error);
        
        // If profile doesn't exist, create it
        if (error.message && error.message.includes('does not exist')) {
          return createProfile(userId);
        }
        throw error;
      }
      
      setProfile(profile);
      console.log("Profile fetched:", profile);
    } catch (error) {
      console.error('Error in profile flow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (userId) => {
    try {
      console.log("Creating new profile for user:", userId);
      const userData = user?.user_metadata;
      
      // Get email from user object
      const email = user?.email || '';
      const fullName = userData?.full_name || userData?.name || '';
      const avatarUrl = userData?.avatar_url || null;

      const { profile, error } = await authService.createProfile(
        userId, 
        email, 
        fullName, 
        avatarUrl
      );

      if (error) throw error;

      console.log("Profile created:", profile);
      setProfile(profile);
      return profile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  // Wrap authentication service methods
  const signOut = async () => {
    try {
      console.log('AuthContext: Starting sign out...');
      
      // Clear state immediately for faster UI response
      setSession(null);
      setUser(null);
      setProfile(null);
      
      // Then perform the actual sign out
      const { error } = await authService.signOut();
      if (error) {
        console.error('AuthContext: Supabase sign out error:', error);
        throw error;
      }
      
      console.log('AuthContext: Sign out successful');
    } catch (error) {
      console.error('AuthContext: Error during sign out:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    
    try {
      const { profile, error } = await authService.updateProfile(user.id, updates);
      
      if (error) throw error;
      
      setProfile(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const { error } = await authService.signUp(email, password);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { error } = await authService.signIn(email, password);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signInWithGoogleAuth = async () => {
    try {
      const { data, error } = await authService.signInWithGoogle();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Create the context value object
  const value = {
    session,
    user,
    profile,
    isLoading,
    signOut,
    updateProfile,
    signUp,
    signIn,
    signInWithGoogleAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 * This can be used in any React component in any of your platforms
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default { AuthProvider, useAuth }; 