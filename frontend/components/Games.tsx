

const Games = () => {
  return (
    <section className="min-h-fit w-full p-4 flex flex-col justify-center items-center gap-8">
      {/* Blackjack Game Section */}
      <div className="font-bold text-3xl "> Casino Games </div>
      <div className="flex justify-center items-center gap-8">
      <div className="relative w-64 h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <a href="/games/blackjack" >
          <a className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold">
            <div className="text-center p-4">
              <h3 className="mb-2">Blackjack</h3>
              <p>Test your luck with this classic casino game.</p>
            </div>
          </a>
        </a>
      </div>

      {/* Slot Machine Game Section */}
      <div className="relative w-64 h-64 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <a href="/games/slotmachine">
          <a className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold">
            <div className="text-center p-4">
              <h3 className="mb-2">Slot Machine</h3>
              <p>Spin the reels and try to win big!</p>
            </div>
          </a>
        </a>
      </div>
      </div>
    </section>
  );
};

export default Games;
