import React from "react";
import SportsList from "@/components/SportsList";
import UpcomingMatches from "@/components/UpcomingMatches";
import LiveMatches from "@/components/LiveMatches";

const Sports = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
      {/* Sidebar or aside */}
      <div className="md:col-span-1 p-5 bg-gray-800 rounded-lg">
        <SportsList />
      </div>

      {/* Main Content Section */}
      <div className="md:col-span-4 p-5 bg-gray-800 rounded-lg">
        {/* You can place your upcoming matches or other details here */}
        <UpcomingMatches />
        <LiveMatches />
      </div>
    </div>
  );
};

export default Sports;
