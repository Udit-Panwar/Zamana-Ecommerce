import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const shopLinks = [
    { label: "Home", path: "/" },
    { label: "Collection", path: "/collection" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    // { label: "New Arrivals", path: "/new-arrivals" }
  ];

  const supportLinks = [
    { lable: "Help Center", path: "/working" },
    { lable: "Shipping", path: "/working" },
    { lable: "Returns", path: "/working" },
    { lable: "Size Guide", path: "/working" },
    { lable: "Track Order", path: "/working" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Thanks! ${email} has been subscribed.`);
    setEmail("");
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  const handleShopLinkClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="w-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-black"></div>

      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen opacity-5 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen opacity-5 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-gradient-to-b from-white via-transparent to-transparent"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* Top section */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="group">
            <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative space-y-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  BrandName
                </span>

                <p className="text-sm text-white/80 leading-relaxed group-hover:text-white/90 transition-colors">
                  Your go-to destination for stylish, comfortable, and
                  high-quality clothing. We bring the latest trends, fast
                  delivery, and a seamless shopping experience.
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href="https://wa.me/919756640786 "
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-400/50 transition-all duration-300 group/social"
                  >
                    <svg
                      className="w-5 h-5 text-white group-hover/social:text-green-300 transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/zam.ana_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-400/50 transition-all duration-300 group/social"
                  >
                    <svg
                      className="w-5 h-5 text-white group-hover/social:text-pink-300 transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/CvhKmP5iSedJXP6XA"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Location"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/50 transition-all duration-300 group/social"
                  >
                    <svg
                      className="w-5 h-5 text-white group-hover/social:text-red-300 transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="group">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h4 className="font-semibold text-white mb-4 text-lg">Shop</h4>
                <ul className="space-y-3">
                  {shopLinks.map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleShopLinkClick(item.path)}
                        className={`text-sm transition-all duration-300 inline-block relative group/link cursor-pointer border-none bg-transparent ${
                          isLinkActive(item.path)
                            ? "text-purple-400 font-semibold"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {item.label}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                            isLinkActive(item.path)
                              ? "w-full"
                              : "w-0 group-hover/link:w-full"
                          }`}
                        ></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div className="group">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-pink-400/50 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h4 className="font-semibold text-white mb-4 text-lg">
                  Support
                </h4>
                <ul className="space-y-3">
                  {supportLinks.map((s, idx) => (
                    <li key={idx}>
                      <a
                        href={s.path}
                        className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block relative group/link"
                      >
                        {s.lable}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover/link:w-full transition-all duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="group">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <h4 className="font-semibold text-white text-lg">
                  Get 10% off
                </h4>
                <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors">
                  Subscribe for exclusive offers and early access.
                </p>

                <div className="space-y-3">
                  <div className="relative">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 focus:border-purple-400 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className="w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    Subscribe
                  </button>
                </div>

                <div className="space-y-2 pt-2 text-xs text-white/60 group-hover:text-white/70 transition-colors">
                  <p>
                    Customer care:{" "}
                    <a
                      href="tel:+919411161842"
                      className="hover:text-white transition-colors"
                    >
                      +919411161842
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="zamanaofficial77@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      zamanaofficial77@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="text-white/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} BrandName. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/60 hover:text-white relative group/footer transition-colors"
            >
              Terms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover/footer:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white relative group/footer transition-colors"
            >
              Privacy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover/footer:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white relative group/footer transition-colors"
            >
              Sitemap
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover/footer:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
