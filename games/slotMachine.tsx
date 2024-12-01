import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [slots, setSlots] = useState(["🍒", "🍊", "🍉"]); // Initial slot symbols
  const [result, setResult] = useState("");
  const [balance, setBalance] = useState(100); // Starting balance

  const symbols = ["🍒", "🍊", "🍉", "🍇", "🍓"];

  const spinSlotMachine = () => {
    setIsSpinning(true);
    setResult("");

    const spinInterval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100); // Change symbols every 100ms for the spinning effect

    setTimeout(() => {
      clearInterval(spinInterval); // Stop the spinning after 2 seconds
      const finalSlots = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setSlots(finalSlots);

      const win = finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2];
      setResult(win ? `🎉 You Win $10! 🎉` : `😢 You Lose $5.`);
      setBalance((prevBalance) => (win ? prevBalance + 10 : prevBalance - 5));
      setIsSpinning(false);
    }, 2000); // Spin duration: 2 seconds
  };

  return (
    <>
    <Navbar />
    <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <button className="pb-2 font-semibold text-white">Logout</button>
      </div>
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">🎰<span> </span> Slot Machine <span> </span>🎰</h1>
      <div className="text-lg bg-gray-700 bg-opacity-90 p-4 rounded-lg mb-6 w-[24rem]">
        <p>Fee: $5 | Win: $10</p>
      </div>
      <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg w-[24rem]">
        <h2 className="text-xl mb-4">Your Balance: ${balance}</h2>
        <div className="flex justify-center mb-4 space-x-4">
          {slots.map((slot, index) => (
            <span
              key={index}
              className="inline-block text-center leading-none"
              style={{ fontSize: "3rem", lineHeight: "1" }} // Explicitly set large size
            >
              {slot}
            </span>
          ))}
        </div>
        <button
          onClick={spinSlotMachine}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-xl font-semibold disabled:bg-gray-500"
          disabled={isSpinning || balance <= 0}
        >
          {isSpinning ? "Spinning..." : "Spin!"}
        </button>
        <p className="mt-4 text-lg">{result}</p>
      </div>
    </div>
    </>
  );
};

export default SlotMachine;
