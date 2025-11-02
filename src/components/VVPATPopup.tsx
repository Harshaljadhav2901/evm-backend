import { useEffect, useState } from 'react';
import { Candidate } from '@/config/candidates';
import lotusSymbol from '@/assets/bjp-7282.png';
import vvpatMachine from '@/assets/vvpat-machine.png';

interface VVPATPopupProps {
  candidate: Candidate;
  onClose: () => void;
}

const VVPATPopup = ({ candidate, onClose }: VVPATPopupProps) => {
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[420px]">
        {/* Modern Popup Container - Vertical Portrait Layout */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border-2 border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-3 py-2 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-wide">
                VVPAT - मतदार सत्यापन योग्य पेपर ऑडिट ट्रेल
              </h2>
              <button
                onClick={onClose}
                className="text-[9px] sm:text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded transition-colors"
              >
                बंद करा ({countdown}s)
              </button>
            </div>
          </div>

          {/* VVPAT Machine with Overlay */}
          <div className="relative p-2 sm:p-3">
            <div className="relative w-full">
              {/* Real VVPAT Machine Image - Larger and More Prominent */}
              <img 
                src={vvpatMachine} 
                alt="VVPAT Machine"
                className="w-full h-auto object-contain"
              />
              
              {/* Voting Information Overlay - Precisely fitted in the white display */}
              <div className="absolute top-[21%] left-[36%] right-[34%] bottom-[61%] flex items-center justify-center">
                <div className="w-full h-full bg-white flex flex-col items-center justify-center py-1 px-0.5">

                   {/* Index Number */}
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-black mb-0.5">
                    {candidate.id}
                  </p>
                  
                  {/* Candidate Name in Marathi - Top */}
                  <p className="text-[10px] sm:text-[10px] md:text-[10px] font-bold text-black text-center leading-tight mb-0.5">
                    {candidate.nameMarathi || candidate.name}
                  </p>
                  
                  {/* Index Number */}
                  {/* <p className="text-[10px] sm:text-xs md:text-sm font-bold text-black mb-0.5">
                    {candidate.id}
                  </p> */}
                  
                  {/* Party Symbol */}
                  <div className="my-0.5">
                    <img 
                      src={lotusSymbol} 
                      alt={candidate.party}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-2 py-1.5 border-t border-gray-700">
            <p className="text-white text-[9px] sm:text-[10px] md:text-xs text-center font-medium">
              भारत निवडणूक आयोग | Election Commission of India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VVPATPopup;
