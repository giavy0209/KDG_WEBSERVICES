import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router'
import './assets/scss/styles.scss'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Live from './pages/Live'
import NFT from './pages/NFT'
import Setup from './pages/Setup'
import Upload from './pages/Upload'
import WatchLive from './pages/WatchLive'
import WatchVideo from './pages/WatchVideo'
import { asyncInitUser } from './store/actions'

function App() {
  const dispatch = useDispatch()

  const [IsOpenSidebar, setIsOpenSidebar] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar(_isopen => !_isopen)
  }, [])

  useEffect(() => {
    dispatch(asyncInitUser())
  }, [dispatch])

  return (
    <>
      <Header IsOpenSidebar={IsOpenSidebar} toggleSidebar={toggleSidebar} />
      <Sidebar IsOpenSidebar={IsOpenSidebar} />
      <main className={`${IsOpenSidebar ? 'small' : ''}`}>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/live' component={Live} exact />
          <Route path='/upload' component={Upload} exact />
          <Route path='/setup' component={Setup} exact />
          <Route path='/watchlive' component={WatchLive} exact />
          <Route path='/watchvideo' component={WatchVideo} exact />
          <Route path='/nft-market' component={NFT} exact />
        </Switch>
      </main>
    </>
  )
}

export default App
