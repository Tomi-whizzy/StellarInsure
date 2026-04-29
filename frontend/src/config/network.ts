export type NetworkType = "mainnet" | "testnet" | "futurenet";

export interface NetworkConfig {
  id: NetworkType;
  label: string;
  description: string;
  horizonUrl: string;
  passphrase: string;
  contractIds: {
    [key: string]: string;
  };
  color: "red" | "yellow" | "green";
  isMainnet: boolean;
}

export const NETWORKS: Record<NetworkType, NetworkConfig> = {
  mainnet: {
    id: "mainnet",
    label: "Mainnet",
    description: "Production network with real transactions",
    horizonUrl: "https://horizon.stellar.org",
    passphrase: "Public Global Stellar Network ; September 2015",
    contractIds: {},
    color: "red",
    isMainnet: true,
  },
  testnet: {
    id: "testnet",
    label: "Testnet",
    description: "Test network for development purposes",
    horizonUrl: "https://horizon-testnet.stellar.org",
    passphrase: "Test SDF Network ; September 2015",
    contractIds: {},
    color: "yellow",
    isMainnet: false,
  },
  futurenet: {
    id: "futurenet",
    label: "Futurenet",
    description: "Experimental network for early testing",
    horizonUrl: "https://horizon-futurenet.stellar.org",
    passphrase: "Test SDF Future Network ; Fall 2022",
    contractIds: {},
    color: "green",
    isMainnet: false,
  },
};

export const DEFAULT_NETWORK: NetworkType =
  (process.env.NEXT_PUBLIC_STELLAR_NETWORK as NetworkType) || "mainnet";

export function getNetworkConfig(network: NetworkType): NetworkConfig {
  return NETWORKS[network] || NETWORKS.mainnet;
}
