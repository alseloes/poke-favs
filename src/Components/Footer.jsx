import React, { useContext } from 'react';
import { ContextGlobal } from './utils/global.context';


const Footer = () => {

  const { contextValue } = useContext(ContextGlobal);
  const { state } = contextValue;


  return (
    <footer className={state.theme} >
        <p>Powered by Dev Juan C.A. 2024</p>
        <img src='/images/logo.svg'           alt='POKEMON-logo'/>
        <img src='/images/ico-facebook.png'   alt='icon facebook'   className='icons'/>
        <img src='/images/ico-instagram.png'  alt='icon instagram'  className='icons'/>
        <img src='/images/ico-whatsapp.png'   alt='icon whatsapp'   className='icons'/>
        <img src='/images/ico-tiktok.png'     alt='icon tiktok'     className='icons'/>
    </footer>
  )
}

export default Footer
