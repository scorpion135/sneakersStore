import {React, useContext} from 'react'

import {Link} from 'react-router-dom'

import './header.scss'

import {AppContext} from '../../App'

export default function Header(props) {

    const {cartItems} = useContext(AppContext)
    const priceSum = cartItems.reduce((sum, obj) => sum += Number(obj.price), 0)

    const priceFormatter = new Intl.NumberFormat()

    function clicked() {
        props.onOpenCart();
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <header className="header">
            <div className='headerLeft'>
                <div className='headerLogo'>
                    <Link to='/'>
                        <img className='headerLogo__img' src='img/logo.png' alt='logo'/>
                    </Link>   
                </div> 
                <div className='headerInfo'> 
                    <h3 className='headerInfo__title'>React sneakers</h3>
                    <p className='headerInfo__text'>Магазин лучших кроссовок</p>
                </div>
            </div>
            <nav className='headerRight'>
                <div className='headerRight__cart' onClick={clicked}>
                    <div><img className='cart__svg' src='img/cart.svg' alt='Корзина'/></div>
                    <p className='cart__sum'>{priceFormatter.format(priceSum)} руб.</p>
                </div>
                <div className='headerRight__favorite'>
                    <Link to='/favorites'>
                        <div className='headerRight__favorite'>
                            <div><img className='favorite__svg' src='img/favorite.svg' alt='Корзина'/></div>
                            <p className='favorite__text'>Закладки</p>
                        </div>
                    </Link>    
                </div>
                <div className='headerRight__profile'>
                    <Link to='/orders'>
                        <div className='headerRight__profile'>
                            <div><img className='profile__svg' src='img/Profile.svg' alt='Профиль'/></div>
                            <p className='profile__text'>Профиль</p>
                        </div>
                    </Link>
                </div>
            </nav>
        </header> 
    )
}
