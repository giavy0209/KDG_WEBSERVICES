import axios from 'axios'
import formatNumber from 'helpers/formatNumber'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import banner01 from '../../assets/images/home/b01.png'
import banner02 from '../../assets/images/home/b02.png'
import banner03 from '../../assets/images/home/b03.png'
import banner04 from '../../assets/images/home/b04.png'
import arrowLeftBanner from 'assets/svg/arrowLeftBanner.svg'
import arrowRightBanner from 'assets/svg/arrowRightBanner.svg'
import kingIMG from '../../assets/images/home/King.gif'
import '../../assets/scss/home.scss'
import callAPI from '../../axios'

const slide = [banner01, banner02, banner03,banner04]

const live = []
for (let index = 0; index < 100; index++) {
  live.push(index)
}

export default function Home() {
  const history = useHistory()

  const [ActiveSlide, setActiveSlide] = useState(0)
  const [Dashboard, setDashboard] = useState({})
  const [MarketCap, setMarketCap] = useState({})

  useMemo(() => {
    callAPI.get('/dashboard').then((res) => {
      setDashboard(res.data)
    })

    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=kingdom-game-4-0')
      .then((res) => {
        setMarketCap(res.data[0])
      })
  }, [])

  const timeout = useRef(null)

  useEffect(() => {
    timeout.current = setTimeout(() => {
      if (ActiveSlide < slide.length - 1) {
        setActiveSlide(ActiveSlide + 1)
      } else {
        setActiveSlide(0)
      }
    }, 5000)
  }, [ActiveSlide])

  const manualChangeSlide = useCallback((index) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    setActiveSlide(index)
  }, [])

  const clickArrowLeft = () => {
    if (ActiveSlide === 0) {
      manualChangeSlide(slide.length - 1)
    } else {
      manualChangeSlide((x) => x - 1)
    }
  }

  const clickArrowRight = () => {
    if (ActiveSlide === slide.length - 1) {
      manualChangeSlide(0)
    } else {
      manualChangeSlide((x) => x + 1)
    }
  }

  return (
    <>
      <div className='home'>
        {/* ------------------------div: slider -----------------------*/}
        <div className='slide-track'>
          <div
            style={{ '--translate': -(100 / slide.length) * ActiveSlide + '%' }}
            className='slide'
          >
            {slide.map((o) => (
              <div key={o} className='item'>
                <img src={o} alt='' />
              </div>
            ))}
          </div>
          <div className='controls'>
            {slide.map((o, index) => (
              <div
                onClick={() => manualChangeSlide(index)}
                className={`btn ${ActiveSlide === index ? 'active' : ''}`}
              ></div>
            ))}
          </div>
          <div className='controlsLeft' onClick={clickArrowLeft}>
            <img src={arrowLeftBanner} alt='' />
          </div>
          <div className='controlsRight' onClick={clickArrowRight}>
            <img src={arrowRightBanner} alt='' />
          </div>
        </div>
        {/* ------------------------ e:slider -----------------------*/}

        <div className='container home_container'>
          {/* ------------------------div: split -----------------------*/}
          <div className='split'>
            <span className='kinglive_vector'></span>
            <h3>For passionate community of streamers, gamers, fans & developers</h3>

            <ul className='home_navigator'>
              <li>
                <span onClick={() => history.push('/setup')} className='options _transit'>
                  Livestreaming
                </span>
                <span className='shake'></span>
              </li>
              <li>
                <span onClick={() => history.push('/mint-nft')} className='options _transit'>
                  Mint NFT
                </span>
                <span className='shake'></span>
              </li>
              <li>
                <span onClick={() => history.push('/live')} className='options _transit'>
                  Donate
                </span>
                <span className='shake'></span>
              </li>
              <li>
                <span onClick={() => history.push('/nft-market')} className='options _transit'>
                  Buy/Sell/Auction NFT
                </span>
                <span className='shake'></span>
              </li>
            </ul>
          </div>
          {/* --- e:split -----------------------*/}

          {/* ------------------------div: split -----------------------*/}
          <div className='split'>
            <img className='king_IMG' src={kingIMG} alt='kinglive images' />
          </div>
          {/* --- e:split -----------------------*/}

          {/* ------------------------div: split -----------------------*/}
          <div className='split info_box mt-30'>
            <span>
              Number of streamers<strong>{formatNumber(Dashboard.total_stream)}</strong>
            </span>
            <span>
              Number of videos<strong>{formatNumber(Dashboard.total_video)}</strong>
            </span>
            <span>
              Number of hours watched<strong>{formatNumber(Dashboard.watched_time)}</strong>
            </span>
            <span>
              Number of views<strong>{formatNumber(Dashboard.total_views)}</strong>
            </span>
          </div>
          {/* --- e:split -----------------------*/}

          {/* ------------------------div: split -----------------------*/}
          <div className='split info_box mt-30'>
            <span>
              Minted NFT<strong>{formatNumber(Dashboard.minted_nft)}</strong>
            </span>
            <span>
              NFT transaction<strong>{formatNumber(Dashboard.transaction)}</strong>
            </span>
            <span>
              NFT Trading volume<strong>{formatNumber(Dashboard.volumn_transaction)}</strong>
            </span>
            <span>
              Volume donate<strong>{formatNumber(Dashboard.watched_time)}</strong>
            </span>
          </div>
          {/* --- e:split -----------------------*/}
        </div>
        {/* --- e:home_container -----------------------*/}

        <div className='bottom_line'>
          <div className='container'>
            <span>
              Total supply:<strong>{formatNumber(MarketCap.total_supply)} KDG</strong>
            </span>
            <span>
              Circulating:<strong>{formatNumber(MarketCap.circulating_supply)} KDG</strong>
            </span>
            <span>
              Marketcap:<strong>{formatNumber(MarketCap.market_cap)} KDG</strong>
            </span>
          </div>
          {/* --- e:bottom_line -----------------------*/}
        </div>
        {/* --- e:bottom_line -----------------------*/}
      </div>
      {/* --- e:home -----------------------*/}
    </>
  )
}
