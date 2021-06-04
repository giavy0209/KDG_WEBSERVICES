import { useEffect } from 'react'
import '../../assets/scss/sidebar.scss'
export default function Sidebar ({
    IsOpenSidebar
}) {
    useEffect(() => {
        const headerHeight = document.querySelector('header').offsetHeight
        document.querySelector('aside').style.height = (window.innerHeight -  headerHeight) + 'px'
    },[])
    return (
        <>
            <aside className={`${IsOpenSidebar ? 'large' : ''}`}>

            </aside>
        </>
    )
}