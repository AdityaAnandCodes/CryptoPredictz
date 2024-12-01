import { Header } from "@/components/Header";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import UpcomingMatches from "@/components/UpcomingMatches";
import Faq from "@/components/Faq";

import BlackjackGame from "../../games/blackjack";
import SlotMachine from "../../games/slotMachine";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-black via-black to-gray-950 text-white min-h-screen relative">
      <Header />
      <Hero />
      <Navbar />
      <BlackjackGame />
      <SlotMachine />
      <UpcomingMatches />
      <Features />
      <Faq />
      <Footer />
    </main>
  );
};

export default Home;
