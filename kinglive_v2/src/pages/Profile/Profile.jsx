import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../assets/scss/profile.scss'
import editSVG from '../../assets/svg/edit.svg'
import callAPI from '../../axios'
import { STORAGE_DOMAIN } from '../../constant'
import convertPositionIMG from '../../helpers/convertPositionIMG'

export default function Profile() {
  const userRedux = useSelector(state => state.user)
  const [previewIMG, setPreviewIMG] = useState('')
  const [isEdit, setIsEdit] = useState(false)

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
      <div style={{ position: 'relative', marginBottom: 100 }}>
        {previewIMG && (
          <div className='profile😢__previewIMG' onClick={() => setPreviewIMG('')}>
            <img src={previewIMG} alt='' />
          </div>
        )}

        <div className='profile😢__cover'>
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
            top: 10,
            right: 10,
            display: 'flex',
          }}
        >
          {!isEdit && (
            <div className='profile😢__button-edit' onClick={() => setIsEdit(true)}>
              <img src={editSVG} alt='' />
              <span>Change profile information</span>
            </div>
          )}

          {isEdit && (
            <div className='profile😢__button-edit mr-10'>
              <img src={editSVG} alt='' />
              <span>Change Avatar</span>
            </div>
          )}

          {isEdit && (
            <div className='profile😢__button-edit'>
              <img src={editSVG} alt='' />
              <span>Change Cover</span>
            </div>
          )}
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
              style={convertPositionIMG(avatarPos)}
              onClick={() => setPreviewIMG(`${STORAGE_DOMAIN}${avatar}`)}
            />
            <span></span>
          </div>

          <div className='profile😢__name'>
            {!userName || userName === ' ' ? 'Username' : userName}
          </div>
        </div>
      </div>

      {isEdit && (
        <div className='profile😢__edit-information'>
          <h3>Edit Information</h3>

          <div className='form-control'>
            <div className='label'>Surname</div>
            <input type='text' />
          </div>

          <div className='form-control'>
            <div className='label'>First Name</div>
            <input type='text' />
          </div>

          <div className='form-control'>
            <div className='label'>Phone Number</div>
            <input type='text' />
          </div>

          <div className='form-control'>
            <div className='label'>Date of birth</div>
            <input type='text' />
          </div>

          <div className='form-control'>
            <div className='label'>Address</div>
            <input type='text' />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 35 }}>
            <div className='buttonX mr-20'>Update</div>
            <div className='buttonX buttonX--cancel' onClick={() => setIsEdit(false)}>
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
