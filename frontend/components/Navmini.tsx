
import { Copy } from "lucide-react";
import { Link } from 'react-router-dom';
import { OktoContextType, useOkto } from "okto-sdk-react";

const Navmini = () => {
    const { logOut } = useOkto() as OktoContextType;
  return (
    <div className="sm:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-stone-600">
          <img className="h-auto w-48" src="../../public/logo.png" alt="Logo" />
        </Link>
        <div className="flex justify-center items-center gap-2 " >
           <button className="text-sm bg-white text-black transition-all font-light flex items-center justify-center gap-2 rounded-xl py-2 p-1"><Copy /> 0x...</button>
        <button className="pb-2 font-semibold text-sm text-white" onClick={logOut}>
          Logout
        </button>
        </div>
      </div>
  )
}

export default Navmini