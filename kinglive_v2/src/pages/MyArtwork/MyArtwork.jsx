import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../assets/scss/my-artwork.scss'
import editSVG from '../../assets/svg/edit.svg'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'
import convertPositionIMG from '../../helpers/convertPositionIMG'

export default function MyArtwork() {
    const userRedux = useSelector(state => state.user)
    const [ActiveTab, setActiveTab] = useState(0)
    const [previewIMG, setPreviewIMG] = useState('')

    const [userData, setUserData] = useState({})
    const avatar = useMemo(() => userData?.kyc?.avatar?.path, [userData])
    const avatarPos = useMemo(() => userData?.kyc?.avatar_pos, [userData])
    const cover = useMemo(() => userData?.kyc?.cover?.path, [userData])
    const coverPos = useMemo(() => userData?.kyc?.cover_pos, [userData])
    const userName = useMemo(
        () => `${userData?.kyc?.first_name} ${userData?.kyc?.last_name}`,
        [userData]
    )

    useEffect(() => {
        ; (async () => {
            try {
                const res = await callAPI.get(`/user?uid=${userRedux?._id}`)
                setUserData(res.data)
            } catch (error) {
            }
        })()
    }, [userRedux])

    return (
        <div className='myartwork container'>
            <div style={{ position: 'relative', marginBottom: 100 }}>
                {previewIMG && (
                    <div className='myartwork__previewIMG' onClick={() => setPreviewIMG('')}>
                        <img src={previewIMG} alt='' />
                    </div>
                )}

                <div className='myartwork__cover'>
                    <img
                        src={`${STORAGE_DOMAIN}${cover}`}
                        alt=''
                        style={convertPositionIMG(coverPos)}
                        onClick={() => setPreviewIMG(`${STORAGE_DOMAIN}${cover}`)}
                    />
                    <span></span>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translate(-50%, calc(-50% + 18px))',
                    }}
                >
                    <div className='myartwork__avatar'>
                        <img
                            src={`${STORAGE_DOMAIN}${avatar}`}
                            alt=''
                            style={convertPositionIMG(avatarPos)}
                            onClick={() => setPreviewIMG(`${STORAGE_DOMAIN}${avatar}`)}
                        />
                        <span></span>
                    </div>

                    <div className='myartwork__name'>
                        {!userName || userName === ' ' ? 'Username' : userName}
                    </div>
                </div>
            </div>

            <div className="myartwork__container mt-35">
                <div className="myartwork__tabs">
                    <div className={`myartwork__tab ${ActiveTab === 0 ? 'active' : ''}`} onClick={()=>setActiveTab(0)}>Revewed <span>Revewed</span> </div>
                    <div className={`myartwork__tab ${ActiveTab === 1 ? 'active' : ''}`} onClick={()=>setActiveTab(1)}>Pending <span>Pending</span> </div>
                    <div className={`myartwork__tab ${ActiveTab === 2 ? 'active' : ''}`} onClick={()=>setActiveTab(2)}>Reject <span>Reject</span> </div>
                    <div className={`myartwork__tab ${ActiveTab === 3 ? 'active' : ''}`} onClick={()=>setActiveTab(3)}>Bidding <span>Bidding</span> </div>
                </div>
            </div>

        </div>
    )
}
