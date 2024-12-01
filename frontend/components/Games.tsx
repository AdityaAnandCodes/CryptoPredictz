const Games = () => {
  return (
    <section className="min-h-fit w-screen p-4 flex flex-col justify-center items-center gap-8">
      {/* Title Section */}
      <div className="font-bold text-3xl">Casino Games</div>

      {/* Game Sections */}
      <div className="flex justify-center items-center gap-6 max-w-full max-sm:flex-col">
        {/* Blackjack Game Section */}
        <div className="relative w-64 h-64 blackJack rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <a href="/games/blackjack" className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold">
            <div className="text-center p-4"></div>
          </a>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>

        {/* Slot Machine Game Section */}
        <div className="relative slotMachine w-64 h-64 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <a href="/games/slotmachine" className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold">
            <div className="text-center p-4"></div>
          </a>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Games;
