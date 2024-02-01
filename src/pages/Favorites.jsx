import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import Card from '../components/card/Card.jsx'
import GreenButton from '../components/checkoutBtn/GreenButton.jsx'
import {AppContext} from '../App'
import './favorites.scss'

export default function Favorites({onAddToFavorite}) {

    const {favorites} = useContext(AppContext)

    return (
        <>
        {favorites.length > 0 ? <div className='favorites'>
            <div className='favorites__header'>
                <Link to='/'>
                    <button className='favorites__btn'>
                        <img src="img/favoriteExitArrow.png" alt="" />
                    </button>
                </Link> 
                <h1 className='favorites__title'>
                    Мои закладки
                </h1>
            </div>

            <div className='favorites__cards'>
                {
                    favorites
                        .map(item => <Card 
                            key={item.id}
                            {...item}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                        />) 
                }
            </div>
        </div> : 
            <div className='favorites-no-wrap'>
                <div className='favorites-no'>
                    <img width='80px' src='/img/noFavSmile.png' alt='Закладок нет'></img>
                    <h2 className='favorites-no__title'>Закладок нет</h2>
                    <p className='favorites-no__text opacity-6'>Вы ничего не добавляли в закладки</p>
                    <Link to='/'>
                        <GreenButton  name = 'left' url="img/leftArrow.svg">Вернуться назад</GreenButton>
                    </Link>   
                </div>
            </div>}
        </>
    )
}