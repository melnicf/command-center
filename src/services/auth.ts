// Mock authentication service with simulated delays

import type { 
  User, 
  LoginCredentials, 
  SignUpCredentials, 
  AuthResponse, 
  AuthError 
} from '@/types/user';

// Simulated network delay (ms)
const MOCK_DELAY = 1000;

// Storage key for persisted users
const USERS_STORAGE_KEY = 'invnt-mock-users';

// Hardcoded authorized user
const defaultUsers: Array<[string, { user: User; password: string }]> = [
  [
    'jkinney@invnt.com',
    {
      user: {
        id: '1',
        email: 'jkinney@invnt.com',
        firstName: 'J',
        lastName: 'Kinney',
        avatar: undefined,
        role: 'admin',
        createdAt: new Date('2024-01-01'),
      },
      password: 'demo1234!',
    },
  ],
];

// Initialize mock user database from localStorage or defaults
function initializeMockUsers(): Map<string, { user: User; password: string }> {
  const map = new Map<string, { user: User; password: string }>(defaultUsers);
  
  // Only run on client
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Array<[string, { user: User; password: string }]>;
        // Add stored users (will overwrite defaults if same email)
        parsed.forEach(([email, record]) => {
          // Convert createdAt back to Date object
          record.user.createdAt = new Date(record.user.createdAt);
          map.set(email, record);
        });
      }
    } catch (e) {
      console.warn('Failed to load mock users from localStorage:', e);
    }
  }
  
  return map;
}

// Save mock users to localStorage
function persistMockUsers(users: Map<string, { user: User; password: string }>): void {
  if (typeof window !== 'undefined') {
    try {
      const entries = Array.from(users.entries());
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn('Failed to save mock users to localStorage:', e);
    }
  }
}

// Mock user database (initialized lazily on client)
let mockUsers: Map<string, { user: User; password: string }> | null = null;

function getMockUsers(): Map<string, { user: User; password: string }> {
  if (!mockUsers) {
    mockUsers = initializeMockUsers();
  }
  return mockUsers;
}

// Generate a mock JWT token
function generateMockToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })
  );
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
}

// Simulate network delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(MOCK_DELAY);

    const users = getMockUsers();
    const userRecord = users.get(credentials.email.toLowerCase());

    if (!userRecord) {
      const error: AuthError = {
        code: 'USER_NOT_FOUND',
        message: 'No account found with this email address.',
      };
      throw error;
    }

    if (userRecord.password !== credentials.password) {
      const error: AuthError = {
        code: 'INVALID_PASSWORD',
        message: 'Incorrect password. Please try again.',
      };
      throw error;
    }

    const token = generateMockToken(userRecord.user.id);

    return {
      user: userRecord.user,
      token,
    };
  },

  /**
   * Sign up with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    await delay(MOCK_DELAY);

    const users = getMockUsers();
    const existingUser = users.get(credentials.email.toLowerCase());

    if (existingUser) {
      const error: AuthError = {
        code: 'EMAIL_EXISTS',
        message: 'An account with this email already exists.',
      };
      throw error;
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email: credentials.email.toLowerCase(),
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      avatar: undefined,
      role: 'member',
      createdAt: new Date(),
    };

    // Add to mock database
    users.set(credentials.email.toLowerCase(), {
      user: newUser,
      password: credentials.password,
    });

    // Persist to localStorage
    persistMockUsers(users);

    const token = generateMockToken(newUser.id);

    return {
      user: newUser,
      token,
    };
  },

  /**
   * Logout (clears token)
   */
  async logout(): Promise<void> {
    await delay(300);
    // In a real app, this would invalidate the token on the server
  },

  /**
   * Validate token and get user
   */
  async validateToken(token: string): Promise<User | null> {
    await delay(300);

    try {
      // Parse the mock JWT
      const [, payloadBase64] = token.split('.');
      const payload = JSON.parse(atob(payloadBase64));

      // Check if token is expired
      if (payload.exp < Date.now()) {
        return null;
      }

      // Find user by ID
      const users = getMockUsers();
      for (const [, record] of users) {
        if (record.user.id === payload.sub) {
          return record.user;
        }
      }

      return null;
    } catch {
      return null;
    }
  },

  /**
   * Get mock user for demo purposes
   */
  getDemoCredentials(): LoginCredentials {
    return {
      email: 'demo@invnt.com',
      password: 'demo123',
    };
  },
};

export default authService;
