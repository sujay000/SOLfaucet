const SOL_FAUCET_BY_SUJAY = 'SOL_FAUCET_BY_SUJAY'

const init = () => {
    const yourAddressBox = document.getElementsByClassName('yourAddress')[0]
    const address = localStorage.getItem(SOL_FAUCET_BY_SUJAY) || ''
    yourAddressBox.value = address
}

init()

const handleRememberMe = () => {
    console.log('handleRememberMe called')
    const rememberMeBox = document.getElementsByClassName('rememberMe')[0]
    const address = rememberMeBox.value || ''

    const yourAddressBox = document.getElementsByClassName('yourAddress')[0]
    yourAddressBox.value = address

    localStorage.setItem(SOL_FAUCET_BY_SUJAY, address)
}

const handleUseMyAddress = () => {
    const addressBox = document.getElementsByClassName('addressInput')[0]
    addressBox.value = localStorage.getItem(SOL_FAUCET_BY_SUJAY) || ''
}

// const solanaWeb3 = require('@solana/web3.js') // already comes from the script src
const handleGetSol = async () => {
    const address = document.getElementsByClassName('addressInput')[0].value
    const solValueString = document.getElementById('solValue').value
    const solValue = Number(solValueString)

    if (address === '') {
        console.log('address cannot be empty')
        return
    }
    if (!(solValue >= 0 && solValue <= 2)) {
        console.log('SOL value should be greater than 0 and less than 2')
        return
    }
    console.log(solanaWeb3)
    const { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } = solanaWeb3
    const connnection = new Connection(clusterApiUrl('devnet'))

    try {
        console.log(`Requesting ${solValue} SOL airdrop for ${address}`)
        const signature = await connnection.requestAirdrop(new PublicKey(address), solValue)
        console.log(`Transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    } catch (e) {
        console.log(e)
    }
}
