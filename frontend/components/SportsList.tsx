import React from "react";
import { sportsList } from "@/constants"; // Import the sportsList from constants

const SportsList = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sports</h2>
      <ul className="space-y-3">
        {sportsList.map((sport) => (
          <li
            key={sport.id}
            className="flex items-center gap-4 py-2 px-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
          >
            <img src={sport.image} alt={sport.name} className="w-8 h-8 rounded" />
            <span className="text-lg font-medium text-white">{sport.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsList;
