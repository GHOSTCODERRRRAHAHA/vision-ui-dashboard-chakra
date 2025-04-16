/**
 * Auth Bridge Utility
 * Handles authentication synchronization between the ClarityX app and website
 */
import api from '../services/api';

// Local storage keys
const TOKEN_KEY = 'clarityx_auth_token';
const USER_KEY = 'clarityx_user';

/**
 * Checks if a token exists in URL parameters
 * This can be used when redirecting from the website to the app
 */
export const checkTokenInUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('auth_token') || urlParams.get('token');
  
  if (token) {
    // Store token and verify it
    localStorage.setItem(TOKEN_KEY, token);
    verifyAndStoreUser(token);
    
    // Clean URL by removing the token parameter
    const newUrl = window.location.pathname + 
      (urlParams.size > 1 ? '?' + urlParams.toString() : '');
    window.history.replaceState({}, document.title, newUrl);
    
    return true;
  }
  
  return false;
};

/**
 * Automatically checks for auth token on app startup
 * This integrates the website authentication with the app
 */
export const checkForAuthToken = async () => {
  try {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('auth_token') || urlParams.get('token');
    
    if (token) {
      // Verify and store the token
      const response = await api.websiteAuth.verifyToken(token);
      
      if (response && response.user) {
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        
        // Clean URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        
        return response.user;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to verify website token', error);
    return null;
  }
};

/**
 * Verifies a token with the backend and stores user data if valid
 */
export const verifyAndStoreUser = async (token) => {
  try {
    const response = await api.websiteAuth.verifyToken(token);
    
    if (response && response.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      return response.user;
    }
    
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

/**
 * Gets the current auth token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Gets the current user data
 */
export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Checks if the user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Logs the user in with a token from the website
 */
export const loginWithToken = async (token) => {
  try {
    const response = await api.websiteAuth.login(token);
    
    if (response && response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      
      if (response.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login with token failed:', error);
    return false;
  }
};

/**
 * Logs the user out
 */
export const logout = async () => {
  try {
    await api.websiteAuth.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage, even if API call fails
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}; 