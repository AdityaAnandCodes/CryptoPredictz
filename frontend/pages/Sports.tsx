import { useState } from "react";
import SportsList from "@/components/SportsList";
import UpcomingMatches from "@/components/UpcomingMatches";
import LiveMatches from "@/components/LiveMatches";
import Navbar from "@/components/Navbar";
import Navmini from "@/components/Navmini";

const Sports = () => {
  const [selectedSport, setSelectedSport] = useState<string>("All Matches");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name"); // Default sorting by name

  return (
    <>
      <Navbar />
      <Navmini />
      <div className="p-4">
        <div className="w-full h-60 max-sm:h-52 sportsHero rounded-2xl mt-16 max-sm:mt-0 flex justify-between p-4 px-12 max-sm:px-4 items-center  shadow-lg relative overflow-hidden">
          {/* Left Text Section */}
          <div className="text-white z-10 max-w-md">
            <h1 className="text-4xl max-sm:text-base font-bold mb-2">Bet on Your Favorite Sports</h1>
            <p className="text-lg max-sm:text-sm mb-4">
              The odds are in your favor! Place your bets and enjoy the thrill of the game.
            </p>
            <button className="bg-white text-purple-600 font-semibold px-6 max-sm:px-2 max-sm:text-base py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all">
              <a href="#bets">See Predictions Now</a>
            </button>
          </div>

          {/* Right Image Section */}
          <img className="w-80 max-sm:w-40 h-auto z-10" src="/Basketball.png" alt="Basketball" />

          {/* Decorative Element */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-black/20 rounded-2xl"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
        {/* Sidebar or aside */}
        <div className="md:col-span-1 p-2 bg-black min-h-screen max-sm:min-h-fit bg-opacity-50 rounded-3xl">
          <SportsList onSelectSport={setSelectedSport} />
        </div>

        {/* Main Content Section */}
        <div className="md:col-span-4 p-2 bg-opacity-50 min-h-screen bg-black rounded-lg">
          {/* Search and Sort Bar */}
          <div
            id="bets"
            className="flex gap-3 max-sm:gap-0 sm:flex-row max-sm:flex-col max-sm:items-start mb-4 mt-16 max-sm:mt-4 max-sm:px-4  g-3"
          >
            <input
              type="text"
              className="w-full sm:w-2/3 max-sm:w-full max-sm:mt-0 max-sm:mb-3 h-10 p-2 bg-gray-700 text-white rounded-lg"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-1/3 max-sm:w-full max-sm:mt-3 h-10 p-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>

          {/* Live Matches */}
          <UpcomingMatches selectedSport={selectedSport} searchQuery={searchQuery} sortOption={sortOption} />
          <LiveMatches selectedSport={selectedSport} searchQuery={searchQuery} sortOption={sortOption} />
        </div>
      </div>
    </>
  );
};

export default Sports;
