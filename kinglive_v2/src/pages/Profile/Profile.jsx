import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../assets/scss/profile.scss'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'

export default function Profile() {
  const userRedux = useSelector(state => state.user)
  const [userData, setUserData] = useState({})
  const [previewIMG, setPreviewIMG] = useState('')

  const avatar = useMemo(() => userData?.kyc?.avatar?.path, [userData])
  const avatarPos = useMemo(() => userData?.kyc?.avatar_pos, [userData])
  const cover = useMemo(() => userData?.kyc?.cover?.path, [userData])
  const coverPos = useMemo(() => userData?.kyc?.cover_pos, [userData])
  const userName = useMemo(
    () => `${userData?.kyc?.first_name} ${userData?.kyc?.last_name}`,
    [userData]
  )

  const posIMG = pos => ({
    '--x': pos?.x * -1 + '%',
    '--y': pos?.y * -1 + '%',
    '--zoom': pos?.zoom + '%',
  })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await callAPI.get(`/user?uid=${userRedux?._id}`)
        console.log({ userData: res })
        setUserData(res.data)
      } catch (error) {
        console.log('Error get user', error)
      }
    })()
  }, [userRedux])

  return (
    <div className='profile😢 container'>
      {previewIMG && (
        <div className='profile😢__previewIMG' onClick={() => setPreviewIMG('')}>
          <img src={previewIMG} alt='' />
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <div className='profile😢__cover'>
          <img
            src={`${STORAGE_DOMAIN}${cover}`}
            alt=''
            style={posIMG(coverPos)}
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
          <div className='profile😢__avatar'>
            <img
              src={`${STORAGE_DOMAIN}${avatar}`}
              alt=''
              style={posIMG(avatarPos)}
              onClick={() => setPreviewIMG(`${STORAGE_DOMAIN}${avatar}`)}
            />
            <span></span>
          </div>

          <div className='profile😢__name'>
            {!userName || userName === ' ' ? 'Username' : userName}
          </div>
        </div>
      </div>
    </div>
  )
}
