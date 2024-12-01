import Navbar from '@/components/Navbar';
import React from 'react';

const InviteFriends = () => {
  return (
    <>
    <Navbar />
    <div className="text-white min-h-screen flex flex-col items-center py-12">
      {/* Title Section */}
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400 mb-8">
        Invite & Earn Rewards
      </h1>

      {/* Invitation Section */}
      <div className=" w-full max-w-sm p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Invite a Friend</h2>
        <p className="text-lg text-gray-400 mb-6 text-center">
          Share your invite link and earn a reward for each friend who signs up and joins!
        </p>
        
        <div className="flex justify-center mb-6">
          <button className="py-3 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
            Copy Invite Link
          </button>
        </div>

        {/* Reward Info Section */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">How It Works</h3>
          <p className="text-gray-300 text-sm mb-2">1. Invite your friends to join the app.</p>
          <p className="text-gray-300 text-sm mb-2">2. Once they sign up, you'll both earn rewards.</p>
          <p className="text-gray-300 text-sm">3. Earn a ticket for every friend who joins.</p>
        </div>

        {/* Rewards Earned Section */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Rewards</h3>
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-400">Total Tickets Earned</p>
            <p className="text-lg font-bold text-green-400">5</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-400">Friends Invited</p>
            <p className="text-lg font-bold text-blue-400">8</p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-8 text-center">
          <button className="py-2 px-8 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300">
            Invite More Friends
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default InviteFriends;
