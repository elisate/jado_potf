import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'transform -translate-y-2 px-4' : 'px-0'
      }`}
    >
      <div className={`transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'max-w-lg mx-auto mt-4 bg-background/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/20' // Changed from max-w-md to max-w-lg
          : 'max-w-7xl mx-auto bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
      }`}>
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-12 px-4' : 'h-16 px-4'
        }`}>
          {/* Logo */}
          <div className={`flex-shrink-0 transition-all duration-300 ${
            isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
          }`}>
            <span className="font-rubik text-lg font-bold text-foreground">
              JEAN DE DIEU DUSHIMIYIMANA
            </span>
            <span className="font-rubik text-lg font-bold text-primary">.</span>
          </div>

          {/* Desktop Navigation - Adjusted spacing for compact mode */}
          <div className="hidden md:block">
            <div className={`flex items-center transition-all duration-300 ${
              isScrolled ? 'space-x-4' : 'space-x-6' // Reduced spacing when scrolled
            }`}>
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-foreground hover:text-primary transition-colors duration-300 font-medium ${
                    isScrolled ? 'text-xs py-1' : 'text-sm' // Smaller text when scrolled
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button - Show in both states but smaller when scrolled */}
          <div className="hidden md:block transition-all duration-300">
            <button
              onClick={() => scrollToSection('#contact')}
              className={`bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-300 ${
                isScrolled ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
              }`}
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-foreground hover:text-primary transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 text-base"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToSection('#contact');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-lg font-medium transition-all duration-300 mt-2"
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;