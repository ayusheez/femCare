import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ClusterVisual from '@/components/ClusterVisual';
import ProfileSection from '@/components/ProfileSection';
import Recommendations from '@/components/recommendations/Recommendations';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);

  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function () {});
      });
    };
  }, []);

  const handleProfileUpdate = (data: any) => {
    setProfileData(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ClusterVisual />
        <ProfileSection onProfileUpdate={handleProfileUpdate} />
        <Recommendations profileData={profileData} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
