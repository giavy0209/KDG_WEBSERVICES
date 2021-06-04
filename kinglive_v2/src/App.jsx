import { useCallback, useState } from 'react';
import { Route, Switch } from 'react-router';
import './assets/scss/styles.scss'
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from './pages/Home';

function App() {
  const [IsOpenSidebar, setIsOpenSidebar] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar(_isopen => !_isopen)
  }, [])
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar IsOpenSidebar={IsOpenSidebar} />
      <main className={`${IsOpenSidebar ? 'small' : ''}`} > 
        <Switch>

          <Route path='/' component={Home} exact />

        </Switch>
      </main>
    </>
  );
}

export default App;
