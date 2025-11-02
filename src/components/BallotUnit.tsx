import { useState } from 'react';
import { candidates } from '@/config/candidates';
import { playBeep, playBuzzer, playVoteConfirmation } from '@/utils/sounds';
import VVPATPopup from './VVPATPopup';
import ElectionHeader from './ElectionHeader';
import lotusSymbol from '@/assets/bjp-7282.png';
import founderImg from '@/assets/founder-img.png';



const BallotUnit = () => {
  const [votedCandidate, setVotedCandidate] = useState<number | null>(null);
  const [indicatorStates, setIndicatorStates] = useState<{ [key: number]: 'off' | 'red' | 'green' }>({});
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [isVotingDisabled, setIsVotingDisabled] = useState(false);

  const handleVote = async (candidateId: number) => {
    if (isVotingDisabled) return;

    const candidate = candidates.find(c => c.id === candidateId);
    const hasName = candidate && candidate.name.trim() !== '';

    if (hasName) {
      // Correct vote - candidate with name
      setIndicatorStates({ ...indicatorStates, [candidateId]: 'green' });
      setVotedCandidate(candidateId);
      setSelectedCandidate(candidate);
      setIsVotingDisabled(true);

      // Play beep sound and wait for it to complete
      await playBeep();
      
      // Show VVPAT after beep sound completes
      playVoteConfirmation();
      setShowVVPAT(true);
    } else {
      // Wrong vote - empty candidate slot
      playBuzzer();
      setIndicatorStates({ ...indicatorStates, [candidateId]: 'red' });

      // Reset red indicator after 1 second
      setTimeout(() => {
        setIndicatorStates(prev => ({ ...prev, [candidateId]: 'off' }));
      }, 1000);
    }
  };

  const resetVoting = () => {
    setVotedCandidate(null);
    setIndicatorStates({});
    setShowVVPAT(false);
    setSelectedCandidate(null);
    setIsVotingDisabled(false);
  };

  return (
    <>
      <ElectionHeader />
      
      <div className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-4 bg-gradient-to-br from-background to-secondary pb-16 sm:pb-20">
        <div className="mb-2 sm:mb-4 md:mb-8 text-center px-2">
          {/* <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-[hsl(var(--evm-text))] mb-1 sm:mb-2">
            Electronic Voting Machine Simulator
          </h1> */}
          {/* <p className="text-xs sm:text-sm text-muted-foreground">Click on a button to cast your vote</p> */}
        </div>

        {/* EVM Ballot Unit */}
        <div className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
          {/* Outer Casing */}
          <div className="bg-gradient-to-br from-[hsl(var(--evm-casing))] to-[hsl(205_55%_60%)] rounded-lg sm:rounded-2xl md:rounded-3xl p-2 sm:p-4 md:p-6 shadow-2xl border-4 sm:border-6 md:border-8 border-[hsl(205_50%_55%)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 pb-2 sm:pb-3 border-b-2 border-[hsl(205_40%_50%)]">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isVotingDisabled ? 'bg-red-500' : 'bg-green-500'} animate-pulse shadow-lg`}></div>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {isVotingDisabled ? 'Voted' : 'Ready'}
                </span>
              </div>
              <div className="bg-[hsl(220_45%_45%)] px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded text-white text-xs sm:text-sm font-bold shadow-md">
                Ballot Unit
              </div>
            </div>

            {/* Ballot Paper Area */}
            <div className="bg-[hsl(var(--evm-ballot))] rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-6 shadow-inner border-2 sm:border-3 md:border-4 border-gray-300">
              <div className="space-y-0">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center border-b border-gray-400 last:border-b-0 py-1 sm:py-2 md:py-3 hover:bg-gray-50 transition-colors"
                  >
                    {/* Serial Number */}
                    <div className="w-6 sm:w-8 md:w-12 flex-shrink-0 text-center border-r border-gray-400 pr-1 sm:pr-2">
                      <span className="text-xs sm:text-sm md:text-lg font-bold text-[hsl(var(--evm-text))]">
                        {candidate.id}
                      </span>
                    </div>

                    {/* Candidate Info */}
                    <div className="flex-1 px-1 sm:px-2 md:px-3 lg:px-4 min-h-[40px] sm:min-h-[50px] md:min-h-[60px] flex items-center">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full">
                        {/* Name Section - Single line with ellipsis */}
                        <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                          {candidate.name ? (
                            <div className="space-y-0.5 sm:space-y-1">
                              <p className="font-black text-[0.65rem] sm:text-sm md:text-base lg:text-lg text-[hsl(var(--evm-text))] whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                                {candidate.nameMarathi || candidate.name}
                              </p>
                              <p className="font-semibold text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                                {candidate.partyMarathi || candidate.party}
                              </p>
                            </div>
                          ) : (
                              <div className="h-6 sm:h-8 md:h-10"></div>
                          )}
                        </div>

                        {/* Candidate Photo Section - Fixed size */}
                        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border border-gray-400 rounded flex items-center justify-center bg-white flex-shrink-0">
                          {candidate.photo && candidate.name ? (
                            <img
                              src={founderImg}
                              alt={candidate.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : null}
                        </div>

                        {/* Symbol Section - Fixed size */}
                         <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border border-gray-400 rounded flex items-center justify-center bg-white flex-shrink-0">
                          {candidate.symbol && candidate.name ? (
                            <img
                              src={lotusSymbol}
                              alt={candidate.party}
                             className="w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12 object-contain"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Indicator Light */}
                     <div className="w-8 sm:w-10 md:w-16 flex-shrink-0 flex justify-center border-l border-r border-gray-400 px-1 sm:px-2">
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full border transition-all duration-300 ${
                          indicatorStates[candidate.id] === 'green'
                            ? 'bg-[hsl(var(--evm-indicator-green))] border-green-700 shadow-lg shadow-green-500/50'
                            : indicatorStates[candidate.id] === 'red'
                            ? 'bg-[hsl(var(--evm-indicator-red))] border-red-700 shadow-lg shadow-red-500/50'
                            : 'bg-gray-300 border-gray-400'
                        }`}
                      ></div>
                    </div>

                    {/* Vote Button */}
                    <div className="w-12 sm:w-16 md:w-24 flex-shrink-0 flex justify-center pl-1 sm:pl-2">
                      <button
                        onClick={() => handleVote(candidate.id)}
                        disabled={isVotingDisabled}
                        className={`w-10 h-6 sm:w-14 sm:h-8 md:w-20 md:h-10 rounded-full font-bold text-white shadow-lg transition-all duration-200 flex items-center justify-center ${
                          isVotingDisabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#1e3a8a] hover:bg-[#1e40af] active:scale-95 hover:shadow-xl'
                        }`}
                      >
                        <span className="text-[8px] sm:text-[10px] md:text-xs leading-none">VOTE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Screws/Details */}
            <div className="flex justify-between mt-2 sm:mt-3 md:mt-4 px-4 sm:px-6 md:px-8">
              <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[hsl(205_40%_40%)] shadow-inner"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[hsl(205_40%_40%)] shadow-inner"></div>
            </div>
          </div>

          {/* Reset Button */}
          {isVotingDisabled && !showVVPAT && (
            <div className="mt-3 sm:mt-4 md:mt-6 text-center">
              <button
                onClick={resetVoting}
                className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(210_60_50%)] text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
              >
                Reset Voting Machine
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VVPAT Popup */}
      {showVVPAT && selectedCandidate && (
        <VVPATPopup candidate={selectedCandidate} onClose={resetVoting} />
      )}
    </>
  );
};

export default BallotUnit;
