import React, { useState, useEffect } from 'react';
import { Wrench, Code, Rocket, Clock, Home, Sparkles } from 'lucide-react';

export default function WorkInProgress() {
  const [dots, setDots] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '10%'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            bottom: '10%',
            right: '10%',
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-cyan-500 opacity-20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            top: '50%',
            left: '50%',
            animationDelay: '2s'
          }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 lg:p-16 transform hover:scale-[1.02] transition-all duration-500">
          
          {/* Sparkle decoration */}
          <div className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-pink-500 p-3 rounded-2xl rotate-12 animate-bounce shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          {/* Icon Grid with glow effect */}
          <div className="flex justify-center gap-6 mb-10 flex-wrap">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl animate-bounce shadow-xl">
                <Wrench className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-5 rounded-2xl animate-bounce shadow-xl" style={{animationDelay: '0.2s'}}>
                <Code className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="relative bg-gradient-to-br from-pink-500 to-cyan-500 p-5 rounded-2xl animate-bounce shadow-xl" style={{animationDelay: '0.4s'}}>
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading with gradient text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse leading-tight">
            We Are Working On It{dots}
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 text-center mb-10 max-w-2xl mx-auto font-light">
            Our team is crafting something <span className="font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">extraordinary</span> for you. Stay tuned!
          </p>

          {/* Progress Bar with glow */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/80">Progress</span>
              <span className="text-sm font-bold text-cyan-400">55%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/20">
              <div className="relative h-4 rounded-full overflow-hidden" style={{ width: '55%' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Features Grid with glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Coming Soon</h3>
              <p className="text-sm text-white/70">Expected launch in a few days</p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Better Features</h3>
              <p className="text-sm text-white/70">Enhanced user experience</p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:border-pink-400/50 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Faster Performance</h3>
              <p className="text-sm text-white/70">Optimized for speed</p>
            </div>
          </div>

          {/* Email Notification Form */}
          <div className="max-w-md mx-auto mb-8">
            <p className="text-center text-white font-semibold mb-4 text-lg">Get notified when we launch</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all"
              />
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <span className="relative z-10">Notify Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>

          {/* Footer with Home Button */}
          <div className="mt-12 text-center">
            <a 
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Go to Home Page
            </a>
            <p className="mt-8 text-white/60 text-sm">Thank you for your patience! ❤️</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}