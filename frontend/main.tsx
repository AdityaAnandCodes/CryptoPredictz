// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
// import "./mockEnv.ts";

import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "@/App.tsx";
// Internal components
import { Toaster } from "@/components/ui/toaster.tsx";
// import { WalletProvider } from "@/components/WalletProvider.tsx";
// import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { BuildType, OktoProvider } from "okto-sdk-react";

// const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <WrongNetworkAlert />
        <Toaster />
      </QueryClientProvider>
    </WalletProvider> */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <OktoProvider apiKey={import.meta.env.VITE_OKTO_CLIENT_ID || ""} buildType={BuildType.SANDBOX}>
        <App />
        <Toaster />
      </OktoProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
