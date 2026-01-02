import React from 'react'  //change by me

const OurPolicy = () => {
  const policies = [
    {
      icon: "🔄",
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
      gradient: "from-orange-500 to-rose-600",
      glowColor: "orange"
    },
    {
      icon: "↩️",
      title: "7 Days Return Policy",
      description: "We Provide 7 days free return policy",
      gradient: "from-rose-500 to-pink-600",
      glowColor: "rose"
    },
    {
      icon: "💬",
      title: "24/7 Customer Support",
      description: "We provide 24/7 customer support",
      gradient: "from-pink-500 to-purple-600",
      glowColor: "pink"
    }
  ];

  return (
    <div className='relative py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden'>
      {/* Animated Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-rose-500 rounded-full filter blur-3xl opacity-20 animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-15 animate-float-slow" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
      </div>

      <div className='relative max-w-6xl mx-auto'>
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-block mb-3 animate-bounce-slow">
            <span className="bg-gradient-to-r from-orange-500 to-rose-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-orange-500/30 animate-glow">
              ✨ Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-rose-500 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Our Commitments
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full animate-pulse-glow" />
          </div>
        </div>

        {/* Policy Cards */}
        <div className='flex flex-col sm:flex-row justify-center gap-8 text-center'>
          {policies.map((policy, index) => (
            <div 
              key={index}
              className='group relative flex-1 max-w-sm animate-slide-up'
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card Container */}
              <div className='relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border-2 border-slate-700/50 hover:border-orange-500/80 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 overflow-hidden'>
                
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${policy.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-gradient-shift`} />
                
                {/* Rotating Border Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-r ${policy.gradient} rounded-3xl animate-spin-slow blur-xl`} style={{ padding: '2px' }} />
                </div>

                <div className="relative z-10">
                  {/* Icon Container with Pulse Animation */}
                  <div className='relative mb-6 animate-bounce-subtle'>
                    <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${policy.gradient} rounded-3xl flex items-center justify-center text-5xl transform group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-1000 shadow-2xl shadow-orange-500/50 animate-icon-float`}>
                      {policy.icon}
                    </div>
                    
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 w-24 h-24 mx-auto">
                      <div className={`absolute inset-0 border-4 border-orange-500 rounded-3xl animate-ping-slow opacity-75`} />
                      <div className={`absolute inset-0 border-2 border-rose-500 rounded-3xl animate-ping-slower opacity-50`} style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>

                  {/* Title with Wave Animation */}
                  <h3 className='font-bold text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-rose-400 group-hover:bg-clip-text transition-all duration-500 animate-wave'>
                    {policy.title}
                  </h3>

                  {/* Description */}
                  <p className='text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-all duration-500'>
                    {policy.description}
                  </p>

                  {/* Animated Check Icon */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${policy.gradient} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-bounce-subtle`}>
                      <span className="animate-spin-slow">✓</span>
                      <span>Active</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Wave Effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${policy.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl`} />
                
                {/* Corner Sparkles */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-twinkle" />
                <div className="absolute top-6 right-8 w-2 h-2 bg-rose-400 rounded-full opacity-0 group-hover:opacity-100 animate-twinkle" style={{ animationDelay: '0.2s' }} />
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-twinkle" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* Floating Number Badge */}
              <div className={`absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r ${policy.gradient} text-white text-lg font-bold rounded-full flex items-center justify-center shadow-2xl transform group-hover:rotate-[360deg] transition-transform duration-1000 animate-bounce-subtle`}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Bottom Text */}
        <div className="text-center mt-16 animate-fade-in-up">
          <p className="text-gray-400 text-sm animate-pulse-text">
            Hover over cards to see the magic ✨
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -20px) scale(0.85); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(180deg); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-shift {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.5); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-2px); }
          75% { transform: translateY(2px); }
        }

        @keyframes pulse-text {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 15s linear infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-down { animation: fade-in-down 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-icon-float { animation: icon-float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-ping-slower { animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-gradient { animation: gradient 5s ease infinite; background-size: 200% 200%; }
        .animate-gradient-shift { animation: gradient-shift 8s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 1.5s ease-in-out infinite; }
        .animate-wave { animation: wave 2s ease-in-out infinite; }
        .animate-pulse-text { animation: pulse-text 3s ease-in-out infinite; }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border-radius: 50%;
          opacity: 0.6;
          animation: particle-float 15s linear infinite;
        }

        .particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 60%; left: 80%; animation-delay: 3s; }
        .particle-3 { top: 80%; left: 30%; animation-delay: 6s; }
        .particle-4 { top: 40%; left: 60%; animation-delay: 9s; }
        .particle-5 { top: 15%; left: 90%; animation-delay: 12s; }

        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default OurPolicy