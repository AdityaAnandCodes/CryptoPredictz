import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Assuming Card is imported from a UI component library

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  time: string;
  team1: string;
  team1Image: string;
  team2: string;
  team2Image: string;
  odds: number[];
}

export default function BettingModal({
  isOpen,
  onClose,
  title,
  time,
  team1,
  team1Image,
  team2,
  team2Image,
  odds,
}: BettingModalProps) {
  const [betAmount, setBetAmount] = useState<number>(1); // Default bet amount

  const handleBetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and set the bet amount, with a minimum value of 1
    const value = event.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    if (value === "" || parseFloat(value) < 1) {
      setBetAmount(1); // Ensure the bet amount can't go below 1
    } else {
      setBetAmount(parseFloat(value));
    }
  };

  const handleIncrease = () => setBetAmount((prev) => prev + 1); // Increase the bet amount by 1
  const handleDecrease = () => setBetAmount((prev) => (prev > 1 ? prev - 1 : 1)); // Decrease the bet amount, but prevent it from going below 1

  const handlePlaceBet = () => {
    console.log("Bet placed with amount:", betAmount);
    // Handle bet placement logic here
    onClose(); // Close the modal after placing the bet
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-sky-100 bg-opacity-40">
        {/* <div className="bg-sky-200 bg-opacity-80 p-6 rounded-md w-96 shadow-lg relative z-60"> */}
          <Card className="relative border-4 border-black">
            <CardHeader className="px-8 py-4 bg-gray-200 rounded-t-2xl text-left">
              <p className="text-xs font-medium text-gray-400">{title}</p>
              <p className="text-xs text-gray-500">{time}</p>
            </CardHeader>
            <CardContent className="px-8 py-4 text-left bg-gray-100 rounded-b-2xl">
              <div className="flex flex-col items-start mb-3 gap-2">
                <div className="flex items-center space-x-4">
                  <img src={team1Image} alt={team1} className="h-10 w-10 rounded-full " />
                  <span className="text-sm font-semibold text-gray-800">{team1}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <img src={team2Image} alt={team2} className="h-10 w-10 rounded-full " />
                  <span className="text-sm font-semibold text-gray-800">{team2}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-zinc-800 rounded-md">
                  <p className="text-sm font-bold text-sky-600">{odds[0]}</p>
                  <p className="text-xs text-gray-400">1</p>
                </div>
                <div className="p-2 bg-zinc-800 rounded-md">
                  <p className="text-sm font-bold text-sky-600">{odds[1]}</p>
                  <p className="text-xs text-gray-400">X</p>
                </div>
                <div className="p-2 bg-zinc-800 rounded-md">
                  <p className="text-sm font-bold text-sky-600">{odds[2]}</p>
                  <p className="text-xs text-gray-400">2</p>
                </div>
              </div>

              {/* Bet Amount Input Field */}
              <div className="mt-4">
                <label htmlFor="bet-amount" className="text-black text-sm block mb-1">
                  Amount
                </label>
                <div className="flex items-center space-x-2">
                  <button onClick={handleDecrease} className="bg-zinc-800 text-white p-2 rounded-xl px-4">
                    -
                  </button>
                  <input
                    id="bet-amount"
                    type="text" // Changed to text input field
                    value={betAmount}
                    onChange={handleBetAmountChange}
                    className="bg-zinc-800 text-white p-2 rounded-md w-full text-center"
                    min="1"
                    pattern="[0-9]*" // Allow only numeric input
                  />
                  <button onClick={handleIncrease} className="bg-zinc-800 text-white p-2 rounded-xl px-4">
                    +
                  </button>
                </div>
              </div>

              {/* Place Bet Button */}
              <div className="mt-4">
                <button
                  onClick={handlePlaceBet}
                  className="w-full  bg-gradient-to-br  from-green-400 to-green-500 text-white p-2 rounded-md hover:scale-95 duration-300 transition-all"
                >
                  Place Bet
                </button>
              </div>
            </CardContent>

            {/* Close button inside the card */}
            <button onClick={onClose} className="absolute top-2 right-2 text-white bg-zinc-800 my-1 px-2 rounded-full">
              ×
            </button>
          </Card>
        </div>
      // </div>
    )
  );
}
