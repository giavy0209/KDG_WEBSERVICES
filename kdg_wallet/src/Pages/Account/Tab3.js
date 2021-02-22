import React, { useCallback, useEffect, useMemo, useState } from 'react'
import idCard from '../../assets/img/idcard.png'
import flag from '../../assets/img/flag.png'
import frontid from '../../assets/img/frontid.png'
import backid from '../../assets/img/backid.png'
import self from '../../assets/img/self.png'
import selfleft from '../../assets/img/selfleft.png'
import selfright from '../../assets/img/selfright.png'
import selfup from '../../assets/img/selfup.png'
import {asyncGetListContries, actChangeLoading} from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { checkLanguage } from '../../helpers'
import { message } from 'antd'
import callapi from '../../axios'
export default function App(){
    const dispatch = useDispatch()
    const listContries = useSelector(state=> state.contries)
    const language = useSelector(state=> state.lang)
    const isKYC = useSelector(state=> state && state.user && state.user.kyc)
    const [SelectedID, setSelectedID] = useState(0)
    const [SelectedContry, setSelectedContry] = useState('VN')
    const [ListContry, setListContry] = useState(null)
    const [ListContrySearch, setListContrySearch] = useState()

    const [ValidateForm , setValidateForm] = useState({
        name: false, 
        id: false,
        img1: false, 
        img2: false, 
        img3: false,
        img4: false,
        img5: false,
        img6: false,
        check: false,
    })
    
    const email = useSelector(state=>state.user && state.user.email)
    
    const findValueContry = useCallback(()=>{
        return listContries ? listContries.find(o=>SelectedContry === o.alpha2Code) : {}
    },[SelectedContry,listContries])

    const idtype=useMemo(()=>{
        return [{value: 0, name:checkLanguage({vi: 'Chứng minh nhân dân/ Bằng lái xe ', en: "Identity Card / Driver's License"}, language)}, {value: 1, name:checkLanguage({vi: 'Hộ chiếu', en: 'Passport'}, language)}]
    },[language])

    useEffect(()=>{
        if(listContries){
            setListContry([...listContries])
        }
    },[listContries])

    useEffect(()=>{
        setListContrySearch(findValueContry().name ? findValueContry().name : 'Viet Nam')
    },[SelectedContry,findValueContry])


    const findValueID = useCallback(()=>{
        return idtype.find(o=>SelectedID === o.value).name
    },[SelectedID, idtype])

   

    useEffect(()=>{
        const selectBlock = document.querySelectorAll('.type .selected')
        selectBlock.forEach(el=>{
            el.addEventListener('click',e=>{
                if(Array.from(el.classList).includes('show')) el.classList.remove('show')
                else el.classList.add('show')
            })  
        })
    },[])

    useMemo(()=>{
        dispatch(asyncGetListContries())
    },[dispatch])

    const readURL = useCallback((input)=>{
        input.persist()
        input = input.target
        if (input.files && input.files[0]) {
            if(input.files[0].size > 2000000){
                message.error(checkLanguage({vi: 'Kích thước tệp vượt quá 2MB',en: 'File size exceeds 2MB'},language))
            }else{
                var reader = new FileReader();
                reader.onload = function(e) {
                    var label = input.nextElementSibling
                    label.querySelector('img.placeholder').setAttribute('src' , e.target.result)
                }
                reader.readAsDataURL(input.files[0],);
            }
        }
    },[language])

    const userId = useSelector(state=>state && state.user && state.user._id)

    const handleSubmitForm = useCallback(async(e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        var submitData = {}
        for(var pair of data.entries()) {
            submitData[pair[0]] = pair[1]
        }
        
        const arrayUpload = []
        const uploadFont = new FormData()
        uploadFont.append('file', submitData.font)
        uploadFont.append('userId' , userId)
        arrayUpload.push(callapi().post('/api/upload_kyc_image', uploadFont))

        const uploadSelf = new FormData()
        uploadSelf.append('file', submitData.self)
        uploadSelf.append('userId' , userId)
        arrayUpload.push(callapi().post('/api/upload_kyc_image', uploadSelf))

        const uploadSelfLeft = new FormData()
        uploadSelfLeft.append('file', submitData.selfleft)
        uploadSelfLeft.append('userId' , userId)
        arrayUpload.push(callapi().post('/api/upload_kyc_image', uploadSelfLeft))

        const uploadSelfRight = new FormData()
        uploadSelfRight.append('file', submitData.selfright)
        uploadSelfRight.append('userId' , userId)
        arrayUpload.push(callapi().post('/api/upload_kyc_image', uploadSelfRight))

        const uploadSelfUp = new FormData()
        uploadSelfUp.append('file', submitData.selfup)
        uploadSelfUp.append('userId' , userId)
        arrayUpload.push(callapi().post('/api/upload_kyc_image', uploadSelfUp))

        if(SelectedID === 0){
            const uploadBack = new FormData()
            uploadBack.append('file', submitData.back)
            uploadBack.append('userId' , userId)
            arrayUpload.push(callapi().post('/api/upload_kyc_image', uploadBack))
        }
        
        dispatch(actChangeLoading(true))
        try {
            var res = await Promise.all(arrayUpload)
            var isUploadOK = true
            res.forEach(el=>{
                if(el.data.status !== 1) isUploadOK = false
            })

            if(!isUploadOK) {
                message.error(checkLanguage({vi: 'Tải hình lên không thành công, vui lòng thử lại', en: 'Upload images error, please try again'}, language))
                return
            }
            if(isUploadOK === true){
                var kycInfo = {
                    kyc_country : SelectedContry,
                    kyc_number : submitData.id,
                    kyc_name : submitData.name,
                    kyc : '2',
                    id : userId,
                }
                const resUpdate = (await callapi().put(`/api/user`,kycInfo)).data 
                dispatch(actChangeLoading(false))

                if(resUpdate.status === 1){
                    message.success(checkLanguage({vi: 'Gửi KYC thành công, bạn vui lòng chờ xét duyệt', en: 'Send KYC info to admin success. Please wait!'},language))
                }else if (resUpdate.status === 100){
                    message.error(checkLanguage({vi: 'Số chứng minh/passport đã được sử dụng cho tài khoản khác', en: 'Your ID is used for another account'},language))
                }else{
                    message.error(checkLanguage({vi: 'Gửi KYC không thành công, vui lòng thử lại', en: 'Send KYC fail, please try again!'},language))
                }
            }
        } catch (error) {
            dispatch(actChangeLoading(false))
            message.error(checkLanguage({vi: 'Tải hình lên không thành công, vui lòng thử lại', en: 'Upload images error, please try again'}, language))
            return
        }
        
    },[SelectedID,SelectedContry,userId,dispatch,language])
    return(
        <>
        <form
        onSubmit={handleSubmitForm}
        >
            <div className="input-group haft select">
                <p className='title'>{checkLanguage({vi: 'Loại giấy tờ', en: 'Document type'}, language)}</p>  
                <div className="select-block type">
                    <img alt="" src={idCard} />
                    <div className='selected'>
                        <span><span>{findValueID()}</span> <FontAwesomeIcon icon={faCaretDown}/></span>
                        <div className="dropdown-selected">
                            {
                                idtype.map((el,idx)=>
                                <p 
                                onClick={()=>setSelectedID(idx)}
                                className={SelectedID === idx ? 'selected-value' : ''} key={idx}>{el.name}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-group haft select">
                <p className='title'>{checkLanguage({vi: 'Quốc gia', en: 'Nation'}, language)}</p>  
                <div className="select-block">
                    <img style={{width: 27}} alt="" src={flag} />
                    <div className='selected'>
                        <span className="contry"> 
                            <img className="flag" alt="" src={listContries && findValueContry().flag}/> 
                            <input 
                            autocomplete="off"
                            id="defaultvalue"
                            onFocus={e=>{
                                setListContrySearch('')
                                e.target.parentElement.parentElement.classList.add('show')
                            }}
                            onChange={e=>{
                                setListContrySearch(e.target.value)
                                var value = e.target.value.toLowerCase()
                                if(value !== '') {
                                    ListContry.length = 0
                                    listContries.forEach((el)=>{
                                        if(el.name.toLowerCase().includes(value)){
                                            ListContry.push(el)
                                        }
                                    })
                                    setListContry([...ListContry])
                                }
                                if(value === ''){
                                    setListContry([...listContries])
                                }
                            }}
                            value={ListContrySearch} />
                            <FontAwesomeIcon icon={faCaretDown}/>
                        </span>
                        <div className="dropdown-selected">
                            {
                                ListContry && ListContry.map((el,idx)=>
                                <p 
                                onClick={(e)=>{
                                    setSelectedContry(el.alpha2Code)
                                    setListContrySearch(findValueContry().name)
                                    e.target.parentElement.parentElement.classList.remove('show')
                                }}
                                className={SelectedContry === el.alpha2Code ? 'selected-value' : ''} key={idx}>
                                    <img className="flag" alt="" src={el.flag}/>
                                    {el.name}
                                </p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-group">
                <span>{checkLanguage({vi: 'Tên', en: 'Name'}, language)}</span>
                <input 
                onChange={e => e.target.value !== '' ? setValidateForm({...ValidateForm, name: true}) : setValidateForm({...ValidateForm, name: false})}
                name="name" placeholder={checkLanguage({vi: 'Tên chính xác trên chứng minh / hộ chiếu', en: 'Name exactly on your ID / Passport'}, language)}/>
            </div>
            <div className="input-group">
                <span> {findValueID()} </span>
                <input 
                 onChange={e => e.target.value !== '' ? setValidateForm({...ValidateForm, id: true}) : setValidateForm({...ValidateForm, id: false})}
                name="id" placeholder={checkLanguage({vi : 'Số ', en: ''},language) + findValueID()}/>
            </div>
            <div className="input-group">
                <span>Email</span>
                <input disabled defaultValue={email} name="email" placeholder="Emai"/>
            </div>
            <ul>
                <li>{checkLanguage({vi: 'Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa = 2MB', en: 'Please use the format JPG., JPEG., PNG. Maximum file size = 2MB'}, language)}</li>
                <li>{checkLanguage({vi: 'Để đảm bảo quá trình xác minh được thuận tiện, vui lòng không che hoặc làm nhòe ảnh.', en: 'To ensure the verification process most quickly, please do not hide or blur the image'}, language)}</li>
            </ul>
            <div className="upload">
                <div className="text">{SelectedID === 0 ? checkLanguage({vi: '1. Mặt trước CMND/Bằng lái xe', en: `1. ID card / Driver's license front image`}, language) : checkLanguage({vi: '1. Ảnh chụp hộ chiếu', en: 'Passport image'}, language)}</div>
                <input 
                onChange={e=>{
                    readURL(e);
                    (e.target.files && e.target.files[0]) ? setValidateForm({...ValidateForm, img1: true}) : setValidateForm({...ValidateForm, img1: false})
                }}
                type="file" accept="image/*" name="font" id="font" style={{display: 'none'}} />
                <label htmlFor="font" className="upload-block">
                    <img alt="" src={frontid} />
                    <img alt="" src="" className="placeholder" />
                    <p> {checkLanguage({vi : 'Nhấn vào đây để tải lên ảnh mặt trước', en : 'Click here to upload front'}, language)} </p>
                </label>
            </div>

            {SelectedID === 0 && <div className="upload">
                <div className="text">{checkLanguage({vi: '2. Mặt sau CMND/ Bằng lái xe', en: `2. ID card / Driver's license back image`}, language)}</div>
                <input 
                onChange={e=>{
                    readURL(e);
                    (e.target.files && e.target.files[0]) ? setValidateForm({...ValidateForm, img2: true}) : setValidateForm({...ValidateForm, img2: false})
                }}
                type="file" accept="image/*" id="back" name="back" style={{display: 'none'}} />
                <label htmlFor="back" className="upload-block">
                    <img alt="" src={backid} />
                    <img alt="" src="" className="placeholder" />
                    <p>{checkLanguage({vi : 'Nhấn vào đây để tải lên ảnh mặt sau', en : 'Click here to upload back'}, language)}</p>
                </label>
            </div>}

            <div className="upload">
                <div className="text">{SelectedID === 0 ? '3' : '2'}
                    {
                        checkLanguage({
                            vi: '. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe/Hộ chiếu và một tờ giấy ghi tay chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn.(Chính diện)', 
                            en: `. Image with your face taken with your ID / Driver's License / Passport and a piece of paper which there is a hand written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Keep straight)`
                        }, language) 
                    }    
                </div>
                <input 
                onChange={e=>{
                    readURL(e);
                    (e.target.files && e.target.files[0]) ? setValidateForm({...ValidateForm, img3: true}) : setValidateForm({...ValidateForm, img3: false})
                }}
                type="file" accept="image/*" id="self" name="self" style={{display: 'none'}} />
                <label htmlFor="self" className="upload-block">
                    <img alt="" src={self} />
                    <img alt="" src="" className="placeholder" />
                    <p>{checkLanguage({vi : 'Nhấn vào đây để tải lên', en : 'Click here to upload'}, language)}</p>
                </label >
            </div>

            <div className="upload">
                <div className="text">{SelectedID === 0 ? '4' : '3'}
                    {
                        checkLanguage({
                            vi: '. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe/Hộ chiếu và một tờ giấy ghi tay chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn. (Mặt phía bên trái)', 
                            en: `. Image with your face taken with your ID / Driver's License / Passport and a piece of paper which there is a hand written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Turn left)`
                        }, language) 
                    }    
                </div>
                <input 
                onChange={e=>{
                    readURL(e);
                    (e.target.files && e.target.files[0]) ? setValidateForm({...ValidateForm, img4: true}) : setValidateForm({...ValidateForm, img4: false})
                }}
                type="file" accept="image/*" id="selfleft" name="selfleft" style={{display: 'none'}} />
                <label htmlFor="selfleft" className="upload-block">
                    <img alt="" src={selfleft} />
                    <img alt="" src="" className="placeholder" />
                    <p>{checkLanguage({vi : 'Nhấn vào đây để tải lên', en : 'Click here to upload'}, language)}</p>
                </label >
            </div>

            <div className="upload">
                <div className="text">{SelectedID === 0 ? '5' : '4'}
                    {
                        checkLanguage({
                            vi: '. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe/Hộ chiếu và một tờ giấy ghi tay chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn. (Mặt phía bên phải)', 
                            en: `. Image with your face taken with your ID / Driver's License / Passport and a piece of paper which there is a hand written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Turn right)`
                        }, language) 
                    }    
                </div>
                <input 
                onChange={e=>{
                    readURL(e);
                    (e.target.files && e.target.files[0]) ? setValidateForm({...ValidateForm, img5: true}) : setValidateForm({...ValidateForm, img5: false})
                }}
                type="file" accept="image/*" id="selfright" name="selfright" style={{display: 'none'}} />
                <label htmlFor="selfright" className="upload-block">
                    <img alt="" src={selfright} />
                    <img alt="" src="" className="placeholder" />
                    <p>{checkLanguage({vi : 'Nhấn vào đây để tải lên', en : 'Click here to upload'}, language)}</p>
                </label >
            </div>

            <div className="upload">
                <div className="text">{SelectedID === 0 ? '6' : '5'}
                    {
                        checkLanguage({
                            vi: '. Ảnh có mặt bạn chụp chung với CMND/Bằng lái xe/Hộ chiếu và một tờ giấy ghi tay chữ "KINGDOM GAME 4.0", ngày tháng năm hiện tại và chữ ký của bạn. (Mặt ngước lên)', 
                            en: `. Image with your face taken with your ID / Driver's License / Passport and a piece of paper which there is a hand written sentence "KINGDOM GAME 4.0", current date and your signature in that.(Turn up)`
                        }, language) 
                    }    
                </div>
                <input 
                onChange={e=>{
                    readURL(e);
                    (e.target.files && e.target.files[0]) ? setValidateForm({...ValidateForm, img6: true}) : setValidateForm({...ValidateForm, img6: false})
                }}
                type="file" accept="image/*" id="selfup" name="selfup" style={{display: 'none'}} />
                <label htmlFor="selfup" className="upload-block">
                    <img alt="" src={selfup} />
                    <img alt="" src="" className="placeholder" />
                    <p>{checkLanguage({vi : 'Nhấn vào đây để tải lên', en : 'Click here to upload'}, language)}</p>
                </label >
            </div>

            <div className="input-group checkbox">
                <input 
                className="checkbox"
                onChange={e =>setValidateForm({...ValidateForm, check: e.target.checked})}
                type="checkbox" name="confirm" id="confirm"/> 
                <label className="checkbox-label" for="confirm"><span className="checkbox-box"></span> <span>{checkLanguage({vi: 'Tôi xác nhận các thông tin trên là đúng sự thật', en: 'I certify that the above information is true'}, language)}</span></label>
            </div>
            
            <div className="input-group">
            <button 
            style={
                (isKYC !== '1' && isKYC !== '2')?
                (SelectedID === 0 ? 
                (
                    (ValidateForm.check && ValidateForm.id && ValidateForm.name && ValidateForm.img1 && ValidateForm.img2 && ValidateForm.img3, ValidateForm.img4 , ValidateForm.img5 , ValidateForm.img6) ?
                    {opacity: 1, pointerEvents: 'all'} : {opacity: .6, pointerEvents: 'none'}
                ) :
                (
                    (ValidateForm.check && ValidateForm.id && ValidateForm.name && ValidateForm.img1 && ValidateForm.img3, ValidateForm.img4 , ValidateForm.img5 , ValidateForm.img6) ? 
                    {opacity: 1, pointerEvents: 'all'} : {opacity: .6, pointerEvents: 'none'}
                )) : {opacity: .6, pointerEvents: 'none'}
                 
            }
            type="submit">{checkLanguage({vi: 'XÁC NHẬN', en: 'CONFIRM'}, language)}</button>
            </div>
        </form>
        </>
    )
}