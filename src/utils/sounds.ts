// Sound utilities for EVM

// export const playBeep = () => {
//   return new Promise<void>((resolve) => {
//     const audio = new Audio('/audio/correct.wav');
//     audio.onended = () => resolve();
//     audio.play().catch(err => {
//       console.error('Error playing correct audio:', err);
//       resolve();
//     });
//   });
// };

// let isIntroPlaying = false;

// export const playIntro = () => {
//   if (isIntroPlaying) return;
  
//   isIntroPlaying = true;
//   const audio = new Audio('/audio/intro.mp3');
  
//   audio.onended = () => {
//     isIntroPlaying = false;
//   };
  
//   audio.onerror = () => {
//     isIntroPlaying = false;
//   };
  
//   audio.play().catch(err => {
//     console.error('Error playing intro audio:', err);
//     isIntroPlaying = false;
//   });
// };

// export const playBuzzer = () => {
//   const audio = new Audio('/audio/error.mp3');
//   audio.play().catch(err => console.error('Error playing error audio:', err));
// };

// export const playVoteConfirmation = () => {
//   const audio = new Audio('/audio/vote-confirmation.mp3');
//   audio.play().catch(err => console.error('Error playing confirmation audio:', err));
// };

// Sound utilities for EVM

const base = import.meta.env.BASE_URL; // ✅ ensures correct folder path (/hemantrasane/)

export const playBeep = () => {
  return new Promise<void>((resolve) => {
    const audio = new Audio(`${base}audio/correct.wav`);
    audio.onended = () => resolve();
    audio.play().catch(err => {
      console.error('Error playing correct audio:', err);
      resolve();
    });
  });
};

let isIntroPlaying = false;

export const playIntro = () => {
  if (isIntroPlaying) return;
  
  isIntroPlaying = true;
  const audio = new Audio(`${base}audio/intro.mp3`);
  
  audio.onended = () => {
    isIntroPlaying = false;
  };
  
  audio.onerror = () => {
    isIntroPlaying = false;
  };
  
  audio.play().catch(err => {
    console.error('Error playing intro audio:', err);
    isIntroPlaying = false;
  });
};

export const playBuzzer = () => {
  const audio = new Audio(`${base}audio/error.mp3`);
  audio.play().catch(err => console.error('Error playing error audio:', err));
};

export const playVoteConfirmation = () => {
  const audio = new Audio(`${base}audio/vote-confirmation.mp3`);
  audio.play().catch(err => console.error('Error playing confirmation audio:', err));
};
