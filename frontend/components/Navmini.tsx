
import { Copy } from "lucide-react";
import { Link } from 'react-router-dom';
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useEffect, useState } from "react";

const Navmini = () => {
    
  const { logOut, getWallets, isLoggedIn } = useOkto() as OktoContextType;
  const [wallet, setWallet] = useState<string | null>(null);
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const wallets = await getWallets();
        if (wallets.wallets.length > 0) {
          setWallet(wallets.wallets[0].address);
        }
      })();
    }
  }, [isLoggedIn]);
  const copyToClipboard = async () => {
    if (wallet) {
      await navigator.clipboard.writeText(wallet);
    }
  };
    const { logOut } = useOkto() as OktoContextType;
  return (
    <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <div className="flex justify-center items-center gap-2 " >
           <button onClick={copyToClipboard} className="text-sm bg-white text-black transition-all font-light flex items-center justify-center gap-2 rounded-xl py-2 p-1"><Copy /> 0x...</button>
        <button className="pb-2 font-semibold text-sm text-white" onClick={logOut}>
          Logout
        </button>
        </div>
      </div>
  )
}

export default Navmini