import React from 'react'
import './advertisment.scss'
import {Link} from 'react-router-dom'

const Advertisment = () => {
  return (
        <div className='advertisment'>
            <div className='advertisment__left'>
                <div className='advertisment__logo'>
                    <img src="/img/advertLogo.png" alt="AddLogo" />
                </div>
                <p className='advertisment__title'><span>Stan Smith</span>,<br/>Forever!</p>
                <Link to='https://www.adidas.com/us'>
                    <button className='advertisment__button'>Купить</button>
                </Link>    
            </div>
            <div className='advertisment__right'>
                <img src="/img/advertimg.png" alt="AdvertImage" />
            </div>
        </div>
  )
}

export default Advertisment;