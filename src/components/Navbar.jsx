import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-2xl bg-white opacity-100 shadow-lg backdrop-blur-md transition-transform duration-300 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-center space-x-7 px-6 py-2">
        {/* Left side buttons */}
        <div className="flex items-start">
        <DropdownButton title="Health Library">
            <DropdownItem label="Medicines" />
            <DropdownItem label="Diseases" />
          </DropdownButton>
          
          <NavButton label="New Prescription" />
        </div>

        {/* Logo in the center */}
        <div className="flex justify-center items-stretch">
          <img
            src="/logo.png"  // Replace with actual logo path
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex space-x-4">
          <DropdownButton title="Consultants">
            <DropdownItem label="Physicists" />
            <DropdownItem label="General Surgeon" />
            <DropdownItem label="Dentists" />
          </DropdownButton>
          <NavButton label="Support" />
          <NavButton label="Reviews" />
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ label }) => (
  <button className="relative px-4 py-2 font-medium text-gray-800 hover:text-blue-600 focus:outline-none">
    {label}
  </button>
);

const DropdownButton = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
      >
        {title}
        <ChevronDown className="ml-1 w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ label }) => (
  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
    {label}
  </button>
);

const NavbarPage = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="pt-24 p-8 justify-items-center">
        <h1 className="text-3xl font-bold mb-4 pt-9">Welcome to the Healthcare Website</h1>
        <p className="text-gray-700 mb-4">
          Scroll down to see the navbar hide and scroll up to reveal it again. This is a
          simple demonstration of a responsive, semi-transparent navbar with dropdown menus.
        </p>
      </div>
    </div>
  );
};

export default NavbarPage;
