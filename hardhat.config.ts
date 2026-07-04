import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import "dotenv/config";
import { defineConfig } from "hardhat/config";
import type { NetworkUserConfig } from "hardhat/types/config";

const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
const sepoliaPrivateKey = process.env.SEPOLIA_PRIVATE_KEY;
const contributorPrivateKey = process.env.CONTRIBUTOR_PRIVATE_KEY;

const networks: Record<string, NetworkUserConfig> = {
  hardhatMainnet: {
    type: "edr-simulated",
    chainType: "l1",
  },
  hardhatOp: {
    type: "edr-simulated",
    chainType: "op",
  },
};

if (sepoliaRpcUrl && sepoliaPrivateKey && contributorPrivateKey) {
  networks.sepolia = {
    type: "http",
    chainType: "l1",
    url: sepoliaRpcUrl,
    accounts: [sepoliaPrivateKey, contributorPrivateKey],
  };
}

export default defineConfig({
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks,
});
