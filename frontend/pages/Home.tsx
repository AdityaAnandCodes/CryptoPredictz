import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";

import UpcomingMatches from "@/components/UpcomingMatches";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-black via-black to-gray-950 text-white min-h-screen relative">
      <Header />
      <Navbar />
      <UpcomingMatches />
      <Faq />
    </main>
  );
};

export default Home;
