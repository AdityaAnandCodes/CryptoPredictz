import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="min-h-fit p-4">
      <div className="flex md:space-x-4 space-x-6 md:overflow-visible overflow-x-auto scrollbar-hide">
        {/* Block 1 */}
        <div className="flex-shrink-0 h-48 hero-1 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[350px]">
          <div>Get Cashback from every bet you put</div>
        </div>

        {/* Block 2 */}
        <div className="flex-shrink-0 h-48 hero-2 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[350px]">
          Rakeback Deals
        </div>

        {/* Block 3 */}
        <div className="flex-shrink-0 h-48 hero-3 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[350px]">
          Payment Methods
        </div>
      </div>
    </div>
  );
};

export default Hero;
