import React from "react";   // change by me 

const Explore = () => {
  // Replace with your actual image URL
  const backgroundImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop";

  return (
    <div className="w-full my-0 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-90"></div>
      
      {/* Background image with blend mode */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-b from-transparent via-white to-transparent" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Content container with glassmorphism */}
      <div className="relative h-[60vh] flex items-center justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl w-full">
          {/* Glowing border container */}
          <div className="relative group">
            {/* Animated border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl animate-pulse"></div>
            
            {/* Glass card */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-12 md:p-16 border border-white/10 hover:border-white/20 transition-colors duration-300 shadow-2xl">
              {/* Accent lines */}
              <div className="absolute top-0 left-1/4 w-20 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <div className="absolute bottom-0 right-1/4 w-20 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>

              {/* Text content */}
              <div className="text-center">
                <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  About Us
                </h2>

                <div className="h-1 w-20 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto mb-8 rounded-full"></div>

                <p className="font-outfit text-base md:text-lg leading-relaxed text-white/80 hover:text-white/95 transition-colors duration-300">
                  We believe fashion should feel effortless. Our mission is to create
                  clothing that blends comfort, quality, and modern style—crafted for
                  every moment. Each piece is thoughtfully designed with premium
                  fabrics to elevate your confidence and everyday life.
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 opacity-50"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-400 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;