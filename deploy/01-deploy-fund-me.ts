import { network } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async ({
    getNamedAccounts,
    deployments
}: HardhatRuntimeEnvironment) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //what happens when we
    //when going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [], //put price feed address
        log: true
    })
}
