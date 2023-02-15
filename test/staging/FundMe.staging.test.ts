import { assert, expect } from "chai";
import { Contract } from "ethers";
import { network, deployments, getNamedAccounts, ethers } from "hardhat";

import { developmentChains } from "../../helper-hardhat-config";
import { FundMe } from "../../typechain-types";

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function() {
          let fundMe: Contract | FundMe;
          let deployer: any;
          const sendValue = ethers.utils.parseEther("0.1");
          beforeEach(async () => {
              // const accounts = await ethers.getSigners()
              // deployer = accounts[0]
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("Allows people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue });
              await fundMe.withdraw();
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(
                  endingBalance.toString(),
                  ethers.utils.parseEther("0").toString()
              );
          });
      });
