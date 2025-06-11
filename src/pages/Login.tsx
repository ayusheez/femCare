
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';
import Button from '@/components/Button';
import { Lock, Mail, User } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import NavbarThemeToggle from '@/components/NavbarThemeToggle';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || (!isLogin && !name)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }
    
    // Store user info in sessionStorage
    const userInfo = {
      email,
      name: isLogin ? email.split('@')[0] : name // Use part of email as name if login mode
    };
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // In a real app, we would authenticate with a backend here
    // For now, we'll just simulate authentication and proceed to the health journey
    toast({
      title: isLogin ? "Login Successful" : "Account Created",
      description: "Welcome to your personalized health journey.",
    });
    
    // Navigate to the health journey page
    navigate('/health-journey');
  };

  return (
    <div className="min-h-screen bg-fem-light dark:bg-fem-dark flex flex-col">
      <NavbarThemeToggle />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2 dark:text-white">
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </h2>
              <p className="text-fem-dark/70 dark:text-white/70">
                {isLogin 
                  ? 'Sign in to continue your health journey' 
                  : 'Create an account to start your personalized health experience'}
              </p>
            </div>
            
            <div className="glass dark:glass-dark rounded-xl p-8 border border-white/50 dark:border-white/10 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-white">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-fem-dark/50 dark:text-white/50" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-fem-soft dark:border-white/10 dark:bg-fem-dark/50 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-fem-primary"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-white">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-fem-dark/50 dark:text-white/50" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-fem-soft dark:border-white/10 dark:bg-fem-dark/50 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-fem-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-fem-dark/50 dark:text-white/50" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-fem-soft dark:border-white/10 dark:bg-fem-dark/50 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-fem-primary"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div>
                  <Button type="submit" fullWidth size="lg">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-fem-primary hover:text-fem-secondary text-sm font-medium transition-colors"
                >
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
