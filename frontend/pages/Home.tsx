import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Features from "@/components/Features";

import UpcomingMatches from "@/components/UpcomingMatches";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-black via-black to-gray-950 text-white min-h-screen relative">
      <Header />
      <Navbar />
      <Features />
      <UpcomingMatches />
      <Faq />
      <Footer />
    </main>
  );
};

export default Home;
