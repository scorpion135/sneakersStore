import {React, useContext} from 'react'
import ContentLoader from 'react-content-loader'

import './card.scss'

import {AppContext} from '../../App'

export default function Card({id, name, img, price, onFavorite, onCart, loading=false}) {

    const {isItemAdded} = useContext(AppContext)
    const {isItemFavorited} = useContext(AppContext);

    const priceFormatter = new Intl.NumberFormat()

    function handleCartClick() {
        onCart({id, name, img, price})
    }

    function handleFavoriteClick() {    
        onFavorite({id, name, img, price})
    }

    return (
        <div className='content__card card'>
        
            {loading ? 
                <ContentLoader 
                    speed={2}
                    width={155}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="168" rx="8" ry="8" width="80" height="24" /> 
                    <rect x="0" y="138" rx="3" ry="3" width="93" height="15" /> 
                    <rect x="0" y="118" rx="3" ry="3" width="150" height="15" /> 
                    <rect x="0" y="12" rx="10" ry="10" width="150" height="91" /> 
                    <rect x="118" y="161" rx="8" ry="8" width="32" height="32" />
                </ContentLoader> : 
                <>
                    {onFavorite && <button className='card__favorite' onClick={handleFavoriteClick}>
                        {isItemFavorited(id) ? <img src='img/addToFav.svg'  alt="" /> : <img src='img/unfavorite.svg'  alt="" />}
                    </button>}
                    <div className='card__photo'>
                        <img className='card__img' src={img} alt="" /> 
                    </div>   
                    <p className='card__text'>{name}</p>
                    <div className='card__price'>
                        <div className='card__priceLeft'>
                            <p className='card__priceText'>Цена:</p>
                            <h2 className='card__priceSum'>{priceFormatter.format(price)} руб.</h2>
                        </div>
                        {onCart && <button className='card__btn' onClick={handleCartClick}>
                            {isItemAdded(id) ? <img src='img/addedToCart.svg'  alt="" /> : <img src='img/addBtn.svg'  alt="" />}
                        </button>}
                    </div>
                </>}
        </div>
    )
}
