import { useEffect, useState } from 'react'
import '../../assets/scss/sidebar.scss'
import home from '../../assets/images/sidebar/home.svg'
import homeactive from '../../assets/images/sidebar/homeactive.svg'
import live from '../../assets/images/sidebar/live.svg'
import liveactive from '../../assets/images/sidebar/liveactive.svg'
import market from '../../assets/images/sidebar/market.svg'
import marketactive from '../../assets/images/sidebar/marketactive.svg'
import swap from '../../assets/images/sidebar/swap.svg'
import swapactive from '../../assets/images/sidebar/swapactive.svg'
import more from '../../assets/images/sidebar/more.svg'
import moreactive from '../../assets/images/sidebar/moreactive.svg'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'

const page = [
  {
    route: '/',
    name: 'Home',
    icon: home,
    active: homeactive,
  },
  {
    route: '/live',
    name: 'Livestream',
    icon: live,
    active: liveactive,
  },
  {
    route: '/nft-market',
    name: 'NFT Market',
    icon: market,
    active: marketactive,
    child: [
      {
        route: '/nft-market',
        name: 'King Market',
      },
      {
        route: '/my-artwork',
        name: 'My NFT Artwork',
      },
      {
        route: '/mint-nft',
        name: 'Mint NFT',
      },
    ],
  },
  {
    route: '/swap',
    name: 'Swap',
    icon: swap,
    active: swapactive,
  },
  {
    route: '/more',
    name: 'More',
    icon: more,
    active: moreactive,
    child: [
      {
        route: '/Audit',
        name: 'Audit',
      },
      {
        route: '/Docs',
        name: 'Docs',
      },
      {
        route: '/Github',
        name: 'Github',
      },
    ],
  },
]

export default function Sidebar({ IsOpenSidebar }) {
  const [MarketCap, setMarketCap] = useState({})
  useEffect(() => {
    const headerHeight = document.querySelector('header').offsetHeight
    const aside = document.querySelector('aside')
    aside.style.height = window.innerHeight - headerHeight + 'px'
    aside.style.top = headerHeight + 'px'
  }, [])

  useEffect(() => {
    const child_menu = document.querySelectorAll('aside .child')
    child_menu.forEach((el) => {
      const nextElement = el.parentElement.nextElementSibling
      if (nextElement) {
        nextElement.style.marginTop = el.offsetHeight + 'px'
        if (IsOpenSidebar) {
          nextElement.style.marginTop = el.offsetHeight + 'px'
        } else {
          nextElement.style.marginTop = 0 + 'px'
        }
      }
    })
  }, [IsOpenSidebar])

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=kingdom-game-4-0')
    .then(res => {
      setMarketCap(res.data[0])
    })
  },[])

  const location = useLocation()
  const history = useHistory()

  return (
    <>
      <aside className={`${IsOpenSidebar ? 'large' : ''}`}>
        <div className="menu">
        {page.map((o) => (
          <div
            key={o.route}
            onClick={() => history.push(o.route)}
            className={`item _transit ${location.pathname === o.route ? 'active' : ''}`}
          >
            <img src={location.pathname === o.route ? o.active : o.icon} alt='' />
            <span>{o.name}</span>
            {/*---------btn:arrow onclick show/hide child_box---------*/}
            {o.child && (
              <div className='child'>
                {o.child.map((child) => (
                  <div
                    key={child.route}
                    onClick={(e) => {
                      e.stopPropagation()
                      history.push(child.route)
                    }}
                    className='child-item _transit'
                  >
                    <span>{child.name}</span>
                  </div>
                ))}
              </div>
            )}
            {/*-----e:child------ */}
          </div>
        ))}
        </div>

        <div className='bottom_box'>
          <span className='setting_ico'></span>
          <div>
            <span className='coin_KDG'></span>
            <p>{MarketCap.current_price}</p>
          </div>
          <div>
            <a target="_blank" href="https://medium.com/kingdom-game-4-0" class="_transit link medium"></a>
            <a target="_blank" href="https://t.me/kdg_en" class="_transit link telegram"></a>
            <a target="_blank" href="https://twitter.com/KingdomGame_KDG" class="_transit link twitter"></a>
          </div>
        </div>
        {/*-----e:bottom_box------ */}
      </aside>
    </>
  )
}
