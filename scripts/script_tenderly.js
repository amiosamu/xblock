
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

// Initialize hardhat-tenderly plugin for automatic contract verification
var tdly = require("@tenderly/hardhat-tenderly");
tdly.setup({ automaticVerifications: true });

// Your private key and tenderly devnet URL (which contains our secret id)
// We read both from the .env file so we can push this config to git and/or share publicly
const privateKey = process.env.PRIVATE_KEY;
const tenderlyUrl = process.env.TENDERLY_URL;

module.exports = {
  solidity: "0.8.17",
  networks: {
    devnet: {
      url: tenderlyUrl,
      // This will allow us to use our private key for signing later
      accounts: [`0x${privateKey}`],
      // This is the mainnet chain ID
      chainId: 1,
    },
  },
  tenderly: {
    // Replace with project slug in Tenderly
    project: "test",
    // Replace with your Tenderly username
    username: "kera",
    // Perform contract verification in private mode
    privateVerification: true,
  },
};