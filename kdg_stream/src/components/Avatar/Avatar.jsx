
import '../../assets/css/avatar.css'

export default function Avatar({
    position,
    src
}) {
    return (
        <>
            <div className="avatar">
                <img 
                alt="" 
                style={{
                    '--x' : position?.x ? (position.x * -1) + '%' : 0,
                    '--y' : position?.y ? (position.y * -1) + '%' : 0,
                    '--zoom' : position?.zoom ? position.zoom + '%' : '100%',
                }}
                className="avatar-img"
                src={src} />
            </div>
        </>
    )
}