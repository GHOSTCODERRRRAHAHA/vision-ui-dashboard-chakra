import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  checkTokenInUrl, 
  getUser, 
  isAuthenticated, 
  loginWithToken, 
  logout as logoutUser,
  verifyAndStoreUser,
  checkForAuthToken
} from '../utils/authBridge';
import supabase, { getUserProfile, getUserMembership } from '../utils/supabaseClient';

// Create the context
const AuthContext = createContext();

// Hook to use the context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // First check if there's an active session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // If we have a session, get the user profile
          const userId = session.user.id;
          const profile = await getUserProfile(userId);
          const membership = await getUserMembership(userId);
          
          const userData = {
            id: userId,
            email: session.user.email,
            name: profile?.full_name || session.user.email,
            avatar: profile?.avatar_url,
            membership
          };
          
          setUser(userData);
          setAuthenticated(true);
        } 
        // If no Supabase session, check for token in URL or localStorage
        else {
          const urlToken = await checkForAuthToken();
          
          if (urlToken) {
            setUser(urlToken);
            setAuthenticated(true);
          } 
          else if (isAuthenticated()) {
            const token = localStorage.getItem('clarityx_auth_token');
            const existingUser = await verifyAndStoreUser(token);
            
            if (existingUser) {
              setUser(existingUser);
              setAuthenticated(true);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Set up auth state listener for Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // User signed in via Supabase
          const userId = session.user.id;
          const profile = await getUserProfile(userId);
          const membership = await getUserMembership(userId);
          
          const userData = {
            id: userId,
            email: session.user.email,
            name: profile?.full_name || session.user.email,
            avatar: profile?.avatar_url,
            membership
          };
          
          setUser(userData);
          setAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          // User signed out via Supabase
          setUser(null);
          setAuthenticated(false);
        }
      }
    );
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function - handle both token and direct Supabase login
  const login = async (emailOrToken, password = null) => {
    setLoading(true);
    try {
      // If password is provided, attempt Supabase email login
      if (password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailOrToken,
          password
        });
        
        if (error) throw error;
        
        // User will be set via the auth state change listener
        return true;
      } 
      // Otherwise treat as token login
      else {
        const success = await loginWithToken(emailOrToken);
        if (success) {
          const userData = getUser();
          setUser(userData);
          setAuthenticated(true);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function - handle both methods
  const logout = async () => {
    setLoading(true);
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Also sign out from our token-based system
      await logoutUser();
      
      // Clear state
      setUser(null);
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Value provided by the context
  const value = {
    user,
    authenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 