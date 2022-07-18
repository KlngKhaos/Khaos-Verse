import { Contract } from '@ethersproject/contracts'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { contractNames } from '../ts/deploy';

interface IDeployedContracts {
  [P: string]: Contract;
}

const deployContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment,
) {
  const {
    TestToken,
    Airdrop
    } = contractNames;

  let token: Contract;
  let airdrop: Contract;
  const signers = await hre.ethers.getSigners();

  const testToken = await hre.ethers.getContractFactory(TestToken, signers[0])
  token = await testToken.deploy()

  const AirdropFactory = await hre.ethers.getContractFactory(Airdrop);
  airdrop = await AirdropFactory.deploy(token.address)
  
  try {
    await hre.run('verify', {
      address: token.address,
      constructorArgsParams: [],
    })
  } catch (error) {
    console.log(`Smart contract at address ${token.address} is already verified`)
  }


}

export default deployContract
