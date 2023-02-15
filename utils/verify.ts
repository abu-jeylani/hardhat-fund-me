import { run } from "hardhat"

export async function verify(contractAddress: string, args: any[]) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args
        })
    } catch (error) {
        if (
            (error as Error).message.toLowerCase().includes("already verified")
        ) {
            console.log("Already verified")
        } else {
            console.log(error)
        }
    }
}
