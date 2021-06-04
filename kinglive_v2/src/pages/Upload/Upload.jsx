import '../../assets/scss/upload.scss'
import uploadSVG from '../../assets/svg/upload.svg'
import plusSVG from '../../assets/svg/plus.svg'

export default function Upload() {
  return (
    <>
      <div className='upload container'>
        <p className='upload__title'>Upload Video</p>

        <p className='upload__description'>
          <span>Setup information. Ensure that there are no violent or counter-revolutionary</span>
          <span>actions and words during the livestream process.</span>
          <span>Do not use famous artist's image without permission</span>
        </p>

        <div className='upload__container'>
          <div className='upload__left'>
            <div className='upload__video mb-25'>
              <input type='file' />
              <img src={uploadSVG} alt='' />
              <span>Drap and drop video file</span>
            </div>

            <div className='upload__label'>Enter up to 3 tags, separate by “,”</div>

            <input className='upload__input mb-25' type='text' placeholder='3 tags' />

            <div className='upload__label'>Thumbnail</div>

            <div className='upload__thumbDesc mb-10'>
              Please use the format JPG, JPEG, PNG. Maximum file size: 2MB. To make sure images
              engage viewers, please use sharp images.
            </div>

            <div className='upload__thumbnail'>
              <input type='file' />
              <img src={plusSVG} alt='' />
            </div>
          </div>

          <div className='upload__right'>
            <div className='upload__label'>Title</div>

            <input
              className='upload__input mb-25'
              type='text'
              placeholder='Enter title for video'
            />

            <div className='upload__label'>Add a description</div>

            <textarea className='upload__textarea' placeholder='Description'></textarea>
          </div>
        </div>
      </div>
    </>
  )
}
