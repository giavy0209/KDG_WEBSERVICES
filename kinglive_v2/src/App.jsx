import { useCallback, useState } from 'react'
import { Route, Switch } from 'react-router'
import './assets/scss/styles.scss'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Live from './pages/Live'
import Upload from './pages/Upload'
import Setup from './pages/Setup'
import WatchLive from './pages/WatchLive'

function App() {
  const [IsOpenSidebar, setIsOpenSidebar] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar(_isopen => !_isopen)
  }, [])
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
        </Switch>
      </main>
    </>
  )
}

export default App
