import React, { useState } from 'react';
import * as BiIcon from 'react-icons/bi';
import { rippleEffect } from '../../helpers';
import '../../assets/css/menu-box.css';

const menuItem = (
  <div className='menuBox__menuItem'>
    <BiIcon.BiEditAlt className='icon' />
    Menu Item
  </div>
);

const MenuBox = props => {
  const { children = menuItem } = props;

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='menuBox' onClick={() => setShowMenu(x => !x)}>
      <div className='rippleBox' onClick={rippleEffect}></div>

      <BiIcon.BiDotsVerticalRounded className='menuBox__icon' />

      <div className={`menuBox__menuList ${showMenu ? 'show' : ''}`}>{children}</div>
    </div>
  );
};

export default MenuBox;
