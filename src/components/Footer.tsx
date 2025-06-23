
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-campaign-navy text-campaign-cream">
      {/* Landmarks Silhouette */}
      <div className="relative">
        <div className="h-16 bg-gradient-to-r from-campaign-navy via-campaign-navy/90 to-campaign-navy overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end space-x-8 opacity-30">
            {/* Mount Fuji */}
            <div className="w-20 h-12 bg-current" style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}></div>
            {/* Temple */}
            <div className="w-16 h-10 bg-current" style={{
              clipPath: 'polygon(10% 100%, 10% 40%, 20% 30%, 30% 40%, 30% 20%, 40% 10%, 60% 10%, 70% 20%, 70% 40%, 80% 30%, 90% 40%, 90% 100%)'
            }}></div>
            {/* Himalayas */}
            <div className="w-24 h-14 bg-current" style={{
              clipPath: 'polygon(0% 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 30%, 100% 100%)'
            }}></div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Campaign Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span>🇳🇵</span>
              <span>🇯🇵</span>
              <h3 className="text-xl font-bold">Suvash Lamichhane</h3>
            </div>
            <p className="text-campaign-cream/80 leading-relaxed">
              Candidate for President, NRNA Japan (2025-2027). 
              Building a stronger, more united Nepali community in Japan.
            </p>
            <div className="text-campaign-red font-semibold">
              #iamwithSuvashLamichhane
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a 
                href="#about" 
                className="block text-campaign-cream/80 hover:text-campaign-red transition-colors duration-200"
              >
                About Suvash
              </a>
              <a 
                href="#vision" 
                className="block text-campaign-cream/80 hover:text-campaign-red transition-colors duration-200"
              >
                Vision & Mission
              </a>
              <a 
                href="#timeline" 
                className="block text-campaign-cream/80 hover:text-campaign-red transition-colors duration-200"
              >
                Journey & Timeline
              </a>
              <a 
                href="#contact" 
                className="block text-campaign-cream/80 hover:text-campaign-red transition-colors duration-200"
              >
                Contact & Support
              </a>
            </div>
          </div>

          {/* Contact & NRNA */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="space-y-2 text-campaign-cream/80">
              <p>📞 080 4133 6105</p>
              <p>✉️ suvash@nrnajapan.org</p>
              <a 
                href="https://www.nrnajapan.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-campaign-red transition-colors duration-200"
              >
                🌐 NRNA Japan Official Website
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-campaign-cream/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-campaign-cream/60 text-sm">
                © {currentYear} Suvash Lamichhane for NRNA Japan President. All Rights Reserved.
              </p>
              <p className="text-campaign-cream/40 text-xs mt-1">
                Paid for by the Committee to Elect Suvash Lamichhane
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-campaign-cream/60">
              <span>हाल उपाध्यक्ष, एनआरएनए जापान</span>
              <span>•</span>
              <span>Current Vice President, NRNA Japan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
