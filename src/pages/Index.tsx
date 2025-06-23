
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import VisionSection from '@/components/VisionSection';
import TimelineSection from '@/components/TimelineSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with the section-fade-in class
    const fadeElements = document.querySelectorAll('.section-fade-in');
    fadeElements.forEach(el => observer.observe(el));

    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <VisionSection />
        <TimelineSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
