import '../../assets/scss/upload.scss'
import uploadSVG from '../../assets/svg/upload.svg'
import plusSVG from '../../assets/svg/plus.svg'
import { useRef } from 'react'

export default function Upload() {
  const videoPreviewRef = useRef()
  const thumbnailPreviewRef = useRef()

  const handleUploadVideo = e => {
    const files = e.target.files || []

    if (!files.length) return

    const reader = new FileReader()
    const videoSource = document.createElement('source')

    reader.onload = e => {
      videoSource.setAttribute('src', e.target.result)
      videoPreviewRef.current.innerHTML = ''
      videoPreviewRef.current.appendChild(videoSource)
      videoPreviewRef.current.load()
      videoPreviewRef.current.play()
    }

    reader.readAsDataURL(files[0])
  }

  const handleUploadThumbnail = e => {
    const files = e.target.files || []

    if (!files.length) return

    const reader = new FileReader()

    reader.onload = e => {
      thumbnailPreviewRef.current.src = e.target.result
    }

    reader.readAsDataURL(files[0])
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
              <input type='file' accept='video/mp4' onInput={handleUploadVideo} />
              <video ref={videoPreviewRef}></video>
              <img src={uploadSVG} alt='' />
              <span>Drap and drop video file</span>
            </div>

            <div className='upload__label'>Enter up to 3 tags, separate by “,”</div>

            <input className='upload__input mb-25' type='text' placeholder='Enter tags for video' />

            <div className='upload__label'>Thumbnail</div>

            <div className='upload__thumbDesc mb-10'>
              Please use the format JPG, JPEG, PNG. Maximum file size: 2MB. To make sure images
              engage viewers, please use sharp images.
            </div>

            <div className='upload__thumbnail'>
              <input type='file' accept='image/*' onInput={handleUploadThumbnail} />
              <img className='preview' ref={thumbnailPreviewRef} alt='' />
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

            <textarea
              className='upload__textarea'
              placeholder='Enter description for video'
            ></textarea>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className='upload__button'>Upload</div>
        </div>
      </div>
    </>
  )
}
