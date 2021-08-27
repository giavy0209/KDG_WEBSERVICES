import { useCallback } from 'react'
import banner from '../../assets/images/swap/banner.jpg'
import bscs from '../../assets/images/swap/bscs.png'
import mxc from '../../assets/images/swap/mxc.png'
import pancake from '../../assets/images/swap/pancake.png'

export default function Swap() {
  const setHeight = useCallback(() => {
    const listItem = document.querySelectorAll('.list-swap .item')
    let heightest = listItem[0].offsetHeight
    listItem.forEach((el) => {
      if (el.offsetHeight > heightest) heightest = el.offsetHeight
    })
    listItem.forEach((el) => (el.style.height = heightest + 'px'))
  }, [])

  return (
    <>
      <div className='swap'>
        <div className='banner'>
          <img src={banner} alt='' />
        </div>
        <div className='title'>Swap</div>
        <p className='des'>Trade token in an instant</p>
        <div className='container'>
          <div onLoad={setHeight} className='list-swap'>
            <div className='item'>
              <div className='swap-method'>
                <img src={pancake} alt='' />
                <a
                  href='https://pancakeswap.finance/swap#/swap?outputCurrency=0x87a2d9a9a6b2d61b2a57798f1b4b2ddd19458fb6'
                  target='_blank'
                  rel='noreferrer'
                  className='swap-btn'
                >
                  Swap
                </a>
              </div>
            </div>
            <div className='item'>
              <div className='swap-method'>
                <img src={bscs} alt='' />
                <a
                  href='https://bscstation.finance/#/swap?outputCurrency=0x87a2d9a9a6b2d61b2a57798f1b4b2ddd19458fb6'
                  target='_blank'
                  rel='noreferrer'
                  className='swap-btn'
                >
                  Swap
                </a>
              </div>
            </div>
            <div className='item'>
              <div className='swap-method'>
                <img src={mxc} alt='' />
                <a
                  href='https://www.mexc.com/exchange/KDG_USDT'
                  target='_blank'
                  rel='noreferrer'
                  className='swap-btn'
                >
                  Swap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
