import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

// Utility function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

// Function to check and update login streak
const updateLoginStreak = () => {
  const currentDate = getCurrentDate();
  const storedLogins = JSON.parse(localStorage.getItem('loginStreak') || "[]");

  // Check if the user has already logged in today
  if (storedLogins[storedLogins.length - 1] === currentDate) {
    return storedLogins; // No update needed if the user logged in today already
  }

  // Add the current date to the login streak
  storedLogins.push(currentDate);

  // Check if the streak is broken (no consecutive dates)
  const streakStart = storedLogins.length >= 2 ? storedLogins[storedLogins.length - 2] : null;
  const isConsecutive = streakStart
    ? new Date(currentDate).getDate() - new Date(streakStart).getDate() === 1
    : true;

  if (!isConsecutive) {
    // Reset the streak if it's not consecutive
    storedLogins.length = 0;
    storedLogins.push(currentDate); // Start fresh
  }

  // Save the updated login streak
  localStorage.setItem('loginStreak', JSON.stringify(storedLogins));

  return storedLogins;
};

const Rewards = () => {
  const [loginStreak, setLoginStreak] = useState<number>(0);
  const [reward, setReward] = useState<boolean>(false);

  // On page load, update the login streak
  useEffect(() => {
    const storedLogins = updateLoginStreak();
    const streakLength = storedLogins.length;

    setLoginStreak(streakLength);

    // If user has logged in for 7 consecutive days, reward them with a ticket
    if (streakLength >= 7) {
      setReward(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className=" text-white min-h-screen flex flex-col items-center pt-4 pb-10">
        <div className="w-full max-w-4xl mx-4 p-6  rounded-xl shadow-lg">
          {/* Title Section */}
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Rewards
          </h1>

          {/* Login Streak Progress Section */}
          <div className="bg-gray-900 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Your Login Streak</h3>
            <p className="text-lg font-medium text-gray-400">
              {loginStreak} day{loginStreak === 1 ? "" : "s"} logged in
            </p>
            <div className="w-full h-2 bg-gray-500 rounded-full mt-4">
              <div
                className="h-2 bg-green-600 rounded-full"
                style={{ width: `${(loginStreak / 7) * 100}%` }}
              ></div>
            </div>
            {loginStreak >= 7 && (
              <div className="mt-4 text-center text-lg font-bold text-green-400">
                You've hit 7 days! Claim your reward below.
              </div>
            )}
          </div>

          {/* Reward Section */}
          {reward ? (
            <div className="bg-green-600 p-6 rounded-lg mb-6 text-center animate__animated animate__fadeIn">
              <h3 className="text-2xl font-semibold mb-4">Congratulations!</h3>
              <p className="text-lg mb-4">
                You've logged in for 7 consecutive days and earned a ticket!
              </p>
              <button className="py-2 px-6 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition duration-300">
                Claim Your Ticket
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 p-6 rounded-lg mb-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Keep Going!</h3>
              <p className="text-lg text-gray-300">Log in for 7 consecutive days to earn a reward!</p>
            </div>
          )}

          {/* Reward History Section */}
          <div className="bg-gray-900 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Reward History</h3>
            <ul>
              <li className="text-gray-300 mb-2">🎟️ 7-day streak - Ticket Earned (Nov 25, 2024)</li>
              <li className="text-gray-300 mb-2">🎟️ 7-day streak - Ticket Earned (Nov 18, 2024)</li>
              <li className="text-gray-300 mb-2">🎟️ 7-day streak - Ticket Earned (Nov 11, 2024)</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center mt-8">
            <button
              className="py-2 px-8 bg-purple-600 rounded-full text-white hover:bg-purple-900 transition duration-300"
              onClick={() => window.location.reload()} // Simulate another login
            >
              Log In Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewards;
