import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

const Games = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerConfetti();
          }
        });
      },
      { threshold: 0.5 }, // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section
      id="Games"
      ref={sectionRef}
      className="min-h-fit w-screen p-4 flex flex-col justify-center items-center gap-8"
    >
      {/* Title Section */}
      <div className="font-bold text-3xl">💲Casino Games💲</div>

      {/* Game Sections */}
      <div className="flex justify-center items-center gap-28 max-w-full max-sm:flex-col">
        {/* Blackjack Game Section */}
        <div className="p-4 pb-10 rounded-xl bg-white bg-opacity-80 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Link to="/blackjack">
          <div className="relative w-64 h-64 blackJack rounded-lg shadow-lg overflow-hidden ">
            <div className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold">
              <div className="text-center p-4"></div>
            </div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
        </Link>

        </div>

        {/* Slot Machine Game Section */}
        <div className="p-4 pb-10 rounded-xl bg-white bg-opacity-80 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Link to="/slotmachine">
          <div className="relative slotMachine w-64 h-64 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold">
              <div className="text-center p-4"></div>
            </div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        </Link>

        </div>
      </div>
    </section>
  );
};

export default Games;