import React, { useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video/Image Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1675537057530-312348c6caa2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGphY2tldHN8ZW58MHx8MHx8fDA%3D')`,
          filter: "brightness(1.5) contrast(1.0)",
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-16 z-10">
        
        {/* Main Content */}
        <div className="max-w-4xl text-center">
          
          {/* Subtitle */}
          <div className={`mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-amber-400 text-sm md:text-base font-semibold tracking-widest uppercase">
              ✨ Discover the Collection
            </p>
          </div>

          {/* Main Heading */}
          <div className={`mb-6 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              Luxury Fashion
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent animate-shimmer">
                Redefined
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-white/80 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Curated collections of premium fashion pieces from world-renowned designers. Elevate your wardrobe with sophistication and style.
            </p>
          </div>

          {/* Animated Divider */}
          <div className={`mb-12 flex justify-center transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/50 text-sm uppercase tracking-widest">Scroll to Explore</p>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-white/30 rounded-full animate-pulse animation-delay-1000" />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-amber-300/50 rounded-full animate-pulse animation-delay-500" />

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: -1000px 0;
          }
          50% {
            background-position: 1000px 0;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
          background-size: 1000px 100%;
        }

        .delay-200 {
          transition-delay: 200ms;
        }

        .delay-300 {
          transition-delay: 300ms;
        }

        .delay-400 {
          transition-delay: 400ms;
        }

        .delay-500 {
          transition-delay: 500ms;
        }
      `}</style>
    </div>
  );
};

export default Hero;