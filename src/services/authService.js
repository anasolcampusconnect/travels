import { toast } from 'react-hot-toast';

// Mock Users Database
const USERS_KEY = 'parceltrack_users';
const CURRENT_USER_KEY = 'parceltrack_current_user';

// Initialize default users if not exists
const initializeUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    const defaultUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@parceltrack.com',
        password: 'admin123',
        role: 'admin',
        avatar: '👨‍💼',
        phone: '+91 98765 43210',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'John Doe',
        email: 'user@parceltrack.com',
        password: 'user123',
        role: 'user',
        avatar: '👤',
        phone: '+91 98765 43211',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'priya123',
        role: 'user',
        avatar: '👩',
        phone: '+91 98765 43212',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Set current user
const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Login function
export const login = async (email, password) => {
  initializeUsers();
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        toast.success(`Welcome back, ${user.name}!`);
        resolve({ success: true, user: userWithoutPassword });
      } else {
        toast.error('Invalid email or password');
        reject({ success: false, message: 'Invalid email or password' });
      }
    }, 800);
  });
};

// Register function
export const register = async (userData) => {
  initializeUsers();
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        toast.error('User already exists with this email');
        reject({ success: false, message: 'User already exists' });
        return;
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: 'user',
        avatar: '👤',
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      toast.success('Account created successfully!');
      resolve({ success: true, user: userWithoutPassword });
    }, 800);
  });
};

// Logout function
// Update the logout function in authService.js
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  // Dispatch storage event for other tabs
  window.dispatchEvent(new Event('storage'));
  toast.success('Logged out successfully');
};

// Forgot password
export const forgotPassword = async (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      const user = users.find(u => u.email === email);
      
      if (user) {
        // Simulate sending reset email
        toast.success(`Reset link sent to ${email}`);
        resolve({ success: true, message: 'Reset link sent to your email' });
      } else {
        toast.error('No account found with this email');
        reject({ success: false, message: 'Email not found' });
      }
    }, 800);
  });
};

// Reset password
export const resetPassword = async (email, newPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        toast.success('Password reset successfully');
        resolve({ success: true });
      } else {
        toast.error('Failed to reset password');
        reject({ success: false });
      }
    }, 800);
  });
};

// Update profile
export const updateProfile = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem(USERS_KEY));
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...userData };
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          
          const { password, ...updatedUser } = users[userIndex];
          setCurrentUser(updatedUser);
          toast.success('Profile updated successfully');
          resolve({ success: true, user: updatedUser });
        } else {
          reject({ success: false });
        }
      } else {
        reject({ success: false });
      }
    }, 800);
  });
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Get user role
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || 'guest';
};

// Get all users (admin only)
export const getAllUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  return users?.map(({ password, ...user }) => user) || [];
};

// Delete user (admin only)
export const deleteUser = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(USERS_KEY));
      const filteredUsers = users.filter(u => u.id !== userId);
      localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
      toast.success('User deleted successfully');
      resolve({ success: true });
    }, 800);
  });
};

initializeUsers();