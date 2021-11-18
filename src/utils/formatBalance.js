import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance, decimals) => {
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance, decimals) => {
    return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const getEthValue = (price, tokens) => {
    const displayBalance = new BigNumber(price).multipliedBy(tokens).multipliedBy(new BigNumber(10).pow(18))
    return displayBalance
}
