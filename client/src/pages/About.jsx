import React, { useState, useEffect } from "react";
import { ShoppingBag, Zap, Shield, Star, TrendingUp, Users, Award, Heart } from "lucide-react";

const stats = [
  // { icon: Users, value: "50K+", label: "Happy Customers" },
  // { icon: ShoppingBag, value: "100K+", label: "Products Sold" },
  { icon: Award, value: "99.5%", label: "Satisfaction Rate" },
  { icon: TrendingUp, value: "24/7", label: "Support Available" },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "Get your orders delivered within 24-48 hours with our express shipping service.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Shop with confidence using our encrypted payment gateway and buyer protection.",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Quality Guaranteed",
    description: "Every product is handpicked and quality-checked before reaching your doorstep.",
    gradient: "from-pink-400 to-rose-500"
  },
];

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div 
        className="absolute w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-float-large transition-transform duration-1000"
        style={{
          top: '10%',
          left: '10%',
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
        }}
      />
      <div 
        className="absolute w-96 h-96 bg-rose-500 rounded-full filter blur-3xl opacity-20 animate-float-large transition-transform duration-1000" 
        style={{ 
          bottom: '10%',
          right: '10%',
          animationDelay: '2s',
          transform: `translate(${-mousePos.x * 0.015}px, ${-mousePos.y * 0.015}px)`
        }} 
      />
      <div 
        className="absolute w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-15 animate-float-large transition-transform duration-1000" 
        style={{ 
          top: '50%',
          left: '50%',
          animationDelay: '4s',
          transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
        }} 
      />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5 animate-grid-move" style={{
        backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full animate-particle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* ------------------- HERO SECTION ------------------- */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-20 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="animate-fade-in-left">
              <div className="inline-block mb-6 animate-bounce-gentle">
                <span className="bg-gradient-to-r from-orange-500 to-rose-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/30 animate-glow-pulse inline-flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  About ShopEase
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-pink-400 bg-clip-text text-transparent animate-gradient-text block">
                  We make online
                </span>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-gradient-text block">
                  shopping effortless
                </span>
                {/* <span className="text-white">.</span> */}
              </h1>
              
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-8">
                Trusted products, transparent pricing, lightning-fast delivery — ShopEase is built for the modern shopper who expects more. Join thousands of satisfied customers today.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="/collection"
                  className="group relative rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold shadow-xl hover:shadow-2xl hover:shadow-orange-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Start Shopping
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </a>

                <a
                  href="/contact"
                  className="rounded-full bg-slate-800/50 border-2 border-orange-500/50 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold hover:bg-slate-700 hover:border-orange-400 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Contact Us 💬
                </a>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 animate-fade-in-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse-glow" />
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-700 border-4 border-orange-500/50"
                  style={{
                    transform: `translateY(${scrollY * -0.1}px)`
                  }}
                >
                  <img
                   src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1074&auto=format&fit=crop"
                    alt="fashion clothing"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-lg sm:text-xl font-bold">Latest Fashion Trends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- STATS SECTION ------------------- */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-slate-700/50 hover:border-orange-500/80 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 transform hover:-translate-y-2 animate-zoom-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- FEATURES SECTION ------------------- */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-down">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-rose-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-4">
              Experience Excellence
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-700 transform hover:-translate-y-4 border-2 border-slate-700/50 hover:border-orange-500/80 overflow-hidden animate-zoom-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className={`inline-flex bg-gradient-to-br ${feature.gradient} p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-rose-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float-large {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.8) translateY(50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 60px rgba(249, 115, 22, 0.8); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes twinkle-fast {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120vh) translateX(60px); opacity: 0; }
        }

        .animate-float-large { animation: float-large 8s ease-in-out infinite; }
        .animate-zoom-in { animation: zoom-in 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-left { animation: fade-in-left 1s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out; }
        .animate-fade-in-down { animation: fade-in-down 1s ease-out; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-gradient-text { animation: gradient-text 5s ease infinite; background-size: 200% 200%; }
        .animate-grid-move { animation: grid-move 30s linear infinite; }
        .animate-twinkle-fast { animation: twinkle-fast 1s ease-in-out infinite; }
        .animate-particle-float { animation: particle-float 20s linear infinite; }
      `}</style>
    </main>
  );
}