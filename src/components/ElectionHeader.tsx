import { electionInfo } from '@/config/electionInfo';
import { Share2, ClipboardList, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playIntro } from '@/utils/sounds';

const ElectionHeader = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: electionInfo.evmTitleMarathi,
        // text: electionInfo.votingMessageMarathi,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <header className="w-full bg-gradient-to-br from-background to-secondary">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">

        {/* Main Heading */}
        <div className="text-center mb-2 sm:mb-4 md:mb-6">
          <h1 className="text-lg text-[1.1rem] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A56A8] leading-tight">
            {electionInfo.constituencyNumber} - {electionInfo.constituencyNameMarathi} {electionInfo.year}
          </h1>
          <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-[#2B6CB0] mt-1 sm:mt-2">
            {electionInfo.evmTitleMarathi}
          </h2>
        </div>

        {/* Instruction Banner */}
        <button 
          onClick={playIntro}
          className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-full shadow-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 mb-2 sm:mb-4 md:mb-6 flex items-center justify-center gap-2 sm:gap-3 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 transition-all cursor-pointer"
          aria-label="Play introduction audio"
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-pulse text-white flex-shrink-0" />
          <p className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg text-center leading-snug">
            {electionInfo.instructionTextMarathi}
          </p>
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-[1fr_auto] gap-2 sm:gap-3 md:gap-6 items-start">
          {/* Voting Message Box */}
          <div className="bg-white border-2 sm:border-4 border-[#1A56A8] rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 lg:p-8">
            <p className="text-orange-600 font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-center leading-relaxed">
              {electionInfo.votingMessageMarathi}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Share Button */}
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xs sm:text-base md:text-lg px-3 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 min-w-[100px] sm:min-w-[140px] lg:min-w-[200px]"
            >
              <Share2 className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              <span className="text-sm sm:text-xl md:text-2xl">SHARE</span>
            </Button>

            {/* Survey Button */}
            <Button
              onClick={() => {}}
              className="bg-gradient-to-r from-[#1A56A8] to-[#2B6CB0] hover:from-[#2B6CB0] hover:to-[#1A56A8] text-white font-bold text-xs sm:text-base md:text-lg px-3 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 min-w-[100px] sm:min-w-[140px] lg:min-w-[200px]"
            >
              <ClipboardList className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              <span className="text-sm sm:text-xl md:text-2xl">SURVEY</span>
            </Button>
          </div>
        </div>

        {/* Voting Date/Time Footer */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-lg sm:rounded-xl shadow-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 mt-2 sm:mt-4 md:mt-6">
          <p className="text-white font-bold text-[0.6rem] text-xs sm:text-sm md:text-base lg:text-lg text-center">
            मतदान : {electionInfo.votingDateMarathi} {electionInfo.votingTimeMarathi}
          </p>
        </div>

        {/* Election Commission Badge */}
        {/* <div className="text-center mt-2 sm:mt-4 md:mt-6">
          <p className="text-[#1A56A8] font-semibold text-xs sm:text-sm md:text-base">
            Election Commission of India | भारत निर्वाचन आयोग
          </p>
        </div> */}
      </div>
    </header>
  );
};

export default ElectionHeader;
