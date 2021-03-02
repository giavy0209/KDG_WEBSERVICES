import React from 'react';
import { storage } from '../../helpers';
import wallet from '../../assets/img/wallet.png';
import gamehub from '../../assets/img/gamehub.png';
import live from '../../assets/img/live.png';
import walletbg from '../../assets/img/walletbg.jpg';
import gamehubbg from '../../assets/img/gamehubbg.jpg';
import livebg from '../../assets/img/livebg.jpg';

export default function Services() {
  const refresh = storage.getRefresh();

  return (
    <>
      <div className='form-block'>
        <div className='left'>
          <img alt='' src='/images/img-login2.png'></img>
        </div>
        <div className='right'>
          <div className='services'>
            <div
              onClick={() => window.open('https://wallet.kingdomgame.org?refresh=' + refresh)}
              className='service img img-3-1'
            >
              <img src={walletbg} alt='' />
              <div className='logo'>
                <img src={wallet} alt='' />
                <p className='des'>Safe, highly secure, fast and user-friendly crypto wallet platform</p>
              </div>
            </div>
            <div className='service img img-3-1'>
              <img src={livebg} alt='' />
              <div className='logo'>
                <img src={live} alt='' />
                <p className='des'>Comming Soon</p>
              </div>
            </div>
            <div className='service img img-3-1'>
              <img src={gamehubbg} alt='' />
              <div className='logo'>
                <img src={gamehub} alt='' />
                <p className='des'>Comming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}