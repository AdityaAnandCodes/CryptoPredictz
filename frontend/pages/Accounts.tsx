import Navbar from "@/components/Navbar";
import { accountData } from "@/constants";

const Accounts = () => {
  const { user, balances, transactions, settings } = accountData;

  return (
    <>
      <Navbar />
      <div className="text-white min-h-screen flex flex-col pb-10">
        {/* Header */}
        <div className="bg-black py-4 px-6 flex items-center justify-between">
          <h1 className="text-lg md:text-2xl font-bold">My Account</h1>
        </div>

        {/* Account Info Section */}
        <div className="px-6 py-4 md:px-12 md:py-8 lg:px-24 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-8 lg:mb-12">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold text-white">
              {user.profileInitial}
            </div>
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">{user.name}</h2>
              <p className="text-sm text-gray-400">{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Account Balance</h3>
              <p className="text-xl font-bold">${balances.accountBalance.toFixed(2)}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Bonus Balance</h3>
              <p className="text-xl font-bold text-green-400">${balances.bonusBalance.toFixed(2)}</p>
            </div>
          </div>

          <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg mt-6 hover:bg-purple-700">
            Deposit Funds
          </button>
        </div>

        {/* Transaction History Section */}
        <div className="px-6 py-4 md:px-12 md:py-8 lg:px-24 lg:py-16 mt-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Transaction History</h2>

          <div className="space-y-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-gray-800 p-4 rounded-lg mb-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-400">{transaction.type}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
                <p
                  className={`text-xl font-bold ${
                    transaction.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {transaction.isPositive ? "+" : ""}
                  ${transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-gray-700 text-white rounded-lg mt-6 hover:bg-gray-800">
            View All Transactions
          </button>
        </div>

        {/* Settings Section */}
        <div className="px-6 py-4 md:px-12 md:py-8 lg:px-24 lg:py-16 mt-6 border-t border-gray-800">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Account Settings</h2>

          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.id} className="bg-gray-900 p-4 rounded-lg">
                <button
                  onClick={setting.action}
                  className={`w-full py-3 text-white ${
                    setting.label === "Log Out" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                  } rounded-lg`}
                >
                  {setting.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
