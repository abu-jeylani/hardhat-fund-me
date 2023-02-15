import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    developmentChains,
    networkConfig,
    blockConfirmations
} from "../helper-hardhat-config";
import { verify } from "../utils/verify";

module.exports = async ({
    getNamedAccounts,
    deployments
}: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = network.config.chainId!;

    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    const args = [ethUsdPriceFeedAddress];

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put price feed address
        log: true,
        waitConfirmations: blockConfirmations || 1
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }
    log("--------------------------");
};

module.exports.tags = ["all", "FundMe"];
