import { Header } from "@/components/Header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Rewards from "./pages/Rewards";
import InviteFriends from "./pages/InviteFriends";
import Sports from "./pages/Sports";
import AuthenticationPage from "./pages/AuthenticationPage";


function App() {
  const { connected } = useWallet();

  return (
    <Router>
      <main className="bg-gradient-to-b from-black via-neutral-950 to-gray-950 text-white min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element = {<AuthenticationPage />} />
          <Route path="/account" element={<Accounts />} />
          <Route path="/reward" element={<Rewards />} />
          <Route path="/affiliate" element ={<InviteFriends />} />
          <Route path = "/sports" element = {<Sports />} />
        </Routes>
      </main>
    </Router>
  ) 
}

export default App;
