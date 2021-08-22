import { STORAGE_DOMAIN } from 'constant'
import convertPositionIMG from 'helpers/convertPositionIMG'
import { useSelector } from 'react-redux'
import '../../assets/scss/avatar.scss'
import avatarDefault from '../../assets/svg/avatarDefault.svg'

export default function Avatar({ image, pos, ...restProps }) {
  const user = useSelector((state) => state.user)
  const avatarPath = user?.kyc?.avatar?.path
  const avatarPos = user?.kyc?.avatar_pos

  return (
    <span className='avatar😀' {...restProps}>
      {typeof image === 'undefined' && avatarPath && (
        <img src={`${STORAGE_DOMAIN}${avatarPath}`} style={convertPositionIMG(avatarPos)} alt='' />
      )}

      {typeof image === 'undefined' && !avatarPath && <img src={avatarDefault} alt='' />}

      {image && <img src={`${STORAGE_DOMAIN}${image}`} style={convertPositionIMG(pos)} alt='' />}

      {image === null && <img src={avatarDefault} alt='' />}
    </span>
  )
}
