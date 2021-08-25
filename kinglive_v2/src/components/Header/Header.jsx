import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../assets/scss/header.scss'
import UnlockButton from '../../components/ConnectWalletButton'
import LeftHeader from './LeftHeader'
import LiveSetup from './LiveSetup'
import Noti from './Noti'
import Profile from './Profile'

export default function Header({ toggleSidebar = () => {}, IsOpenSidebar = false }) {
  const userRedux = useSelector((state) => state.user)

  const [IsOpenNoti, setIsOpenNoti] = useState(false)
  const [IsOpenLive, setIsOpenLive] = useState(false)
  const [IsOpenProfile, setIsOpenProfile] = useState(false)

  const toggleHeader = (type, e) => {
    e.stopPropagation()

    switch (type) {
      case 1: {
        setIsOpenNoti((x) => !x)
        setIsOpenLive(false)
        setIsOpenProfile(false)
        break
      }

      case 2: {
        setIsOpenNoti(false)
        setIsOpenLive((x) => !x)
        setIsOpenProfile(false)
        break
      }

      case 3: {
        setIsOpenNoti(false)
        setIsOpenLive(false)
        setIsOpenProfile((x) => !x)
        break
      }

      default:
        break
    }
  }

  useEffect(() => {
    const closeHeader = () => {
      setIsOpenNoti(false)
      setIsOpenLive(false)
      setIsOpenProfile(false)
    }
    window.addEventListener('click', closeHeader)
    return () => window.removeEventListener('click', closeHeader)
  }, [])

  return (
    <header>
      <LeftHeader toggleSidebar={toggleSidebar} IsOpenSidebar={IsOpenSidebar} />
      <div className='right'>
        {userRedux && (
          <>
            <Noti IsOpenNoti={IsOpenNoti} toggleHeader={toggleHeader} />
            <LiveSetup IsOpenLive={IsOpenLive} toggleHeader={toggleHeader} />
          </>
        )}

        <UnlockButton />

        {userRedux && <Profile IsOpenProfile={IsOpenProfile} toggleHeader={toggleHeader} />}
      </div>
    </header>
  )
}
