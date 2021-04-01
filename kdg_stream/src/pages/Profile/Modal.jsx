
import '../../assets/css/profile.css'
export default function Modal({
    onCancle,
    title,
    visible
}) {

    if(visible){
        return (
            <>
                <div className="modal">
                    <div onClick={onCancle} className="mask"></div>

                    <div className="body">
                        <p className="title">{title}</p>
                    </div>
                </div>
            </>
        )
    }
    else{
        return null
    }
}