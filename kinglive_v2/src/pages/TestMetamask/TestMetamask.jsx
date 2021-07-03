import { useState } from 'react'
import Web3 from 'web3'
import '../../assets/scss/test-metamask.scss'
import { ABIKL1155, addressKL1155 } from '../../contracts/KL1155'

export default function TestMetamask() {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [idNFT, setIdNFT] = useState('')

  const connectMetaMask = async () => {
    setIsLoading(true)

    // inject web3
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.web3 = new Web3(window.ethereum)
      console.log('web3 version', window.web3.version)
    }

    // inject address and abi
    window.contractKL1155 = new window.web3.eth.Contract(ABIKL1155, addressKL1155)
    console.log(window.contractKL1155)

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    setAddress(account)

    setIsLoading(false)
  }

  // create(_maxSupply, _initSupply , _royaltyFee, _uri, _data)
  const createNFT = async () => {
    let _id

    try {
      _id = await window.contractKL1155.methods
        .create('10', '5', '1', 'i dont know', 0x00)
        .send({ from: address })
    } catch (error) {
      console.log('error create nft', error)
    }

    console.log({ idNFT: _id })
    setIdNFT(_id)
  }

  return (
    <div className='test-metamask'>
      <button
        className={`buttonX ${isLoading ? 'test-metamask__loading' : ''} ${
          address ? 'test-metamask__hidden' : ''
        }`}
        disabled={isLoading}
        onClick={connectMetaMask}
      >
        Connect
      </button>

      <div className='test-metamask__address'>Address: {address}</div>

      <button className='buttonX' onClick={createNFT}>
        Create NFT
      </button>

      <div className='test-metamask__address'>idNFT: {idNFT}</div>
    </div>
  )
}
