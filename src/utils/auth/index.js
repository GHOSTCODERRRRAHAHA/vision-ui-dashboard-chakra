// Export everything from the shared auth module
export * from './auth-service';
export * from './auth-context';
export * from './client';

// Re-export default exports
import authService from './auth-service';
import { AuthProvider, useAuth } from './auth-context';
import getSupabaseClient, { createSupabaseClient } from './client';

export {
  authService,
  AuthProvider,
  useAuth,
  getSupabaseClient,
  createSupabaseClient
};

// Default export the most commonly used items
export default {
  authService,
  AuthProvider,
  useAuth
}; 