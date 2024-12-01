import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { Copy } from "lucide-react";

const getCurrentDate = () => {
  const { logOut } = useOkto() as OktoContextType;
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const updateLoginStreak = () => {
  const currentDate = getCurrentDate();
  const storedLogins = JSON.parse(localStorage.getItem("loginStreak") || "[]");

  if (storedLogins[storedLogins.length - 1] === currentDate) {
    return storedLogins;
  }

  storedLogins.push(currentDate);

  const streakStart =
    storedLogins.length >= 2 ? storedLogins[storedLogins.length - 2] : null;
  const isConsecutive = streakStart
    ? new Date(currentDate).getDate() - new Date(streakStart).getDate() === 1
    : true;

  if (!isConsecutive) {
    storedLogins.length = 0;
    storedLogins.push(currentDate);
  }

  localStorage.setItem("loginStreak", JSON.stringify(storedLogins));
  return storedLogins;
};

const Rewards = () => {
  const [loginStreak, setLoginStreak] = useState<number>(0);
  const [reward, setReward] = useState<boolean>(false);

  useEffect(() => {
    const storedLogins = updateLoginStreak();
    const streakLength = storedLogins.length;

    setLoginStreak(streakLength);

    if (streakLength >= 7) {
      setReward(true);
    }
  }, []);

  return (
    <section className=" min-h-dvh text-white max-sm:pb-44">
      <Navbar />
      <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <div className="flex justify-center items-center gap-2 " >
           <button className="text-sm bg-white text-black transition-all font-light flex items-center justify-center gap-2 rounded-xl py-2 p-1"><Copy /> 0x...</button>
        <button className="pb-2 font-semibold text-sm" onClick={logOut}>
          Logout
        </button>
        </div>
      </div>
      <div className="w-full max-h-dvh  mt-12 py-24 max-sm:mt-0 max-sm:mb-20 px-4 max-sm:py-4 max-sm:px-4 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl shadow-lg">
  {/* First row: Hero Block (spans 2 columns) */}
  <div className="col-span-1 md:col-span-2 flex-shrink-0 h-60 hero-3 rounded-lg shadow-lg flex items-center justify-between p-4 text-white text-lg font-bold relative overflow-hidden">
    <div className="absolute top-2 left-2 flex flex-col gap-4 p-4">
      <div className="text-4xl max-sm:text-3xl font-bold mt-5 ml-5 mr-5">
        Log in Daily and Earn Rewards
      </div>
      <div className="text-lg max-sm:text-base px-5 font-semibold text-gray-100">
        Earn Exciting Rewards
      </div>
      <div className="bg-green-700 ml-5 max-sm:text-sm text-base bg-opacity-50 rounded-lg w-fit p-2 px-4">
        Get Rewards Here
      </div>
    </div>
    <img src="/rb_5334.png" className="absolute bottom-2 right-2 max-sm:right-0  max-sm:w-40 max-sm:h-40 h-60 w-60" />
  </div>

  {/* First row: Keep Going Section (spans 1 column) */}
  <div className="col-span-1 bg-gray-900 p-6 rounded-lg">
    {reward ? (
      <div className="bg-green-600 p-6 rounded-lg text-center animate__animated animate__fadeIn">
        <h3 className="text-2xl font-semibold mb-4">Congratulations!</h3>
        <p className="text-lg mb-4">
          You've logged in for 7 consecutive days and earned a ticket!
        </p>
        <button className="py-2 px-6 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition duration-300">
          Claim Your Ticket
        </button>
      </div>
    ) : (
      <div className="bg-gray-900 flex flex-col justify-center items-center p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">Keep Going!</h3>
        <p className="text-lg text-gray-300">
          Log in for 7 consecutive days to earn a reward!
        </p>
      </div>
    )}
  </div>

  {/* Second row: Login Streak Progress Section (spans 2 columns) */}
  <div className="col-span-1 md:col-span-2 bg-gray-900 p-6 rounded-lg">
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
     

  {/* Reward Section */}
  
</div>
<div className="col-span-1 bg-gray-900 p-4 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">Reward History</h3>
    <ul>
      <li className="text-gray-300 mb-2">
        🎟️ 7-day streak - Ticket Earned (Nov 25, 2024)
      </li>
      <li className="text-gray-300 mb-2">
        🎟️ 7-day streak - Ticket Earned (Nov 18, 2024)
      </li>
      <li className="text-gray-300 mb-2">
        🎟️ 7-day streak - Ticket Earned (Nov 11, 2024)
      </li>
    </ul>
  </div>
  </div>

  {/* Second row: Reward History Section (spans 1 column) */}
 


    </section>
  );
};

export default Rewards;
