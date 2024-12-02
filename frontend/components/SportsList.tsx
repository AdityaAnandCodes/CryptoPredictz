import React from "react";
import { sportsList } from "@/constants"; // Import the sportsList from constants

const SportsList = ({ onSelectSport }: { onSelectSport: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 hidden sm:block">Sports</h2>

      {/* Vertical list for larger screens */}
      <ul className="hidden sm:block space-y-4">
        <li
          className="flex items-center gap-4 py-2 px-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
          onClick={() => onSelectSport("All Matches")}
        >
          <span className="text-lg font-medium text-white truncate w-full text-left">All Matches</span>
        </li>

        {sportsList.map((sport) => (
          <li
            key={sport.id}
            className="flex items-left gap-4 py-2 px-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectSport(sport.name)}
          >
            <img src={sport.image} alt={sport.name} className="w-8 h-8 rounded-full" />
            <span className="text-lg font-medium text-white truncate w-full text-left">{sport.name}</span>
          </li>
        ))}
      </ul>

      {/* Horizontal scroll for mobile */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:hidden">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => onSelectSport("All Matches")}>
          <img src="../../public/all.avif" alt="All Matches" className="w-12 h-12 object-cover rounded-full" />
          <span className="text-sm text-white mt-1 truncate w-16 text-center">All</span>
        </div>
        {sportsList.map((sport) => (
          <div
            key={sport.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onSelectSport(sport.name)}
          >
            <img src={sport.image} alt={sport.name} className="w-12 h-12 rounded-full" />
            <span className="text-sm text-white mt-1 truncate w-16 text-center">{sport.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsList;
