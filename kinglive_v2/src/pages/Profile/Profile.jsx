import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/scss/profile.scss'
import editSVG from '../../assets/svg/edit.svg'
import radioSVG from '../../assets/svg/radio.svg'
import callAPI from '../../axios'
import ButtonFollow from '../../components/ButtonFollow'
import { STORAGE_DOMAIN } from '../../constant'
import convertPositionIMG from '../../helpers/convertPositionIMG'
import isValidDate from '../../helpers/isValidDate'
import { asyncInitUser } from '../../store/actions'

export default function Profile() {
  const dispatch = useDispatch()

  const uid = new URLSearchParams(window.location.search).get('uid')
  const userRedux = useSelector(state => state.user)
  const [isFollow, setIsFollow] = useState(false)
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
  const userBirthday = useMemo(() => {
    let x = userData?.kyc?.birth_day.split('/')
    if (!x) return ''

    let [month, day, year] = x
    return `${day}/${month}/${year}`
  }, [userData])

  // Get Profile of User dependent uid
  useEffect(() => {
    let id = uid || userRedux?._id
    if (!id) return
    ;(async () => {
      try {
        const res = await callAPI.get(`/user?uid=${id}`)
        console.log({ userData: res.data })
        setUserData(res.data)

        // Check Follow Yet
        if (res.data.isFollowed) {
          setIsFollow(true)
        } else {
          setIsFollow(false)
        }
      } catch (error) {
        console.log('Error get user', error)
      }
    })()
  }, [uid, userRedux])

  // Edit User
  const handleEditUser = async e => {
    e.preventDefault()

    const data = new FormData(e.target)
    if (!isValidDate(data.get('birth_day'))) {
      console.log('invalid date')
      return
    }

    const submitData = {}
    for (let field of data) {
      submitData[field[0]] = field[1]
    }

    submitData.gioi_tinh_id = Number(submitData.gioi_tinh_id)
    submitData.id = userData?._id

    let [day, month, year] = submitData.birth_day.split('/')
    submitData.birth_day = `${month}/${day}/${year}`

    try {
      const res = await callAPI.put('/user', submitData)

      if (res.status === 1) {
        dispatch(asyncInitUser())
      }
    } catch (error) {
      console.log('Error Edit User', error)
    }
  }

  // Follow and Unfollow
  const handleFollow = async () => {
    try {
      const res = await callAPI.post(`follow?id=${userData?._id}`)
      if (res.status === 1) setIsFollow(x => !x)
    } catch (error) {
      console.log('error follow or unfollow', error)
    }
  }

  return (
    <div className='profile😢 container'>
      <div style={{ position: 'relative', marginBottom: 60 }}>
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

        {(!uid || uid === userRedux?._id) && (
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
        )}

        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
        </div>
      </div>

      <div className='profile😢__name'>{!userName || userName === ' ' ? 'Username' : userName}</div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <ButtonFollow isFollow={isFollow} handleFollow={handleFollow} />
      </div>

      {isEdit && (
        <form onSubmit={handleEditUser} className='profile😢__edit-information'>
          <h3>Edit Information</h3>

          <div className='form-control'>
            <div className='label'>Surname</div>
            <input type='text' name='last_name' defaultValue={userData?.kyc?.last_name || ''} />
          </div>

          <div className='form-control'>
            <div className='label'>First Name</div>
            <input type='text' name='first_name' defaultValue={userData?.kyc?.first_name || ''} />
          </div>

          <div className='form-control'>
            <div className='label'>Phone Number</div>
            <input type='text' name='phone' defaultValue={userData?.kyc?.phone || ''} />
          </div>

          <div className='form-control'>
            <div className='label'>Gender</div>
            <div style={{ display: 'flex' }}>
              <div className='radioContainer mr-30'>
                <input type='radio' name='gioi_tinh_id' value={0} id='male' defaultChecked />
                <div className='pseudo-radio'>
                  <img src={radioSVG} alt='' />
                </div>
                <label htmlFor='male'>Male</label>
              </div>
              <div className='radioContainer'>
                <input type='radio' name='gioi_tinh_id' value={1} id='female' />
                <div className='pseudo-radio'>
                  <img src={radioSVG} alt='' />
                </div>
                <label htmlFor='female'>Female</label>
              </div>
            </div>
          </div>

          <div className='form-control'>
            <div className='label'>Date of birth</div>
            <input
              type='text'
              name='birth_day'
              placeholder='dd/mm/yyyy'
              defaultValue={userBirthday || ''}
            />
          </div>

          <div className='form-control'>
            <div className='label'>Address</div>
            <input type='text' name='address' defaultValue={userData?.kyc?.address || ''} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 35 }}>
            <button type='submit' className='buttonX mr-20'>
              Update
            </button>
            <div className='buttonX buttonX--cancel' onClick={() => setIsEdit(false)}>
              Cancel
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
