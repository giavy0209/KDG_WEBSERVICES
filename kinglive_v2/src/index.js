import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Providers from './Providers'
import './assets/scss/styles.scss'
import './assets/scss/live.scss'
import './assets/scss/nft-market.scss'
import './assets/scss/my-artwork.scss'
import './assets/scss/my-artwork-detail.scss'
import './assets/scss/mint-nft.scss'
import './assets/scss/my-artwork-detail.scss'
import './assets/scss/upload.scss'
import './assets/scss/profile.scss'
import './assets/scss/watchlive.scss'
import './assets/scss/search.scss'
import './assets/scss/swap.scss'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
