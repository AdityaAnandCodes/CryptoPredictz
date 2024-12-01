import { useState } from "react";
import SportsList from "@/components/SportsList";
import UpcomingMatches from "@/components/UpcomingMatches";
import LiveMatches from "@/components/LiveMatches";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Sports = () => {
  const [selectedSport, setSelectedSport] = useState<string>("All Matches");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name"); // Default sorting by name

  return (
    <>
      <Navbar />
      <div className="sm:hidden">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48 p-4" src="../../public/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {/* Sidebar or aside */}
        <div className="md:col-span-1 p-5 bg-gray-800 rounded-lg">
          <SportsList onSelectSport={setSelectedSport} />
        </div>

        {/* Main Content Section */}
        <div className="md:col-span-4 p-5 bg-gray-800 rounded-lg">
          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort dropdown */}
          <div className="mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="time">Sort by Time</option>
              <option value="teamA">Sort by Team A</option>
              <option value="teamB">Sort by Team B</option>
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
