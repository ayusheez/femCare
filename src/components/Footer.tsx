import React from 'react';
import { Facebook, Heart, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-fem-light pt-16 pb-8 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fem-primary to-fem-accent flex items-center justify-center">
                <span className="text-white font-semibold">FC</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">FemCare</span>
            </div>
            <p className="text-sm text-fem-dark/70 mb-4">
              Data-driven healthcare solutions designed specifically for women's unique health needs.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-fem-dark/60 hover:text-fem-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-fem-dark/60 hover:text-fem-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-fem-dark/60 hover:text-fem-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-fem-dark/60 hover:text-fem-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-fem-dark">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Clusters</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Recommendations</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Research</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-fem-dark">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Press</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Partners</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold mb-4 text-fem-dark">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-fem-dark/70 hover:text-fem-primary transition-colors">Data Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-fem-soft/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-fem-dark/60">
            © {currentYear} FemCare. All rights reserved.
          </div>
          
          <div className="flex items-center text-sm text-fem-dark/60">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-fem-primary" />
            <span>for women's health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
