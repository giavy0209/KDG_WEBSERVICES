// import { useWeb3React } from '@web3-react/core'
import useWindowSize from 'hooks/useWindowSize'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import bannermobile from './assets/images/home/bannermobile.png'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Live from './pages/Live'
import MintNFT from './pages/MintNFT'
import MyArtwork from './pages/MyArtwork'
import MyArtworkDetail from './pages/MyArtworkDetail'
import NFT from './pages/NFT'
import NFTDetail from './pages/NFTDetail'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Setup from './pages/Setup'
import Swap from './pages/Swap'
import Upload from './pages/Upload'
import User from './pages/User'
import WatchLive from './pages/WatchLive'
import WatchVideo from './pages/WatchVideo'
import socket from './socket'
import { actChangeUnreadNoti, asyncGetNoti } from './store/actions'

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [IsOpenSidebar, setIsOpenSidebar] = useState(false)
  const [width] = useWindowSize()
  // const { account } = useWeb3React()

  useEffect(() => {
    window.addEventListener('click', () =>
      document
        .querySelectorAll('.profile😢__video .menu')
        .forEach((menu) => menu.classList.remove('show'))
    )
  }, [])

  useMemo(() => {
    dispatch(asyncGetNoti())
  }, [dispatch])

  const handleClickNoti = useCallback(
    ({ type, data }) => {
      if (type === 101) history.push(`/user?uid=${data.user}`)
      if (type === 102 || type === 103 || type === 104) history.push(`/watchvideo?v=${data.video}`)
      if (type === 105) history.push(`/watchlive?s=${data.video}`)
    },
    [history]
  )

  const handleType = useCallback((noti) => {
    console.log(noti)
    return noti.type === 101 ? (
      <p>{noti.data.name} is follow you</p>
    ) : noti.type === 102 ? (
      <p>{noti.data.name} is comment on your video</p>
    ) : noti.type === 103 ? (
      <p>Your video {noti.data.video_name} upload success</p>
    ) : noti.type === 104 ? (
      <p>
        {noti.data.name} upload new video {noti.data.video_name}
      </p>
    ) : noti.type === 105 ? (
      <p>{noti.data.name} is streaming</p>
    ) : null
  }, [])

  useEffect(() => {
    socket.on('noti', ({ data, unread }) => {
      console.log(data)
      dispatch(actChangeUnreadNoti(unread))
      toast(<div onClick={() => handleClickNoti(data)}>{handleType(data)}</div>)
    })

    return () => socket.disconnect()
  }, [dispatch, handleClickNoti, handleType])

  if (width > 1200) {
    return (
      <>
        <ToastContainer />
        <Header IsOpenSidebar={IsOpenSidebar} toggleSidebar={() => setIsOpenSidebar((x) => !x)} />
        <Sidebar IsOpenSidebar={IsOpenSidebar} />

        <main className={`${IsOpenSidebar ? 'small' : ''}`}>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/live' component={Live} exact />
            <Route path='/nft-market' component={NFT} exact />
            <Route path='/my-artwork' component={MyArtwork} exact />
            <Route path='/my-artwork-detail' component={MyArtworkDetail} exact />
            <Route path='/mint-nft' component={MintNFT} exact />
            <Route path='/nft-detail' component={NFTDetail} exact />
            <Route path='/upload' component={Upload} exact />
            <Route path='/setup' component={Setup} exact />
            <Route path='/profile' component={Profile} exact />
            <Route path='/user' component={User} exact />
            <Route path='/watchlive' component={WatchLive} exact />
            <Route path='/watchvideo' component={WatchVideo} exact />
            <Route path='/search' component={Search} exact />
            <Route path='/swap' component={Swap} exact />
          </Switch>
        </main>
      </>
    )
  } else {
    return (
      <div
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          backgroundColor: 'rgb(8,8,8)',
        }}
      >
        <img
          src={bannermobile}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50% , -50%)',
            width: '100vw',
            height: '100vh',
            objectFit: 'contain',
          }}
          alt=''
        />
      </div>
    )
  }
}

export default App
