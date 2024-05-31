const SOL_FAUCET_BY_SUJAY = 'SOL_FAUCET_BY_SUJAY'

const init = () => {
    const yourAddressBox = document.getElementsByClassName('yourAddress')[0]
    const address = localStorage.getItem(SOL_FAUCET_BY_SUJAY) || ''
    yourAddressBox.value = address
}

init()

const handleRememberMe = () => {
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

const handleResult = ({ success, result }) => {
    removeLoading()

    const msgBox = document.getElementsByClassName('msg')[0]

    const msgContent = document.getElementsByClassName('msg-content')[0]
    msgContent.innerHTML = result

    msgBox.classList.add(['active'])
    if (success) {
        msgBox.classList.add(['success'])
    } else {
        msgBox.classList.add(['danger'])
    }
}

// const solanaWeb3 = require('@solana/web3.js') // already comes from the script src
const handleGetSol = async () => {
    hideThis()
    addLoading()

    const address = document.getElementsByClassName('addressInput')[0].value
    const solValueString = document.getElementById('solValue').value
    const solValue = Number(solValueString)

    if (address === '') {
        handleResult({
            success: false,
            result: 'Wallet address cannot be empty',
        })
        return
    }
    if (!(solValue >= 0 && solValue <= 2)) {
        handleResult({
            success: false,
            result: 'SOL value should be greater than 0 and less than 2',
        })

        return
    }

    console.log(solanaWeb3)
    const { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } = solanaWeb3
    const connnection = new Connection(clusterApiUrl('devnet'))

    try {
        console.log(`Requesting ${solValue} SOL airdrop for ${address}`)
        const signature = await connnection.requestAirdrop(new PublicKey(address), solValue * LAMPORTS_PER_SOL)

        handleResult({
            success: true,
            result: `<a href="https://explorer.solana.com/tx/${signature}?cluster=devnet">Transaction Link</a>`,
        })
    } catch (e) {
        handleResult({
            success: false,
            result: String(e),
        })
    }
}

const hideThis = () => {
    const msgBox = document.getElementsByClassName('msg')[0]
    msgBox.classList.remove(['active'])
    msgBox.classList.remove(['success'])
    msgBox.classList.remove(['danger'])
}

const addLoading = () => {
    const msgBox = document.getElementsByClassName('msg')[0]
    msgBox.classList.add(['active'])
    msgBox.classList.add(['loading'])

    const msgContent = document.getElementsByClassName('msg-content')[0]
    msgContent.innerHTML = 'Please wait...'
}

const removeLoading = () => {
    const msgBox = document.getElementsByClassName('msg')[0]
    msgBox.classList.remove(['active'])
    msgBox.classList.remove(['loading'])
}
