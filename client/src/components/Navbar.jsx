import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk } from "@clerk/clerk-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Collection", path: "/collection" },
    { name: "Contact", path: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { cart } = useContext(ShopContext)

  const { openSignIn } = useClerk()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center text-lg justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
        }`}
    >
      {/* Logo */}
      <NavLink to="/" className="-ml-4 md:-ml-20">
        <img src={assets.Zamana_Logo} alt="logo" className="h-25 w-25 rounded-full object-cover border-2 border-white/30 transition-all duration-500" />
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 lg:gap-8 ml-20">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-2 ${isScrolled ? "text-gray-700" : "text-white"
              }`}
          >
            {link.name}
            <div
              className={`${isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-6">
        {/* <img
          src={assets.search_icon}
          alt="search"
          className={`h-7 transition-all duration-500 ${!isScrolled && "invert brightness-0"
            }`}
        /> */}

        <Link to="/cart">
          <div className="relative">
            {
              cart.length>0 && <p className="bg-gradient-to-r z-2 absolute left-4 animate-bounce from-orange-500 to-rose-600 text-white p-1 rounded-full w-[18px] h-[18px] text-[15px] flex items-center justify-center">{cart.length}</p>
            }
            <img
              src={assets.cart_icon}
              alt="cart"
              className={`h-7 transition-all cursor-pointer duration-500 ${!isScrolled && "invert brightness-0"
                }`}
            />
          </div>
        </Link>

        <SignedOut>
          <SignInButton className='bg-white p-2 rounded-xl cursor-pointer hover:scale-95'></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menu_icon}
          alt=""
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.cross_icon} alt="cross-icon" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
          Login
        </button>
      </div>
    </nav>
  );
};
export default Navbar;