import React from 'react';
import '../../assets/css/card.css';

import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useNumber from '../../hooks/useNumber';
import avatar0 from '../../assets/images/header/avatar0.png';
import rank1 from '../../assets/images/card/rank1.svg';
import rank2 from '../../assets/images/card/rank2.svg';
import rank3 from '../../assets/images/card/rank3.svg';

const rank = [rank1, rank2, rank3];

const Card = props => {
    const [{ language, card }] = useLanguageLayerValue();
    const {
        index = 0,
        type = 'donate',
        numb = 0,
        name = 'User',
        avatar = avatar0,
        onClick,
    } = props;

    return (
        <div onClick={onClick} className={`card ${index === 0 ? 'mt-20' : ''}`}>
            <div className='card__avatar'>
                <img src={avatar} alt='' />
            </div>
            <div className='card__info'>
                <p className='card__info-name'>{name}</p>
                <p className='card__info-numb'>
                    {useNumber(numb)} {card[language][type]}
                </p>
            </div>
            <img className='card__icon' src={rank[index]} alt='' />
        </div>
    );
};

export default Card;