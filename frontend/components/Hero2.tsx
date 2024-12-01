import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="min-h-fit p-4">
      <div className="flex md:space-x-4 space-x-6 md:overflow-visible overflow-x-auto scrollbar-hide">
        {/* Block 1 */}
        <div className="flex-shrink-0 h-48 hero-1 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[330px]">
          <div>Get Cashback from every bet you put</div>
        </div>

        {/* Block 2 */}
        <div className="flex-shrink-0 h-48 hero-2 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold md:flex-1 w-[330px]">
          Rakeback Deals
        </div>

        {/* Block 3 */}
        <div className="flex-shrink-0 h-48 hero-3 rounded-lg shadow-lg flex items-center justify-Between p-4 text-white text-lg font-bold md:flex-1 w-[330px]">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">We Accept All Payment methods</div>
            <div className="text-sm font-semibold text-gray-200">Deposit Money Easily</div>
            <div className="bg-green-700 max-sm:text-sm  text-base bg-opacity-50 rounded-lg w-fit p-2 px-4">Deposit Money</div>
          </div>
          <img src="/rb_5334.png" className="w-40 h-40"/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
