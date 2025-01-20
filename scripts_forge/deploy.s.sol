// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import { Script, console } from "forge-std/Script.sol";
import { PicnicResolver } from "../contracts/PicnicResolver.sol";

contract Deploy is Script {
    PicnicResolver public resolver;
    address owner = 0x66cDc21b5db131E3f8E8af0CDB4E455a8393604a; // newOwner Owner address.
    address gatewayManager = 0x66cDc21b5db131E3f8E8af0CDB4E455a8393604a; // newSignerManager Signer manager address.
    address signerManager = 0x66cDc21b5db131E3f8E8af0CDB4E455a8393604a; // newGatewayManager Gateway manager address.
    string public url =
        "https://ens-gateway.usepicnic-test.workers.dev/lookup/{sender}/{data}.json"; // Test gateway url to use.
    address[] public signers = [0x66cDc21b5db131E3f8E8af0CDB4E455a8393604a]; // newSigners Signer addresses.

    function run() external {
        vm.startBroadcast();
        console.log("Deploying...");

        resolver = new PicnicResolver(
            owner,
            gatewayManager,
            signerManager,
            url,
            signers
        );
        console.log("PicnicResolver deployed at", address(resolver));

        vm.stopBroadcast();
    }
}
