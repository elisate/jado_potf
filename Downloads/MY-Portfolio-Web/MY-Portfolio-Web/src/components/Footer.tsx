
import React from 'react';

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', href: '#' },
    { name: 'Discord', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'Instagram', href: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-foreground text-center md:text-left text-sm">
            © 2025 All rights Reserved Designed by{" "}
            <span className="font-bold text-primary">
              Jean de DIEU.
            </span>
          </div>
          <nav className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
