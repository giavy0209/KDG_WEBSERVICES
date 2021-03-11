import React, { useEffect, useState } from 'react';
import '../../assets/css/language.css';

import useWindowSize from '../../hooks/useWindowSize';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import { CHANGE_LANGUAGE } from '../../context/reducer';
import arrowDown from '../../assets/images/language/arrow-down.svg';

import * as MdIcon from 'react-icons/md';

const Language = () => {
    const [{ language, listLanguage }, dispatch] = useLanguageLayerValue();
    const [width] = useWindowSize();
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const hidePopper = () => {
            setIsShow(false);
        };
        window.addEventListener('click', hidePopper);
        return () => window.removeEventListener('click', hidePopper);
    }, []);

    useEffect(() => {
        const hidePopper = e => {
            e.keyCode === 27 && setIsShow(false);
        };
        window.addEventListener('keyup', hidePopper);
        return () => window.removeEventListener('keyup', hidePopper);
    }, []);

    return (
        <div
            className='language'
            onClick={e => {
                e.stopPropagation();
                setIsShow(!isShow);
            }}
        >
            {width > 992 ? (
                <p className='language__selected'>{listLanguage[language]}</p>
            ) : (
                <MdIcon.MdLanguage className='language__languageIcon' />
            )}
            <img src={arrowDown} alt='' className={`language__arrowIcon ${isShow ? 'show' : ''}`} />
            {isShow && (
                <div className='language__list'>
                    {Object.keys(listLanguage).map(key => (
                        <div
                            key={key}
                            className='language__item'
                            onClick={() =>
                                key !== language &&
                                dispatch({ type: CHANGE_LANGUAGE, payload: key })
                            }
                        >
                            {listLanguage[key]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Language;
