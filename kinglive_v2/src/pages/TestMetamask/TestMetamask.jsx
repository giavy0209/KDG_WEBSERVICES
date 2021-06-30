import { useState } from 'react'
import '../../assets/scss/test-metamask.scss'

export default function TestMetamask() {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const connectMetaMask = async () => {
    setIsLoading(true)

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    setAddress(account)

    setIsLoading(false)
  }

  return (
    <div className='test-metamask'>
      <button
        className={`buttonX ${isLoading ? 'test-metamask__loading' : ''}`}
        disabled={isLoading}
        onClick={connectMetaMask}
      >
        Connect
      </button>

      <div className='test-metamask__address'>Address: {address}</div>
    </div>
  )
}
