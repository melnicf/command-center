// Auth store with Zustand - manages user authentication state

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, LoginCredentials, SignUpCredentials, AuthError } from '@/types/user';
import { authService } from '@/services/auth';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  _hasHydrated: boolean;
  error: AuthError | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signUp: (credentials: SignUpCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  initialize: () => Promise<void>;
  setHasHydrated: (state: boolean) => void;
  updateUser: (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      isInitialized: false,
      _hasHydrated: false,
      error: null,

      // Set hydration state
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      // Login action
      login: async (credentials: LoginCredentials): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(credentials);
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err) {
          const error = err as AuthError;
          set({
            user: null,
            token: null,
            isLoading: false,
            error: {
              code: error.code || 'LOGIN_FAILED',
              message: error.message || 'Failed to login. Please try again.',
            },
          });
          return false;
        }
      },

      // Sign up action
      signUp: async (credentials: SignUpCredentials): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.signUp(credentials);
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (err) {
          const error = err as AuthError;
          set({
            user: null,
            token: null,
            isLoading: false,
            error: {
              code: error.code || 'SIGNUP_FAILED',
              message: error.message || 'Failed to create account. Please try again.',
            },
          });
          return false;
        }
      },

      // Logout action
      logout: async (): Promise<void> => {
        set({ isLoading: true });

        try {
          await authService.logout();
        } finally {
          set({
            user: null,
            token: null,
            isLoading: false,
            error: null,
          });
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Update user profile
      updateUser: (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              ...updates,
            },
          });
        }
      },

      // Initialize auth state from persisted token
      initialize: async (): Promise<void> => {
        const { token, user, isInitialized, _hasHydrated } = get();

        // Skip if already initialized
        if (isInitialized) return;

        // Wait for hydration if not yet hydrated
        if (!_hasHydrated) {
          // Small delay to allow hydration to complete
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Re-check state after potential hydration
        const currentState = get();
        
        // If we have a user from hydration, we're good
        if (currentState.user) {
          set({ isInitialized: true });
          return;
        }

        // If we have a token, validate it
        if (currentState.token) {
          set({ isLoading: true });

          try {
            const validatedUser = await authService.validateToken(currentState.token);
            if (validatedUser) {
              set({ user: validatedUser, isLoading: false, isInitialized: true });
            } else {
              // Token is invalid or expired
              set({ user: null, token: null, isLoading: false, isInitialized: true });
            }
          } catch {
            set({ user: null, token: null, isLoading: false, isInitialized: true });
          }
        } else {
          set({ isInitialized: true });
        }
      },
    }),
    {
      name: 'invnt-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Selector hooks for common patterns
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAuthHydrated = () => useAuthStore((state) => state._hasHydrated);
