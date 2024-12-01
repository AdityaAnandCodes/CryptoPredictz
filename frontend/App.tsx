import { Header } from "@/components/Header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Rewards from "./pages/Rewards";
import InviteFriends from "./pages/InviteFriends";


function App() {
  const { connected } = useWallet();

  return connected ? (
    <Router>
      <main className="bg-gradient-to-b from-black via-black to-gray-950 text-white min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Accounts />} />
          <Route path="/reward" element={<Rewards />} />
          <Route path="/affiliate" element ={<InviteFriends />} />
        </Routes>
      </main>
    </Router>
  ) : (
    <main className="bg-neutral-900 text-white min-h-screen overflow-hidden">
      <Header />
    </main>
  );
}

export default App;
