// app/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkAuthStatus();
    
    // Listen for storage changes (if login happens in another tab)
    window.addEventListener('storage', checkAuthStatus);

    const tl = gsap.timeline();
    
    // Main title animation
    tl.fromTo('.hero-main-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    )
    // Subtitle animation
    .fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.8'
    )
    // Button animations
    .fromTo('.hero-button',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.2 },
      '-=0.5'
    )
    // Stats animation
    .fromTo('.stat-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15 },
      '-=0.3'
    );

    // Floating animation for blood drops
    gsap.to('.blood-drop', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden pt-16"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 blood-drop w-4 h-6 bg-red-200 rounded-full opacity-60"></div>
          <div className="absolute top-40 right-20 blood-drop w-3 h-5 bg-red-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 blood-drop w-5 h-7 bg-red-400 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-10 blood-drop w-4 h-6 bg-red-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 right-1/3 blood-drop w-3 h-5 bg-red-600 rounded-full opacity-25"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Main Title */}
          <h1 
            className="hero-main-title text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 leading-tight"
          >
            <span className="block">
              <span className="text-red-600">Donate</span> Blood,
            </span>
            <span className="block mt-2">
              Keep the World
            </span>
            <span className="block mt-2 text-red-600">
              Beating
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of heroes in our mission to save lives. 
            Your single donation can make a heartbeat continue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href={isLoggedIn ? "/dashboard" : "/auth/register"}
              className="hero-button bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Saving Lives
            </Link>
            
            <Link 
              href="/find-donor"
              className="hero-button border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Find a Donor
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: 'Lives Saved', icon: '❤️' },
              { number: '5K+', label: 'Active Donors', icon: '🩸' },
              { number: '100+', label: 'Blood Drives', icon: '🏥' },
              { number: '50+', label: 'Cities', icon: '🌍' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="stat-item p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-red-100 hover:border-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-2xl mb-2">
                  {stat.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-red-600 mb-1">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-red-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why <span className="text-red-600">Donate Blood</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your donation is more than just blood - it's a second chance at life for someone in need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: '💪',
                title: 'Save Lives',
                description: 'A single donation can save up to 3 lives. Be someone\'s hero today.'
              },
              {
                icon: '🏥',
                title: 'Health Benefits',
                description: 'Regular donation helps maintain healthy iron levels and reduces cardiovascular risk.'
              },
              {
                icon: '👥',
                title: 'Community Impact',
                description: 'Join a community of donors making a real difference in people\'s lives.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100 hover:border-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Emergency Need for Blood?
          </h2>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Every second counts. Find donors near you instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/emergency"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚨 Emergency Request
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
            >
              📞 Contact Help Line
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}