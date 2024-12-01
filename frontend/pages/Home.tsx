import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero2";
import Games from "@/components/Games";
import { Link } from "react-router-dom";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { Copy } from "lucide-react";

const Home = () => {
  const { logOut } = useOkto() as OktoContextType;
  return (
    <main className="text-white min-h-screen relative">
      <Navbar />
      <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <div className="flex justify-center items-center gap-2 " >
           <button className="text-sm bg-white text-black transition-all font-light flex items-center justify-center gap-2 rounded-xl py-2 p-1"><Copy /> 0x...</button>
        <button className="pb-2 font-semibold text-sm" onClick={logOut}>
          Logout
        </button>
        </div>
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
