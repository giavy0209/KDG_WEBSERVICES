import { useRef, useState } from 'react'
import '../../assets/scss/mint-nft.scss'
import uploadSVG from '../../assets/svg/upload.svg'
import checkSVG from '../../assets/svg/check.svg'
import closeSVG from '../../assets/svg/close.svg'
import errorSVG from '../../assets/svg/error.svg'
import callAPI from '../../axios'

export default function MintNFT() {
  const inputVideoRef = useRef()
  const videoPreviewRef = useRef()
  const imagePreviewRef = useRef()
  const tagsRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const defaultValueTags = useRef('KingdomGame, KDG, KingliveTv')

  const [percent, setPercent] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadNotSelected, setUploadNotSelected] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const handlePreviewVideo = e => {
    const files = e.target.files || []

    if (!files.length) return

    titleRef.current.value = files[0].name.replace('.mp4', '')
    descRef.current.value = files[0].name.replace('.mp4', '')

    const reader = new FileReader()

    reader.onload = e => {
      videoPreviewRef.current.src = e.target.result
      imagePreviewRef.current.src = e.target.result
      videoPreviewRef.current.load()
      videoPreviewRef.current.play()
    }

    reader.readAsDataURL(files[0])
  }


  const handleClearInput = () => {
    inputVideoRef.current.value = ''

    videoPreviewRef.current.src = ''

    tagsRef.current.value = defaultValueTags.current
    titleRef.current.value = ''
    descRef.current.value = ''
  }

  const handleUpload = async e => {
    e.preventDefault()

    if (isUploading) return
    setIsUploading(true)

    const data = new FormData(e.target)

    let res

    try {
      res = await callAPI.post('/upload_video', data, true, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: e => {
          if (e.lengthComputable) {
            let percent = Math.round((e.loaded / e.total) * 100)
            setPercent(percent)
            // console.log({ percent, loaded: e.loaded, total: e.total })
          }
        },
      })
    } catch (error) {
      // console.log('catch error upload')
      setUploadError(true)
    }

    if (res.status === 1) {
      // console.log('upload thanh cong')
      setUploadSuccess(true)
    }

    if (res.status === 100) {
      // console.log('chua chon video')
      setUploadNotSelected(true)
    }

    if (res.status === 0) {
      // console.log('loi khong xac dinh')
      setUploadError(true)
    }

    // console.log({ res })
    setPercent(0)
    setIsUploading(false)
  }

  const handleUploadSuccess = () => {
    setUploadSuccess(false)
    handleClearInput()
  }

  return (
    <>
      <form className='upload container' onSubmit={handleUpload}>
        {percent > 0 && (
          <div className='upload__loading'>
            <div className='circle'>
              <div className='percent'>{percent}%</div>
              <svg style={{ '--percent': percent }}>
                <circle
                  cx='100'
                  cy='100'
                  r='95'
                  fill='none'
                  stroke='rgba(255, 255, 255, 0.05)'
                  strokeWidth='10'
                  strokeLinecap='round'
                ></circle>
                <circle
                  cx='100'
                  cy='100'
                  r='95'
                  fill='none'
                  stroke='rgba(255, 255, 255, 1)'
                  strokeWidth='10'
                  strokeLinecap='round'
                ></circle>
              </svg>
            </div>
          </div>
        )}

        {uploadSuccess && (
          <div className='upload__popup'>
            <div className='container😀'>
              <img className='close😀' src={closeSVG} alt='' onClick={handleUploadSuccess} />
              <div className='title😀'>Your file was uploaded!</div>
              <div className='description😀'>
                <img src={checkSVG} alt='' />
                <span>
                  Your file was succesfully uploaded. Please wait a minute to appear on the website.
                </span>
              </div>
              <div className='upload__button button😀' onClick={handleUploadSuccess}>
                Done
              </div>
            </div>
          </div>
        )}

        {uploadNotSelected && (
          <div className='upload__popup'>
            <div className='container😀'>
              <img
                className='close😀'
                src={closeSVG}
                alt=''
                onClick={() => setUploadNotSelected(false)}
              />
              <div className='title😀'>Uploading has failed!</div>
              <div className='description😀'>
                <img src={errorSVG} alt='' />
                <span>
                  Uploading has failed. You haven't selected a video yet. Please check it again to
                  complete.
                </span>
              </div>
              <div
                className='upload__button button😀 ok😀'
                onClick={() => setUploadNotSelected(false)}
              >
                OK
              </div>
            </div>
          </div>
        )}

        {uploadError && (
          <div className='upload__popup'>
            <div className='container😀'>
              <img
                className='close😀'
                src={closeSVG}
                alt=''
                onClick={() => setUploadError(false)}
              />
              <div className='title😀'>Uploading has failed!</div>
              <div className='description😀'>
                <img src={errorSVG} alt='' />
                <span>Something went wrong. Please try again later!</span>
              </div>
              <div className='upload__button button😀 ok😀' onClick={() => setUploadError(false)}>
                OK
              </div>
            </div>
          </div>
        )}

        <p className='upload__title'>Create New NFT</p>

        <p className='upload__description mb-50'>
          <span>Image, Video, Audio or Video 3D.</span>
          <span>File types supported JPG, PNG, GIF, MP4</span>
          <span>Max size: 10MB</span>
        </p>

        <div className='upload__layout mb-50'>
          <div className='upload__left'>
            <div className='upload__video mb-25'>
              <input
                name='video'
                ref={inputVideoRef}
                type='file'
                accept='.mp4,.png,.jpg,.gif'
                onInput={handlePreviewVideo}
              />
              <video ref={videoPreviewRef}></video>
              <img className="preview-image" ref={imagePreviewRef} alt="" />
              <img src={uploadSVG} alt='' />
              <span>Drap and drop video file</span>
            </div>

            <div className='upload__label'>Amount to mint</div>

            <input
              name='tags'
              ref={tagsRef}
              className='upload__input mb-25'
              type='number'
              placeholder='1'
            />
          </div>

          <div className='upload__right'>
            <div className='upload__label'>Name</div>

            <input
              name='name'
              ref={titleRef}
              className='upload__input mb-25'
              type='text'
              placeholder='Enter title for video'
            />

            <div className='upload__label'>Add a description</div>

            <textarea
              name='description'
              ref={descRef}
              className='upload__textarea'
              placeholder='Enter description for video'
            ></textarea>
          </div>
        </div>

        {!isUploading && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type='submit' className='upload__button mr-15'>
              Upload
            </button>
            <div className='upload__button upload__button--cancel' onClick={handleClearInput}>
              Cancel
            </div>
          </div>
        )}
      </form>
    </>
  )
}
