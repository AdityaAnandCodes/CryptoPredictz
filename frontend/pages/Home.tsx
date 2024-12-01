import { Header } from "@/components/Header";

import UpcomingMatches from "@/components/UpcomingMatches";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-black via-black to-gray-950 text-white min-h-screen relative">
      <Header />
      <UpcomingMatches />
    </main>
  );
};

export default Home;
