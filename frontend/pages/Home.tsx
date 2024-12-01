import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero2";
import Games from "@/components/Games";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="text-white min-h-screen relative">
      <Navbar />
      <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <button className="pb-2 font-semibold">Logout</button>
      </div>

      <Hero />
      <Features />
      <Games />
      <Faq />
      <Footer />
    </main>
  );
};

export default Home;
