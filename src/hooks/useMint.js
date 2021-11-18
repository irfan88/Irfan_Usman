import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { getBep20Contract } from '../utils/contractHelpers'
import { getEthValue } from "../utils/formatBalance"


export const usePresaleMint = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress = environment.nftAddress;
    const contract = getBep20Contract(tokenAddress, web3)
    const mintTokens = useCallback(async (tokens , price) => {
        const amount = getEthValue(price, tokens)

        const tx = await contract.methods.preSaleMint(account).send({ from: account, value: amount })
            .on('transactionHash', (tx) => { return tx.transactionHash });
        return tx

    }, [account, contract])

    return { mint: mintTokens }
}


export const usePublicSaleMint = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress = environment.nftAddress;
    const contract = getBep20Contract(tokenAddress, web3)
    const mintTokens = useCallback(async (tokens , price) => {
        const amount = getEthValue(price, tokens)

        const tx = await contract.methods.bachMint(account).send({ from: account, value: amount })
            .on('transactionHash', (tx) => { return tx.transactionHash });
        return tx

    }, [account, contract])

    return { mintPublic: mintTokens }
}

export default usePresaleMint;

