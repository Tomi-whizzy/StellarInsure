"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { NetworkType, DEFAULT_NETWORK } from "@/config/network";

interface NetworkContextValue {
  network: NetworkType;
  setNetwork: (network: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetworkState] = useState<NetworkType>("mainnet");

  // Load from local storage or default on mount
  useEffect(() => {
    const savedNetwork = localStorage.getItem("stellarinsure_network") as NetworkType | null;
    if (savedNetwork && ["mainnet", "testnet", "futurenet"].includes(savedNetwork)) {
      setNetworkState(savedNetwork);
    } else {
      setNetworkState(DEFAULT_NETWORK);
    }
  }, []);

  const setNetwork = (newNetwork: NetworkType) => {
    setNetworkState(newNetwork);
    localStorage.setItem("stellarinsure_network", newNetwork);
  };

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
}
