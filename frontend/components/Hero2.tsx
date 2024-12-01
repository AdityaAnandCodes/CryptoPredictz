import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="min-h-fit p-4">
      <div className="flex md:space-x-4 space-x-6 md:overflow-visible overflow-x-auto scrollbar-hide">
        {/* Block 1 */}
        <div className="flex-shrink-0 h-60 hero-1 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[330px] relative">
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            <div className="text-5xl font-bold mt-5 ml-5">Place Bet Earn Money</div>
            <div className="text-xl px-5 font-semibold text-gray-200">Protected With Blockchain</div>
            <div className="bg-orange-700 ml-5 max-sm:text-sm text-base bg-opacity-50 rounded-lg w-fit p-2 px-4">
              Place Bets
            </div>
          </div>
          <img src="/rb_3901.png" className="absolute bottom-2 right-2 w-40 h-40" />
        </div>

        {/* Block 2 */}
        <div className="flex-shrink-0 h-60 hero-2 rounded-lg shadow-lg flex items-center justify-between p-4 text-white text-lg font-bold md:flex-1 w-[330px] relative overflow-hidden">
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            <div className="text-5xl font-bold mt-5 ml-5">Play Games Earn Exciting Prize</div>
            <div className="text-xl px-5 font-semibold text-gray-200">Different Casino Games</div>
            <div className="bg-cyan-400 ml-5 max-sm:text-sm text-base bg-opacity-50 rounded-lg w-fit p-2 px-4">
              Play Games
            </div>
          </div>
          <img
            className="absolute bottom-2 right-2 w-40 h-40"
            src="/public/cute-cool-shiba-inu-dog-holding-baseball-bat-cartoon-vector-icon-illustration-animal-sport-icon-concept-isolated-premium-vector-flat-cartoon-style.png"
          />
        </div>

        {/* Block 3 - Updated */}
        <div className="flex-shrink-0 h-60 hero-3 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[330px] relative">
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            <div className="text-5xl font-bold mt-5 ml-5">Log in and Earn Rewards</div>
            <div className="text-xl px-5 font-semibold text-gray-200">Exciting Rewards</div>
            <div className="bg-green-700 ml-5 max-sm:text-sm text-base bg-opacity-50 rounded-lg w-fit p-2 px-4">
              Earn Rewards
            </div>
          </div>
          <img src="/rb_5334.png" className="absolute bottom-2 right-2 w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
