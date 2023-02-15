interface configObject {
    [T: number]: {
        [U: string]: string;
    };
}

export const networkConfig: configObject = {
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
    }
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 8;
export const INITIAL_ANSWER = 200000000;
export const blockConfirmations = 1;
