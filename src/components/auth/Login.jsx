// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, Package, ArrowRight, Sparkles } from 'lucide-react';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        updateUser(result.user);
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@parceltrack.com', password: 'admin123', role: 'Admin', icon: '👨‍💼' },
    { email: 'user@parceltrack.com', password: 'user123', role: 'User', icon: '👤' }
  ];

  const fillDemoAccount = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background with Unsplash */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 animate-slowZoom"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80"></div>
      </div>
      
      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 50, 0],
            y: [0, 80, -50, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, 60, -60, 0],
            y: [0, 100, 50, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex p-4 bg-white/10 backdrop-blur-xl rounded-2xl mb-4 border border-white/20"
            >
              <Package className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              ParcelTrack
            </h1>
            <p className="text-purple-200/80 text-sm">Login to your account</p>
          </motion.div>

          {/* Login Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white">Welcome Back</h2>
                <p className="text-xs text-purple-200/80">Sign in to continue</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-purple-300/50 group-focus-within:text-purple-300 transition-colors" />
                  <input
                    type="email"
                    placeholder="admin@parceltrack.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/30 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-purple-300/50 group-focus-within:text-purple-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 bg-white/5 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/30 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-purple-300/50 hover:text-purple-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm flex items-center gap-2"
                  >
                    <span>⚠️</span> {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-purple-200 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 pt-4 border-t border-purple-500/20">
              <p className="text-xs text-purple-200 text-center mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3" /> Demo Accounts <Sparkles className="w-3 h-3" />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map((demo, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fillDemoAccount(demo.email, demo.password)}
                    className="p-3 bg-white/5 border border-purple-500/20 rounded-xl hover:bg-white/10 transition-all text-center group"
                  >
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{demo.icon}</div>
                    <p className="text-sm font-semibold text-white">{demo.role}</p>
                    <p className="text-xs text-purple-200/70 truncate">{demo.email}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-purple-200">
                Don't have an account?{' '}
                <Link to="/register" className="text-white font-semibold hover:underline inline-flex items-center gap-1 group">
                  Sign up 
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slowZoom {
          animation: slowZoom 20s ease-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Login;