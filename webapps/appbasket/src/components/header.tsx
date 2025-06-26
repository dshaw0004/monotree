import {Menu, Smartphone, X} from "lucide-react";
import React, {useEffect, useState} from "react";

interface PropType {
  appName?: string;
}

// TODO: make a logo for it and update the header

export default function Header({appName = 'App Basket'}: PropType) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{appName}</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#apps" className="text-gray-300 hover:text-white transition-colors">Apps</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#developers" className="text-gray-300 hover:text-white transition-colors">Developers</a>
              <a href="#support" className="text-gray-300 hover:text-white transition-colors">Support</a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Sign In
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#apps" className="block text-gray-300 hover:text-white transition-colors">Apps</a>
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#developers" className="block text-gray-300 hover:text-white transition-colors">Developers</a>
              <a href="#support" className="block text-gray-300 hover:text-white transition-colors">Support</a>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full mt-4">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
}
