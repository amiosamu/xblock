
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Prepare the deployer wallet - this will be based on the private key we set up in config
  const [deployer] = await ethers.getSigners();

  // Prepare the provider - this will give us access to the blockchain via Tenderly DevNet
  provider = new ethers.providers.JsonRpcProvider(process.env.TENDERLY_URL);

  // Greeter will be an ethers internal representation of the compiled contract
  const Greeter = await ethers.getContractFactory("Greeter", deployer);
  console.log("Deploying Greeter...");

  // greeter will be the instance of our contract that we are about to deploy
  const greeter = await Greeter.deploy("Hello from Tenderly!");

  // We wait for the deployment to be completed and confirmed
  await greeter.deployed();
  await greeter.setGreeting("hello");

  // This will tell us the address at which the contract was deployed
  console.log("Greeter deployed to:", greeter.address);
}

// Do the thing!
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
