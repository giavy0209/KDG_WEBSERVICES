import '../../assets/scss/header.scss'
export default function Header({
    toggleSidebar = () =>{}
}) {
    return (
        <>
            <header>
                <div onClick={toggleSidebar} className="toggle-menu"></div>
            </header>
        </>
    )
}