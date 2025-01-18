import { PicnicResolver__factory } from "../../src/types";
import "@nomiclabs/hardhat-ethers";
import hre from "hardhat";

async function main() {
  const { ethers } = hre;

  const deployer = (await ethers.getSigners())[0];
  const resolverFactory = await ethers.getContractFactory("PicnicResolver");

  const constructorArgs: [string, string, string, string, string[]] = [
    deployer.address,
    deployer.address,
    deployer.address,
    "https://ens-gateway.usepicnic-test.workers.dev/lookup/{sender}/{data}.json",
    [deployer.address],
  ];

  const iPicnicResolver = PicnicResolver__factory.createInterface();
  const constructorData = iPicnicResolver.encodeDeploy(constructorArgs);

  console.log(
    "Deploying PicnicResolver...\n\n" +
      `Constructor arguments:\n${JSON.stringify(constructorArgs)}\n\n` +
      `Constructor calldata:\n${constructorData}\n`
  );

  const implementation = await resolverFactory.deploy(...constructorArgs);
  await implementation.deployed();
  console.log("-> Deployed PicnicResolver contract at", implementation.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
