import React from "react";

const Features: React.FC = () => {
  return (
    <div className="text-white py-2 px-4 md:px-12">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-white">Key Features</h2>
      <div className="md:grid md:grid-cols-2 gap-4">
        {/* Feature 1 */}
        <div className="flex gap-4 items-center mb-8 md:flex-row md:items-start bg-gray-900 bg-opacity-90 rounded-lg p-6 hover:scale-95 duration-300 transition-all">
          <div className="w-20 h-20 mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
            {/* Feature Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-notebook-tabs"
            >
              <path d="M2 6h4" />
              <path d="M2 10h4" />
              <path d="M2 14h4" />
              <path d="M2 18h4" />
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <path d="M15 2v20" />
              <path d="M15 7h5" />
              <path d="M15 12h5" />
              <path d="M15 17h5" />
            </svg>
          </div>
          <div className="text-left ">
            <h3 className="text-lg font-semibold mb-2">Instant Bet Placements</h3>
            <p className="text-gray-400 text-base">Place bets instantly with our easy-to-use interface.</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex gap-4 items-center mb-8 md:flex-row md:items-start bg-gray-900 bg-opacity-90 rounded-lg p-6 hover:scale-95 duration-300 transition-all">
          <div className="w-20 h-20 mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
            {/* Feature Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-timer"
            >
              <line x1="10" x2="14" y1="2" y2="2" />
              <line x1="12" x2="15" y1="14" y2="11" />
              <circle cx="12" cy="14" r="8" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Real-Time Odds</h3>
            <p className="text-gray-400 text-base">Get live, updated odds to make informed bets.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex gap-4 items-center mb-8 md:flex-row md:items-start bg-gray-900 bg-opacity-90 rounded-lg p-6 hover:scale-95 duration-300 transition-all">
          <div className="w-20 h-20 mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
            {/* Feature Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-landmark"
            >
              <line x1="3" x2="21" y1="22" y2="22" />
              <line x1="6" x2="6" y1="18" y2="11" />
              <line x1="10" x2="10" y1="18" y2="11" />
              <line x1="14" x2="14" y1="18" y2="11" />
              <line x1="18" x2="18" y1="18" y2="11" />
              <polygon points="12 2 20 7 4 7" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Easy Withdrawals</h3>
            <p className="text-gray-400 text-base">Withdraw your funds easily and quickly.</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex gap-4 items-center mb-8 md:flex-row md:items-start bg-gray-900 bg-opacity-90 rounded-lg p-6 hover:scale-95 duration-300 transition-all">
          <div className="w-20 h-20 mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
            {/* Feature Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-400 text-base">Your data and bets are always protected.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
