import { useRef } from 'react'
import '../../assets/scss/upload.scss'
import plusSVG from '../../assets/svg/plus.svg'
import uploadSVG from '../../assets/svg/upload.svg'

export default function Upload() {
  const inputVideoRef = useRef()
  const videoPreviewRef = useRef()
  const thumbnailPreviewRef = useRef()
  const inputThumbnailRef = useRef()
  const tagsRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const defaultValueTags = useRef('KingdomGame, KDG, KingliveTv')

  const handlePreviewVideo = e => {
    const files = e.target.files || []

    if (!files.length) return

    titleRef.current.value = files[0].name.replace('.mp4', '')
    descRef.current.value = files[0].name.replace('.mp4', '')

    const reader = new FileReader()

    reader.onload = e => {
      videoPreviewRef.current.src = e.target.result
      videoPreviewRef.current.load()
      videoPreviewRef.current.play()
    }

    reader.readAsDataURL(files[0])
  }

  const handlePreviewThumbnail = e => {
    const files = e.target.files || []

    if (!files.length) return

    const reader = new FileReader()

    reader.onload = e => {
      thumbnailPreviewRef.current.src = e.target.result
      thumbnailPreviewRef.current.style.opacity = 1
    }

    reader.readAsDataURL(files[0])
  }

  const handleCancelUpload = () => {
    inputVideoRef.current.value = ''
    inputThumbnailRef.current.value = ''

    videoPreviewRef.current.src = ''
    thumbnailPreviewRef.current.src = ''
    thumbnailPreviewRef.current.style.opacity = 0

    tagsRef.current.value = defaultValueTags.current
    titleRef.current.value = ''
    descRef.current.value = ''
  }

  return (
    <>
      <div className='upload container'>
        <p className='upload__title'>Upload Video</p>

        <p className='upload__description'>
          <span>Setup information. Ensure that there are no violent or counter-revolutionary</span>
          <span>actions and words during the livestream process.</span>
          <span>Do not use famous artist's image without permission</span>
        </p>

        <div className='upload__container mb-50'>
          <div className='upload__left'>
            <div className='upload__video mb-25'>
              <input
                ref={inputVideoRef}
                type='file'
                accept='video/mp4'
                onInput={handlePreviewVideo}
              />
              <video ref={videoPreviewRef}></video>
              <img src={uploadSVG} alt='' />
              <span>Drap and drop video file</span>
            </div>

            <div className='upload__label'>Enter up to 3 tags, separate by “,”</div>

            <input
              ref={tagsRef}
              className='upload__input mb-25'
              type='text'
              placeholder='Enter tags for video'
              defaultValue={defaultValueTags.current}
            />

            <div className='upload__label'>Thumbnail</div>

            <div className='upload__thumbDesc mb-10'>
              Please use the format JPG, JPEG, PNG. Maximum file size: 2MB. To make sure images
              engage viewers, please use sharp images.
            </div>

            <div className='upload__thumbnail'>
              <input
                ref={inputThumbnailRef}
                type='file'
                accept='image/*'
                onInput={handlePreviewThumbnail}
              />
              <img className='preview' ref={thumbnailPreviewRef} alt='' />
              <img src={plusSVG} alt='' />
            </div>
          </div>

          <div className='upload__right'>
            <div className='upload__label'>Title</div>

            <input
              ref={titleRef}
              className='upload__input mb-25'
              type='text'
              placeholder='Enter title for video'
            />

            <div className='upload__label'>Add a description</div>

            <textarea
              ref={descRef}
              className='upload__textarea'
              placeholder='Enter description for video'
            ></textarea>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className='upload__button mr-15'>Upload</div>
          <div className='upload__button upload__button--cancel' onClick={handleCancelUpload}>
            Cancel
          </div>
        </div>
      </div>
    </>
  )
}
