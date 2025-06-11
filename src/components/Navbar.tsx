
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import NavbarThemeToggle from './NavbarThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-fem-dark/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fem-primary to-fem-accent flex items-center justify-center">
              <span className="text-white font-semibold">FC</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">FemCare</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-fem-dark/80 dark:text-white/80 hover:text-fem-primary transition-colors">
            Features
          </a>
          <a href="#clusters" className="text-sm font-medium text-fem-dark/80 dark:text-white/80 hover:text-fem-primary transition-colors">
            Clusters
          </a>
          <a href="#profile" className="text-sm font-medium text-fem-dark/80 dark:text-white/80 hover:text-fem-primary transition-colors">
            Profile
          </a>
          <a href="#recommendations" className="text-sm font-medium text-fem-dark/80 dark:text-white/80 hover:text-fem-primary transition-colors">
            Recommendations
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
          <NavbarThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <NavbarThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-fem-dark dark:text-white" />
            ) : (
              <Menu size={24} className="text-fem-dark dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute inset-x-0 top-full glass dark:glass-dark border-t border-gray-200 dark:border-gray-800 transition-all duration-300 transform ease-in-out',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="px-4 py-2 text-sm font-medium text-fem-dark/80 hover:text-fem-primary hover:bg-fem-light rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#clusters"
              className="px-4 py-2 text-sm font-medium text-fem-dark/80 hover:text-fem-primary hover:bg-fem-light rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clusters
            </a>
            <a
              href="#profile"
              className="px-4 py-2 text-sm font-medium text-fem-dark/80 hover:text-fem-primary hover:bg-fem-light rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </a>
            <a
              href="#recommendations"
              className="px-4 py-2 text-sm font-medium text-fem-dark/80 hover:text-fem-primary hover:bg-fem-light rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recommendations
            </a>
          </nav>

          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            <Button variant="outline" fullWidth>
              Sign In
            </Button>
            <Button fullWidth>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
