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
import dotenv from "dotenv";
dotenv.config();
class AptosService {
  private aptos: Aptos;
  private account: Account;
  constructor() {
    const config = new AptosConfig({ network: Network.TESTNET });
    this.aptos = new Aptos(config);
    const formattedPrivateKey = PrivateKey.formatPrivateKey(
      process.env.ACCOUNT_PRIVATE_KEY as string,
      PrivateKeyVariants.Ed25519,
    );
    const privateKey = new Ed25519PrivateKey(formattedPrivateKey);
    this.account = Account.fromPrivateKey({ privateKey });
    console.log(this.account.accountAddress.toString());
    // Use a proper async initialization method
    this.initializeAccount();
  }
  private async initializeAccount() {
    try {
      await this.aptos.fundAccount({
        accountAddress: this.account.accountAddress,
        amount: 100000000,
      });
      console.log("Account funded successfully");
    } catch (error) {
      console.error("Failed to fund account:", error);
    }
  }
  async initializeMarket(
    question: string,
    endTime: number,
    oracle: AccountAddress,
    initialYesPrice: number,
    initialNoPrice: number,
    initialLiquidity: number,
  ) {
    const hexQuestion = Buffer.from(question, "utf8").toString("hex"); // Convert question to hex
    let transaction;
    try {
      transaction = await this.aptos.transaction.build.simple({
        sender: this.account.accountAddress,
        data: {
          function: `${process.env.CONTRACT_ADDRESS}::market::initialize_market`,
          functionArguments: ["0x" + hexQuestion, endTime, oracle, initialYesPrice, initialNoPrice, initialLiquidity],
        },
      });
    } catch (error) {
      console.error("Failed to initialize market:", error);
    }

    const pendingTransaction = await this.aptos.signAndSubmitTransaction({
      signer: this.account,
      transaction: transaction!,
    });
    const executedTransaction = await this.aptos.waitForTransaction({
      transactionHash: pendingTransaction.hash,
    });

    return this.account.accountAddress.toString();
  }

  async resolveMarket(marketAddress: string, outcome: number) {
    const transaction = await this.aptos.transaction.build.simple({
      sender: this.account.accountAddress,
      data: {
        // The Move entry-function
        function: ((process.env.CONTRACT_ADDRESS as string) + "::aptos_account::resolve") as any,
        functionArguments: [marketAddress, outcome],
      },
    });
    const pendingTransaction = await this.aptos.signAndSubmitTransaction({
      signer: this.account,
      transaction,
    });
    const executedTransaction = await this.aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });
    return this.account.accountAddress.toString();
  }
}
export default new AptosService();
