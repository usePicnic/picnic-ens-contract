import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-foundry";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  sepolia: 11155111,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

// Ensure that we have all the environment variables we need.
let mnemonic: string = process.env.MNEMONIC || "";
const privateKey: string = process.env.PRIVATE_KEY || "";

if (!mnemonic && !privateKey) {
  console.warn("neither MNEMONIC nor PRIVATE_KEY is not set in the .env file");
  mnemonic =
    "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
  console.warn("INFURA_API_KEY is not set in the .env file");
}

const etherscanApiKey: string | undefined = process.env.ETHERSCAN_API_KEY;

function getChainConfig(network: keyof typeof chainIds): HttpNetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;
  return {
    accounts: privateKey
      ? [privateKey]
      : {
          count: 10,
          mnemonic,
          path: "m/44'/60'/0'/0",
        },
    chainId: chainIds[network],
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: privateKey
        ? [{ privateKey, balance: "100000000000000000000" }]
        : { mnemonic },
      chainId: chainIds.hardhat,
    },
    sepolia: getChainConfig("sepolia"),
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + infuraApiKey,
      accounts: privateKey ? [privateKey] : { mnemonic },
      chainId: chainIds.mainnet,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.13",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true,
  },
};

export default config;
