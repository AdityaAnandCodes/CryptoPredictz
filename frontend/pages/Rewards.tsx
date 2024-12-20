import Navbar from "@/components/Navbar";
import Navmini from "@/components/Navmini";
import { useEffect, useState } from "react";
import { OktoContextType, useOkto } from "okto-sdk-react";
import {
  Account,
  AccountAddress,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const updateLoginStreak = () => {
  const currentDate = getCurrentDate();
  const storedLogins = JSON.parse(localStorage.getItem("loginStreak") || "[]");

  if (storedLogins[storedLogins.length - 1] === currentDate) {
    return storedLogins;
  }

  storedLogins.push(currentDate);

  const streakStart = storedLogins.length >= 2 ? storedLogins[storedLogins.length - 2] : null;
  const isConsecutive = streakStart ? new Date(currentDate).getDate() - new Date(streakStart).getDate() === 1 : true;

  if (!isConsecutive) {
    storedLogins.length = 0;
    storedLogins.push(currentDate);
  }

  localStorage.setItem("loginStreak", JSON.stringify(storedLogins));
  return storedLogins;
};

const Rewards = () => {
  const [loginStreak, setLoginStreak] = useState<number>(0);
  const [reward, setReward] = useState<boolean>(false);
  const { getWallets } = useOkto() as OktoContextType;

  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  useEffect(() => {
    const storedLogins = updateLoginStreak();
    const streakLength = storedLogins.length;

    setLoginStreak(streakLength);

    if (streakLength >= 7) {
      setReward(true);
    }
  }, []);

  const claimReward = async () => {
    const formattedPrivateKey = PrivateKey.formatPrivateKey(
      import.meta.env.VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY as string,
      PrivateKeyVariants.Ed25519,
    );

    const privateKey = new Ed25519PrivateKey(formattedPrivateKey);
    const account = Account.fromPrivateKey({ privateKey });
    const wallets = await getWallets();
    const transaction = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        // The Move entry-function
        function: "0x1::aptos_account::transfer",
        functionArguments: [AccountAddress.fromString(wallets.wallets[0].address), 1000000],
      },
    });
    const pendingTransaction = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction,
    });
    const executedTransaction = await aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });
    console.log(executedTransaction);
    localStorage.removeItem("loginStreak");
  };

  return (
    <section className=" min-h-dvh text-white max-sm:pb-44">
      <Navbar />
      <Navmini />
      <div className="w-full max-h-dvh  mt-12 py-24 max-sm:mt-0 max-sm:mb-20 px-4 max-sm:py-4 max-sm:px-4 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl shadow-lg">
        {/* First row: Hero Block (spans 2 columns) */}
        <div className="col-span-1 md:col-span-2 flex-shrink-0 h-60 hero-3 rounded-lg shadow-lg flex items-center justify-between p-4 text-white text-lg font-bold relative overflow-hidden">
          <div className="absolute top-2 left-2 flex flex-col gap-4 p-4">
            <div className="text-4xl max-sm:text-3xl font-bold mt-5 ml-5 mr-5">Log in Daily and Earn Rewards</div>
            <div className="text-lg max-sm:text-base px-5 font-semibold text-gray-100">Earn Exciting Rewards</div>
            <div className="bg-green-700 ml-5 max-sm:text-sm text-base bg-opacity-50 rounded-lg w-fit p-2 px-4">
              Get Rewards Here
            </div>
          </div>
          <img
            src="/rb_5334.png"
            className="absolute bottom-2 right-2 max-sm:right-0  max-sm:w-40 max-sm:h-40 h-60 w-60"
          />
        </div>

        {/* First row: Keep Going Section (spans 1 column) */}
        <div className="col-span-1 bg-gray-900 p-6 rounded-lg">
          {reward ? (
            <div className="bg-green-600 p-6 rounded-lg text-center animate__animated animate__fadeIn">
              <h3 className="text-2xl font-semibold mb-4">Congratulations!</h3>
              <p className="text-lg mb-4">You've logged in for 7 consecutive days and earned 0.01 APT!</p>
              <button
                className="py-2 px-6 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition duration-300"
                onClick={claimReward}
              >
                Claim Your Reward
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 flex flex-col justify-center items-center p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Keep Going!</h3>
              <p className="text-lg text-gray-300">Log in for 7 consecutive days to earn a reward!</p>
            </div>
          )}
        </div>

        {/* Second row: Login Streak Progress Section (spans 2 columns) */}
        <div className="col-span-1 md:col-span-2 bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Your Login Streak</h3>
          <p className="text-lg font-medium text-gray-400">
            {loginStreak} day{loginStreak === 1 ? "" : "s"} logged in
          </p>
          <div className="w-full h-2 bg-gray-500 rounded-full mt-4">
            <div className="h-2 bg-green-600 rounded-full" style={{ width: `${(loginStreak / 7) * 100}%` }}></div>
          </div>
          {loginStreak >= 7 && (
            <div className="mt-4 text-center text-lg font-bold text-green-400">
              You've hit 7 days! Claim your reward below.
            </div>
          )}

          {/* Reward Section */}
        </div>
        <div className="col-span-1 bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Reward History</h3>
          <ul>
            <li className="text-gray-300 mb-2">🎟️ 7-day streak - Ticket Earned (Dec 2, 2024)</li>
          </ul>
        </div>
      </div>

      {/* Second row: Reward History Section (spans 1 column) */}
    </section>
  );
};

export default Rewards;
