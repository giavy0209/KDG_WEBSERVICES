import '../../assets/scss/nft-market.scss'
import banner from '../../assets/images/nft-market/banner.jpg'
import nft from '../../assets/images/nft-market/nft.jpg'
import avatar from '../../assets/images/nft-market/avatar.png'
import kdg from '../../assets/images/nft-market/kdg.png'
import { useState , useRef , useCallback, useEffect} from 'react'
import callAPI from '../../axios'
import { paymentList } from '../../contracts/ERC20'


const top9 = [
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
    {
        img: nft,
        name: 'The World NFT Set Up In My Mind',
        price: 100000,
        artist: 'Esther Howard',
    },
]

const top_quatity = [
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
    {
        avatar: avatar,
        name: 'Dmm',
        quatity: 100
    },
]


export default function NFT() {
    const [AssetSellList, setAssetSellList] = useState([])
    const [ActiveTop9, setActiveTop9] = useState(0)
    const [ActiveRanking, setActiveRanking] = useState(0)
    const isLoadMore = useRef(true)
    const isLoadingAPI = useRef(false)
    const [isLoading, setIsLoading] = useState(false)

    const getAssets = useCallback(async () => {
        var ids = AssetSellList.map(o => o._id);
        
        const res = await callAPI.get(`/listing-asset?limit=20&${ids.length?`ids=${ids}`:""}`,true,{headers: {'x-authenticated-id-by-kdg':'60f5dff80169e54df90a0884'}})
    
        if (res?.data?.length === 0) {
          isLoadMore.current = false
          setAssetSellList([...AssetSellList])
          return
        }
    
        setAssetSellList([...AssetSellList, ...res?.data?res.data:[]])
      }, [AssetSellList])

      useEffect(() => {
        const handleLoad = async () => {
          const totalHeight = document.getElementById('root').clientHeight
          const scrolledHeight = window.scrollY + window.innerHeight
          const restHeight = totalHeight - scrolledHeight
          const isEnd = restHeight <= 100
    
          if (isEnd && isLoadMore.current && !isLoadingAPI.current) {
            isLoadingAPI.current = true
            setIsLoading(true)
            await getAssets()
            setIsLoading(false)
            isLoadingAPI.current = false
          }
        }
        window.addEventListener('scroll', handleLoad)

        return () => {
          window.removeEventListener('scroll', handleLoad)
        }
      }, [getAssets])
    

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
                                    top9.map((o, index) => <span key={index} onClick={() => setActiveTop9(index)} className={`item ${ActiveTop9 === index ? 'active' : ''}`}>
                                        <img src={o.img} alt="" />
                                    </span>)
                                }
                            </div>
                            <div className="mid">
                                <img src={top9[ActiveTop9].img} alt="" />
                            </div>
                            <div className="right">
                                <div className="name">{top9[ActiveTop9].name}</div>
                                <div className="price">{top9[ActiveTop9].price} KDG</div>
                                <div className="info">
                                    <div className="row">
                                        <span>Artist : </span>
                                        <span>{top9[ActiveTop9].artist}</span>
                                    </div>
                                    <div className="row">
                                        <span>Created : </span>
                                        <span>Ngày tạo</span>
                                    </div>
                                    <div className="detail">Detail {'>'}{'>'}</div>
                                </div>
                                <span className="btn">
                                    Buy Now
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="ranking">
                        <div className="title">Ranking</div>
                        <div className="tabs">
                            <div onClick={() => setActiveRanking(0)} className={`tab ${ActiveRanking === 0 ? 'active' : ''}`}>Top Seller (Quatity)</div>
                            <div onClick={() => setActiveRanking(1)} className={`tab ${ActiveRanking === 1 ? 'active' : ''}`}>Top Seller (revenue)</div>
                        </div>
                        <div className="list">
                            <div className={`top-quatity ${ActiveRanking === 0 ? 'show' : ''}`}>
                                {
                                    top_quatity.map((o, index) => <div className="item">
                                        <span className="index">{index + 1}</span>
                                        <span className="avatar"><img src={o.avatar} alt="" /></span>
                                        <span className="info">
                                            <span className="name">{o.name}</span>
                                            <span className="quatity">{o.quatity} Artworks</span>
                                        </span>
                                    </div>)
                                }
                            </div>
                            <div className={`top-seller ${ActiveRanking === 1 ? 'show' : ''}`}>
                                {
                                    top_quatity.map((o, index) => <div className="item">
                                        <span className="index">{index + 1}</span>
                                        <span className="avatar"><img src={o.avatar} alt="" /></span>
                                        <span className="info">
                                            <span className="name">{o.name}</span>
                                            <span className="quatity">{o.quatity} Artworks</span>
                                        </span>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="popular-nft">
                        <div className="title">Popular NFT</div>
                        <div className="list">
                            {
                                AssetSellList.map(o => <div className="item">
                                    <div className="avatar-container">
                                        <span className="avatar">
                                            <img src={o.owner?.avatar} alt="" />
                                        </span>
                                    </div>
                                    <div className="nft-blur">
                                        <div className="blur">
                                            <img src={o.asset?.metadata?.image} alt="" />
                                        </div>
                                        <div className="nft">
                                            <img src={o.asset?.metadata?.image} alt="" />
                                        </div>
                                    </div>
                                    <span className="name">{o.asset?.metadata?.name}</span>
                                    <div className="info">
                                        <img src={kdg} alt="" />
                                        <span className="price">{o.price}</span>
                                        <span className="amount">Amount: {o.quatity}</span>
                                    </div>
                                    <div className="btn">Insufficient KDG balance</div>
                                </div> )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}