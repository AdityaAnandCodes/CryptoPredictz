import React from "react";

const Hero = () => {
  return (
    <section className="min-h-fit max-sm:min-h-fit w-full p-4 py-8">
      {/* Purple Div */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-800 w-full min-h-80 max-sm:min-h-40 rounded-lg flex flex-col md:flex-row justify-between items-center overflow-hidden p-4">
        <div className="text-white flex-1 text-center md:text-left px-6 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Win Big with CryptoBetz
          </h1>
          <p className="text-lg mb-6">
            Join the exciting world of sports betting and earn rewards. Bet on your favorite games and claim your share of the winnings!
          </p>
          <button className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
            Start Betting Now
          </button>
        </div>

        <div className="flex-1 w-full flex justify-center px-4 md:justify-end">
          <img
            src="/PandaWithMoney.png"
            alt="Panda with money"
            className="w-64 md:w-80 max-sm:w-64 object-contain"
          />
        </div>
      </div>

      {/* Section Below the Purple Div (Hidden on Mobile) */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 hidden sm:grid">
        <div className="flex items-center gap-8 bg-slate-800 bg-opacity-30 p-6 rounded-lg text-white h-28 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad-2"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>
          <div>
            <h3 className="text-lg font-bold">Casino</h3>
            <p>All casino games</p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-slate-800 bg-opacity-30 p-6 rounded-lg text-white h-28 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          <div>
            <h3 className="text-lg font-bold">Sports</h3>
            <p>Betting and live betting</p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-slate-800 bg-opacity-30 p-6 rounded-lg text-white h-28 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-receipt"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>
          <div>
            <h3 className="text-lg font-bold">Bonuses</h3>
            <p>Many bonuses daily</p>
          </div>
        </div>
        <div className="flex items-center gap-8 bg-slate-800 bg-opacity-30 p-6 rounded-lg text-white h-28 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-contact"><path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="3"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
          <div>
            <h3 className="text-lg font-bold">Affiliates</h3>
            <p>Invite friends and earn</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
