import React from 'react';
import ReactHlsPlayer from 'react-hls-player/dist'
import { PLAY_STREAM } from '../../constant'

function VideoPlayer({streamData}) {
    return (
        <>
            <div className='watchlive__videoContainer'>
                <ReactHlsPlayer
                    className='watchlive__videoPlayer'
                    src={`${PLAY_STREAM}${streamData?.key}/index.m3u8`}
                    autoPlay={true}
                    controls={true}
                    muted={false}
                    width='100%'
                    height='100%'
                />
            </div>
        </>
    )
}

export default React.memo(VideoPlayer)