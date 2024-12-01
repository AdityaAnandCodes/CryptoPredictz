import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="min-h-fit p-5">
      <div className="flex w-full">
        {/* Block 1 */}
        <div className="flex-1 h-40 hero-1 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold mx-2">
        
          Cashback Offers
        </div>

        {/* Block 2 */}
        <div className="flex-1 h-40 hero-2 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold mx-2">
          Rakeback Deals
        </div>

        {/* Block 3 */}
        <div className="flex-1 h-40 hero-3 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold mx-2">
          Payment Methods
        </div>
      </div>
    </div>
  );
};

export default Hero;
