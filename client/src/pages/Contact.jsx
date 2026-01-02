import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
          animation: 'morph 15s ease-in-out infinite'
        }} />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />
        <div className="floating-shape shape-4" />
        <div className="floating-shape shape-5" />
        <div className="floating-shape shape-6" />
      </div>

      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-down">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full mb-6 animate-glow-border">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot" />
            <span className="text-gray-300 font-semibold text-sm">Get in Touch</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 animate-text-shimmer" style={{
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #ec4899, #60a5fa)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Let's Connect
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1 animate-slide-right">
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-700 shadow-2xl hover:shadow-pink-500/20">
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-glow" style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                backgroundSize: '200% 200%',
                filter: 'blur(20px)',
                zIndex: -1
              }} />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Name Input */}
                <div className="form-group">
                  <label className="block text-gray-300 font-semibold mb-3 text-sm">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300 hover:border-white/20"
                      placeholder="John Doe"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">👤</div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="form-group">
                  <label className="block text-gray-300 font-semibold mb-3 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300 hover:border-white/20"
                      placeholder="john@example.com"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">📧</div>
                  </div>
                </div>

                {/* Phone Input */}
                <div className="form-group">
                  <label className="block text-gray-300 font-semibold mb-3 text-sm">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300 hover:border-white/20"
                      placeholder="+91 98777 44222"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">📱</div>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="form-group">
                  <label className="block text-gray-300 font-semibold mb-3 text-sm">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300 hover:border-white/20"
                      placeholder="How can we help?"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">💬</div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="form-group">
                  <label className="block text-gray-300 font-semibold mb-3 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300 hover:border-white/20 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                {/* Submit Button */}
                {/* <button
                  type="submit"
                  className="group/btn w-full relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-5 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    Send Message
                    <span className="transform group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 origin-left" />
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 animate-shimmer-wave" style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%'
                    }} />
                  </div>
                </button> */}
                <a
                  href="https://wa.me/919756640786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn w-full relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-5 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 block"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    Send Message
                    <span className="transform group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 origin-left" />
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 animate-shimmer-wave" style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%'
                    }} />
                  </div>
                </a>
              </form>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="order-1 lg:order-2 space-y-6 animate-slide-left">
            {/* Location Card */}
            <div className="group relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/50">
                  📍
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Visit Us</h3>
                <p className="text-gray-300 leading-relaxed">
                Behind PSP Hospital on Rampur Road,<br />
                Haldwani, <br />
                Nainital, Uttarakhand 263139
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '0.5s' }} />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/50">
                  ✉️
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Email Us</h3>
                <p className="text-gray-300 leading-relaxed">
                zamanaofficial77@gmail.com<br />
                  {/* sales@shopease.com<br />
                  info@shopease.com */}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-pink-500/50">
                  📞
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Call Us</h3>
                <p className="text-gray-300 leading-relaxed">
                  +91 9756640786<br />
                  +91 9411161842<br />
                  Mon-Sat: 9AM - 6PM
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: "📷", color: "from-purple-600 to-pink-600", label: "Instagram", url: "https://www.instagram.com/zam.ana_official/" },
                  // { icon: "📸", color: "from-pink-600 to-purple-600", label: "Instagram" },
                  // { icon: "🐦", color: "from-sky-500 to-blue-600", label: "Twitter" },
                  // { icon: "💼", color: "from-blue-700 to-blue-900", label: "LinkedIn" }
                ].map((social, idx) => (
                  <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-2xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 animate-fade-in-up">
        </div>
      </div>

      <style>{`
        @keyframes morph {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.2); }
          66% { transform: translate(-50px, 50px) scale(0.8); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-left {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes glow-border {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
        }

        @keyframes border-glow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @keyframes shimmer-wave {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float-shape {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(50px, -50px) rotate(90deg); }
          50% { transform: translate(100px, 0) rotate(180deg); }
          75% { transform: translate(50px, 50px) rotate(270deg); }
        }

        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .animate-slide-down { animation: slide-down 1s ease-out; }
        .animate-slide-left { animation: slide-left 1s ease-out; }
        .animate-slide-right { animation: slide-right 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-text-shimmer { animation: text-shimmer 3s linear infinite; }
        .animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .animate-glow-border { animation: glow-border 2s ease-in-out infinite; }
        .animate-border-glow { animation: border-glow 3s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-shimmer-wave { animation: shimmer-wave 2s linear infinite; }

        .floating-shape {
          position: absolute;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3));
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: float-shape 20s ease-in-out infinite;
          filter: blur(40px);
        }

        .shape-1 { width: 200px; height: 200px; top: 10%; left: 5%; animation-delay: 0s; }
        .shape-2 { width: 300px; height: 300px; top: 60%; right: 10%; animation-delay: 2s; }
        .shape-3 { width: 150px; height: 150px; top: 30%; right: 30%; animation-delay: 4s; }
        .shape-4 { width: 250px; height: 250px; bottom: 20%; left: 15%; animation-delay: 6s; }
        .shape-5 { width: 180px; height: 180px; top: 50%; left: 40%; animation-delay: 8s; }
        .shape-6 { width: 220px; height: 220px; bottom: 10%; right: 25%; animation-delay: 10s; }

        .matrix-rain {
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.8), transparent);
          animation: matrix-fall linear infinite;
        }

        .form-group {
          animation: fade-in-up 0.8s ease-out backwards;
        }

        .form-group:nth-child(1) { animation-delay: 0.1s; }
        .form-group:nth-child(2) { animation-delay: 0.2s; }
        .form-group:nth-child(3) { animation-delay: 0.3s; }
        .form-group:nth-child(4) { animation-delay: 0.4s; }
        .form-group:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
    </main>
  );
}