import React from 'react'
import { storage } from '../../helpers'
export default function App({}) {
    const refresh = storage.getRefresh()

    return (
        <>
        <div className="form-block">
            <div className="left"><img alt="" src="/images/img-login2.png"></img></div>
            <div className="right" onClick={() => {
                window.open('http://localhost:3001?refresh='+refresh)
            }}>
               dangnhap
            </div>
        </div>
        </>
    )
}