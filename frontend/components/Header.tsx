import { useEffect } from "react";
import { WalletSelector } from "@/components/WalletSelector";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { gsap } from "gsap";

export function Header() {
  const { connected } = useWallet();

  useEffect(() => {
    if (!connected) {
      // Create the moving blurry balls animation
      const balls = document.querySelectorAll(".ball");
      balls.forEach((ball) => {
        gsap.to(ball, {
          x: `+=${Math.random() * 400 - 200}`, // Random horizontal movement
          y: `+=${Math.random() * 400 - 200}`, // Random vertical movement
          duration: Math.random() * 6 + 4, // Random duration for each ball
          repeat: -1, // Infinite repeat
          yoyo: true, // Reverse animation
          ease: "sine.inOut", // Smooth easing for movement
        });
      });
    }
  }, [connected]);

  return connected ? (
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full">
      <h1 className="display max-sm:text-lg">CryptoBetz</h1>
      <div className="flex max-sm:scale-70 items-center flex-wrap">
        <WalletSelector />
      </div>
    </div>
  ) : (
    <section className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-black via-black to-gray-950">
      <div className="text-4xl font-bold p-4 px-8 absolute text-white z-10">Aptos Arena</div>
      <div className="flex h-screen items-center justify-center flex-wrap z-10">
        <WalletSelector />
      </div>

      {/* Blurry Balls */}
      {[...Array(16)].map((_, index) => (
        <div
          key={index}
          className="ball rounded-full bg-blue-950 opacity-50 absolute"
          style={{
            width: `${Math.random() * 20 + 50}px`,
            height: `${Math.random() * 20 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(12px)",
          }}
        ></div>
      ))}
    </section>
  );
}
