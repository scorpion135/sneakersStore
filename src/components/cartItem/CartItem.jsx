import {React} from 'react'

import './cartItem.scss'

export default function CartItem({id, name, url, price, onCloseCartItem, setIsCompleted}) {

    const priceFormatter = new Intl.NumberFormat()

    function handleCartItemClick() {
        onCloseCartItem({id, name, url, price})
    } 

    return (
        <div className='drawer__item item'>
            <div className='item__img'>
                <img src={url} alt="" />
            </div>   
            <div className='item__description'>
                <p className='item__text'>{name}</p>
                <div className='item__price'>
                    <p className='item__cost'>{priceFormatter.format(price)} руб.</p>
                    <button className='item__cancel removeBtn' onClick={handleCartItemClick}>
                        <img src="img/cancelBtn.svg" alt="" />
                    </button>
                </div>
            </div>  
        </div>
    )
    }
