import '../../assets/scss/nft-market.scss'
import banner from '../../assets/images/nft-market/banner.jpg'
import nft from '../../assets/images/nft-market/nft.jpg'
import { useState } from 'react'
const top9 = [
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
    {
        img : nft,
        name : 'The World NFT Set Up In My Mind',
        price : 100000,
        artist : 'Esther Howard',
    },
]
export default function NFT() {
    const [ActiveTop9 , setActiveTop9] = useState(0)
    return (
        <>
            <div className="nft-market">
                <div className="banner">
                    <img src={banner} alt="" />
                </div>
                <div className="container">
                    <div className="top-9">
                        <p className="sub-title">Buy, sell, bidding and discover artworks</p>
                        <p className="title">The 1st & the best NFT marketplace</p>
                        <div className="create">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#F52871" />
                                <path d="M12.1117 7.17602V8.60002H8.92775V11.944H7.43975V8.60002H4.23975V7.17602H7.43975V3.84802H8.92775V7.17602H12.1117Z" fill="#F52871" />
                            </svg>
                            Create New NFT
                        </div>
                        <div className="list">
                            <div className="left">
                                {
                                    top9.map((o , index) => <span key={index} onClick={()=>setActiveTop9(index)} className={`item ${ActiveTop9 === index ? 'active' : ''}`}>
                                        <img src={o.img} alt="" />
                                    </span> )
                                }
                            </div>
                            <div className="mid">
                                <img src={top9[ActiveTop9].img} alt="" />
                            </div>
                            <div className="right">
                                <div className="name">{top9[ActiveTop9].name}</div>
                                <div className="price">{top9[ActiveTop9].price} KDG</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}