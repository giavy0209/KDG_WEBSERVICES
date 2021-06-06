import { useEffect } from 'react'
import '../../assets/scss/sidebar.scss'
import home from '../../assets/images/sidebar/home.svg'
import homeactive from '../../assets/images/sidebar/homeactive.svg'
import live from '../../assets/images/sidebar/live.svg'
import liveactive from '../../assets/images/sidebar/liveactive.svg'
import market from '../../assets/images/sidebar/market.svg'
import marketactive from '../../assets/images/sidebar/marketactive.svg'
import swap from '../../assets/images/sidebar/swap.svg'
import swapactive from '../../assets/images/sidebar/swapactive.svg'
import book from '../../assets/images/sidebar/book.svg'
import bookactive from '../../assets/images/sidebar/bookactive.svg'
export default function Sidebar ({
    IsOpenSidebar
}) {
    useEffect(() => {
        const headerHeight = document.querySelector('header').offsetHeight
        const aside = document.querySelector('aside')
        aside.style.height = (window.innerHeight -  headerHeight) + 'px'
        aside.style.top =  headerHeight + 'px'
    },[])
    return (
        <>
            <aside className={`${IsOpenSidebar ? 'large' : ''}`}>
                <div className="item">
                    <img src={home} alt="" />
                    <span>Home</span>
                </div>
                <div className="item">
                    <img src={live} alt="" />
                    <span>Livestream</span>
                </div>
            </aside>
        </>
    )
}