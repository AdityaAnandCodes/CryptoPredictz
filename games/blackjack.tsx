import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "../frontend/components/Navbar";
import { Link } from "react-router-dom";

// Type Definitions
interface Card {
  suit: string;
  value: string;
  displayValue: string;
  isHidden: boolean;
}

const BlackjackGame: React.FC = () => {
  // Explicitly typed state
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<"betting" | "playing" | "gameOver">("betting");
  const [balance, setBalance] = useState<number>(950);
  const [currentBet, setCurrentBet] = useState<number>(10);
  const [message, setMessage] = useState<string>("Place your bet!");

  // Deck and card utilities
  const suits: string[] = ["♠️", "♣️", "♥️", "♦️"];
  const values: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  const createDeck = (): Card[] => {
    return suits.flatMap((suit) =>
      values.map((value) => ({
        suit,
        value,
        displayValue: value,
        isHidden: false,
      })),
    );
  };

  const calculateHandValue = (hand: Card[]): number => {
    let value = hand.reduce((total, card) => {
      if (card.isHidden) return total;
      if (["J", "Q", "K"].includes(card.value)) return total + 10;
      if (card.value === "A") return total;
      return total + parseInt(card.value);
    }, 0);

    const aces = hand.filter((card) => card.value === "A").length;
    for (let i = 0; i < aces; i++) {
      if (value + 11 <= 21) {
        value += 11;
      } else {
        value += 1;
      }
    }

    return value;
  };

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledDeck = createDeck().sort(() => Math.random() - 0.5);

    setDeck(shuffledDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus("betting");
    setMessage("Place your bet!");
  };

  const placeBet = () => {
    if (currentBet > balance) {
      setMessage("Insufficient funds!");
      return;
    }

    const newDeck = [...deck];
    const initialPlayerHand: Card[] = [newDeck.pop()!, newDeck.pop()!];
    const initialDealerHand: Card[] = [newDeck.pop()!, { ...newDeck.pop()!, isHidden: true }];

    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);
    setDeck(newDeck);
    setGameStatus("playing");
    setMessage("Hit or Stand?");
  };

  const hit = () => {
    if (gameStatus !== "playing") return;

    const newDeck = [...deck];
    const drawnCard = newDeck.pop();

    if (drawnCard) {
      const newPlayerHand = [...playerHand, drawnCard];

      setPlayerHand(newPlayerHand);
      setDeck(newDeck);

      const playerValue = calculateHandValue(newPlayerHand);
      if (playerValue > 21) {
        endGame("bust");
      }
    }
  };

  const stand = () => {
    if (gameStatus !== "playing") return;

    let newDealerHand = [...dealerHand];
    newDealerHand[1].isHidden = false;

    while (calculateHandValue(newDealerHand) < 17) {
      const newDeck = [...deck];
      const drawnCard = newDeck.pop();
      if (drawnCard) {
        newDealerHand.push(drawnCard);
        setDeck(newDeck);
      }
    }

    setDealerHand(newDealerHand);
    compareHands(newDealerHand);
  };

  const compareHands = (finalDealerHand: Card[]) => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(finalDealerHand);

    let result: "win" | "lose" | "draw" = "draw";
    if (playerValue > 21) result = "lose";
    else if (dealerValue > 21) result = "win";
    else if (playerValue > dealerValue) result = "win";
    else if (playerValue < dealerValue) result = "lose";

    endGame(result);
  };

  const endGame = (result: "win" | "lose" | "draw" | "bust") => {
    let newBalance = balance;
    switch (result) {
      case "win":
        newBalance += currentBet;
        setMessage("You Win!");
        break;
      case "lose":
        newBalance -= currentBet;
        setMessage("Dealer Wins!");
        break;
      case "bust":
        newBalance -= currentBet;
        setMessage("Bust! You Lose!");
        break;
      default:
        setMessage("Draw!");
    }

    setBalance(newBalance);
    setGameStatus("gameOver");
  };
  const renderCard = (card: Card, index: number) => (
    <div
      key={index}
      className={`
      relative w-20 h-28 rounded-lg 
      shadow-md m-1 flex items-center justify-center
      ${card.isHidden ? "bg-blue-500" : "bg-white border-2"}
    `}
    >
      {!card.isHidden && (
        <div className="text-center">
          <div className={`text-2xl ${card.suit === "♥️" || card.suit === "♦️" ? "text-red-600" : "text-black"}`}>
            {card.displayValue}
          </div>
          <div className="absolute top-2 left-2 text-sm">{card.suit}</div>
          <div
            className="absolute right-2 text-sm rotate-180"
            style={{ transform: "translateY(10px)" }} // Move the suit 10px lower
          >
            {card.suit}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <button className="pb-2 font-semibold text-white">Logout</button>
      </div>
      <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
        <div className=" rounded-xl p-6 w-full max-w-2xl shadow-md">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Blackjack</h1>
            <p>
              Balance: ${balance} | Current Bet: ${currentBet}
            </p>
            <p className="text-yellow-500 font-semibold">{message}</p>
          </div>

          {/* Dealer Hand */}
          <div className="flex justify-center mb-4">
            <div className="flex flex-wrap justify-center gap-2">
              {dealerHand.map((card, index) => renderCard(card, index))}
            </div>
          </div>

          {/* Player Hand */}
          <div className="flex justify-center mb-4">
            <div className="flex flex-wrap justify-center gap-2">
              {playerHand.map((card, index) => renderCard(card, index))}
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex justify-center space-x-4">
            {gameStatus === "betting" && (
              <>
                <button
                  onClick={() => setCurrentBet(Math.max(10, currentBet - 10))}
                  className=" hover:bg-gray-100 bg-white text-black px-4 py-2 rounded-full transition-all"
                >
                  <ChevronLeft />
                </button>
                <button onClick={placeBet} className="bg-white hover:bg-gray-100 text-black font-semibold text-xl px-6 py-2 rounded-full transition-all">
                  ${currentBet}
                </button>
                <button
                  onClick={() => setCurrentBet(Math.min(balance, currentBet + 10))}
                  className=" hover:bg-gray-100 bg-white text-black px-4 py-2 rounded-full transition-all"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            {gameStatus === "playing" && (
              <>
                <button onClick={hit} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded">
                  Hit
                </button>
                <button onClick={stand} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">
                  Stand
                </button>
              </>
            )}

            {gameStatus === "gameOver" && (
              <button onClick={resetGame} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded">
                Play Again
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackjackGame;
