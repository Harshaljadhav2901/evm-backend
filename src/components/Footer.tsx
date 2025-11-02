import { Globe, Facebook, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200/50 py-2 sm:py-3 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between gap-2">
          {/* Developed by section */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2">
            <span className="text-xs sm:text-sm text-gray-600 font-semibold ml-[4px] whitespace-nowrap">Developed by</span>
            <a 
              href="https://www.yashtantra.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={logo} 
                alt="Yashtantra Logo" 
                className="h-6 sm:h-8 w-auto"
              />
            </a>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
            <a
              href="https://wa.me/+919175300002"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366]" />
            </a>
            <a
              href="https://www.facebook.com/yashtantra/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-[#1877F2] fill-[#1877F2]" />
            </a>
            <a
              href="https://www.instagram.com/yashtantra/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#E4405F]" />
            </a>
            <a
              href="https://www.yashtantra.com/politicalcampaign.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Website"
            >
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#4285F4]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
