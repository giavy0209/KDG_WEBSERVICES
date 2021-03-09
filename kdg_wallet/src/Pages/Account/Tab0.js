import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import callAPI from '../../axios';
import { useLang } from '../../context/LanguageLayer';
import { actChangeLoading } from '../../store/action';

function isValidDate(dateString) {
  var regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var [month, year] = dateString.split('/');
  var d = new Date(year, month - 1, 0);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return true;
}

export default function Tab0() {
  const [{ language, AccountPageLanguage }] = useLang();
  const dispatch = useDispatch();
  const [gioi_tinh, setgioi_tinh] = useState(0);
  const userID = useSelector(state => state.user?._id);

  const handleSubmitForm = useCallback(
    async e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const submitData = {};
      for (var pair of data.entries()) {
        submitData[pair[0]] = pair[1];
      }

      submitData.gioi_tinh_id = Number(submitData.gioi_tinh_id);
      submitData.id = userID;

      var [day, month, year] = submitData.birth_day.split('/');
      submitData.birth_day = `${month}/${day}/${year}`;

      try {
        dispatch(actChangeLoading(true));
        const res = await callAPI.put(`/user`, submitData);
        dispatch(actChangeLoading(false));
        console.log('res', res);
        message.success(AccountPageLanguage[language].update_info_success);

      } catch (error) {}
    },
    [dispatch, userID, AccountPageLanguage, language]
  );

  const user = useSelector(state => state.user);
  console.log(user);
  useEffect(() => {
    user && setgioi_tinh(user.gioi_tinh_id);
  }, [user]);

  return (
    <>
      <h3>{AccountPageLanguage[language].personal_info}</h3>
      <form onSubmit={handleSubmitForm}>
        <div className='input-group haft'>
          <span>{AccountPageLanguage[language].surname}</span>
          <input defaultValue={user && user.first_name ? user.first_name : ''} name='first_name' />
        </div>
        <div className='input-group haft'>
          <span>{AccountPageLanguage[language].last_name}</span>
          <input defaultValue={user && user.last_name ? user.last_name : ''} name='last_name' />
        </div>
        <div className='input-group'>
          <span>Email</span>
          <input defaultValue={user && user.email ? user.email : ''} name='email' />
        </div>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].phone_number}</span>
          <input defaultValue={user && user.phone ? user.phone : ''} name='phone' />
        </div>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].gender}</span>
          <div className='radio-group'>
            <div className='group-label'>
              <input id='gender-m' checked={gioi_tinh === 0} value={0} type='radio' name='gioi_tinh_id' />
              <label htmlFor='gender-m' onClick={() => setgioi_tinh(0)}></label>
              <span>{AccountPageLanguage[language].male}</span>
            </div>
            <div className='group-label'>
              <input id='gender-f' checked={gioi_tinh === 1} value={1} type='radio' name='gioi_tinh_id' />
              <label htmlFor='gender-f' onClick={() => setgioi_tinh(1)}></label>
              <span>{AccountPageLanguage[language].female}</span>
            </div>
          </div>
        </div>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].date_of_birth}</span>
          <div className='input-password'>
            <input
              onChange={e => {
                var value = e.target.value;
                if (!isValidDate(value)) {
                  e.target.nextElementSibling.classList.add('show');
                  e.target.nextElementSibling.innerText = AccountPageLanguage[language].invalid_date;
                } else {
                  e.target.nextElementSibling.classList.remove('show');
                  e.target.nextElementSibling.innerText = '';
                }
              }}
              placeholder='DD/MM/YYYY'
              defaultValue={
                user && user.birth_day
                  ? `${new Date(user.birth_day).getDate()}/${new Date(user.birth_day).getMonth() + 1}/${new Date(
                      user.birth_day
                    ).getFullYear()}`
                  : ''
              }
              name='birth_day'
            />
            <span className='validate-error'></span>
          </div>
        </div>
        <div className='input-group'>
          <span>{AccountPageLanguage[language].address}</span>
          <input defaultValue={user && user.address ? user.address : ''} name='address' />
        </div>
        <div className='input-group'>
          <button type='submit'>{AccountPageLanguage[language].update}</button>
        </div>
      </form>
    </>
  );
}
