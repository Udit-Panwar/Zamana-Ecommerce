import React from "react";   // change by me

const OfferCard = ({ discount, title, description, expires, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 animate-slide-diagonal" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(249, 115, 22, 0.1) 10px, rgba(249, 115, 22, 0.1) 20px)'
        }} />
      </div>

      {/* Background Image with Overlay */}
      <div className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-125 group-hover:rotate-3 transition-all duration-1000"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90" />
        
        {/* Animated Floating Particles */}
        <div className="absolute inset-0">
          <div className="floating-particle particle-1" />
          <div className="floating-particle particle-2" />
          <div className="floating-particle particle-3" />
        </div>
        
        {/* Discount Badge with Animation */}
        <div className="absolute top-6 right-6 z-10 animate-bounce-rotate">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full blur-xl opacity-75 animate-pulse-strong" />
            <div className="relative bg-gradient-to-br from-orange-500 to-rose-600 text-white px-6 py-4 rounded-full shadow-2xl transform rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <span className="text-2xl font-bold animate-pulse-scale">{discount}</span>
              {discount.includes('%') && <span className="text-sm ml-1">OFF</span>}
            </div>
          </div>
        </div>

        {/* Decorative Animated Corner */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/40 to-transparent rounded-br-full animate-corner-glow" />
        
        {/* Moving Light Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-shimmer" />
      </div>

      {/* Content Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border-t-4 border-orange-500">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-rose-400 group-hover:bg-clip-text transition-all duration-500 animate-slide-in-left">
            {title}
          </h3>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-500 animate-slide-in-right">
            {description}
          </p>

          {/* Footer with Expiry and CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-orange-500/30">
            <div className="flex items-center gap-2 text-sm text-orange-300 animate-fade-in">
              <div className="relative">
                {/* <svg className="w-5 h-5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-50 animate-ping-custom" />
              </div>
              {/* <span className="animate-pulse-text">Expires {expires}</span> */}
            </div>
            
            {/* <button className="relative bg-gradient-to-r from-orange-500 to-rose-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-orange-500/60 transform hover:scale-110 transition-all duration-300 overflow-hidden group/btn">
              <span className="relative z-10">Claim Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </button> */}
          </div>
        </div>

        {/* Decorative Bottom Wave with Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 via-rose-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 animate-gradient-flow" />
        
        {/* Corner Sparkles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-twinkle-fast" />
        <div className="absolute top-6 right-8 w-3 h-3 bg-rose-400 rounded-full opacity-0 group-hover:opacity-100 animate-twinkle-fast" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-twinkle-fast" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

const OffersPage = () => {
  const offers = [
    {
      discount: "40%",
      title: "Summer Fashion Sale",
      description: "Get trendy summer outfits with exclusive discounts on shirts, dresses & accessories.",
      expires: "Aug 15",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    },
    {
      discount: "25%",
      title: "New Arrivals Exclusive",
      description: "Shop the latest collection with early access for premium members.",
      expires: "Aug 30",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    },
    {
      discount: "Buy 2 Get 1",
      title: "Festive Combo Deals",
      description: "Buy 2 and get 1 free on selected ethnic & western wear combos.",
      expires: "Sep 10",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-float-large" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-500 rounded-full filter blur-3xl opacity-20 animate-float-large" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-15 animate-float-large" style={{ animationDelay: '4s' }} />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5 animate-grid-move" style={{
        backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="bg-particle bg-particle-1" />
        <div className="bg-particle bg-particle-2" />
        <div className="bg-particle bg-particle-3" />
        <div className="bg-particle bg-particle-4" />
        <div className="bg-particle bg-particle-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-block mb-6 animate-bounce-gentle">
            <span className="relative bg-gradient-to-r from-orange-500 to-rose-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-2xl shadow-orange-500/50 animate-glow-pulse">
              <span className="relative z-10">🔥 Limited Time Only</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse-strong" />
            </span>
          </div>
          
          <h1 className="text-7xl font-bold bg-gradient-to-r from-orange-400 via-rose-500 to-pink-400 bg-clip-text text-transparent mb-6 animate-gradient-text">
            Exclusive Offers
          </h1>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Take advantage of our limited-time offers and special packages to
            enhance your shopping experience and create unforgettable moments.
          </p>

          {/* Decorative Animated Underline */}
          <div className="flex justify-center mt-8 animate-expand">
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 rounded-full animate-pulse-width" />
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="animate-zoom-in"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <OfferCard {...offer} />
            </div>
          ))}
        </div>

        {/* View All Section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <button className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 to-rose-600 text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-orange-500/60 transform hover:scale-110 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            <span className="relative z-10">View All Offers</span>
            <svg 
              className="relative z-10 w-6 h-6 transform group-hover:translate-x-3 group-hover:rotate-12 transition-all duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>
      </div>

      <style>{`
        /* Card Entry Animations */
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.8) translateY(50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Floating Animations */
        @keyframes float-large {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes bounce-rotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        /* Glow and Pulse Effects */
        @keyframes pulse-strong {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 60px rgba(249, 115, 22, 0.8); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes pulse-width {
          0%, 100% { width: 8rem; opacity: 1; }
          50% { width: 12rem; opacity: 0.7; }
        }

        /* Rotation Animations */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Sparkle and Twinkle */
        @keyframes twinkle-fast {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
        }

        @keyframes corner-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        /* Gradient Animations */
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* Movement Effects */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes slide-diagonal {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes expand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* Particle Animations */
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) translateX(60px); opacity: 0; }
        }

        @keyframes ping-custom {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes pulse-text {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Apply Animations */
        .animate-zoom-in { animation: zoom-in 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; opacity: 0; }
        .animate-fade-in-down { animation: fade-in-down 1s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out 0.2s backwards; }
        .animate-float-large { animation: float-large 8s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-bounce-rotate { animation: bounce-rotate 3s ease-in-out infinite; }
        .animate-pulse-strong { animation: pulse-strong 2s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
        .animate-pulse-width { animation: pulse-width 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-twinkle-fast { animation: twinkle-fast 1s ease-in-out infinite; }
        .animate-corner-glow { animation: corner-glow 2s ease-in-out infinite; }
        .animate-gradient-text { animation: gradient-text 5s ease infinite; background-size: 200% 200%; }
        .animate-gradient-flow { animation: gradient-flow 3s linear infinite; background-size: 200% 200%; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-slide-diagonal { animation: slide-diagonal 20s linear infinite; }
        .animate-grid-move { animation: grid-move 30s linear infinite; }
        .animate-expand { animation: expand 1s ease-out; }
        .animate-ping-custom { animation: ping-custom 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-text { animation: pulse-text 2s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out 0.3s backwards; }

        /* Floating Particles */
        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.8), transparent);
          border-radius: 50%;
          animation: float-particle 4s ease-in-out infinite;
        }

        .particle-1 { top: 20%; left: 20%; animation-delay: 0s; }
        .particle-2 { top: 60%; left: 70%; animation-delay: 1s; }
        .particle-3 { top: 40%; left: 50%; animation-delay: 2s; }

        /* Background Particles */
        .bg-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border-radius: 50%;
          opacity: 0.4;
          animation: float-particle 20s linear infinite;
        }

        .bg-particle-1 { top: 10%; left: 15%; animation-delay: 0s; }
        .bg-particle-2 { top: 70%; left: 85%; animation-delay: 4s; }
        .bg-particle-3 { top: 30%; left: 60%; animation-delay: 8s; }
        .bg-particle-4 { top: 50%; left: 25%; animation-delay: 12s; }
        .bg-particle-5 { top: 85%; left: 70%; animation-delay: 16s; }
      `}</style>
    </div>
  );
};

export default OffersPage;
