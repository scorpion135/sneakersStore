import {React} from 'react'
import './content.scss'
import Card from '../components/card/Card'

export default function Content({onAddToCart, inToFav, items, searchValue, setSearchValue, isLoading}) {

    function onSearchValue(event) {
        setSearchValue(() => event.target.value)
    }

    const renderItems = () => {
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
            <Card 
                key={index}
                id={item && item.id}
                img={item && item.img}
                name={item && item.name}
                price={item && item.price}
                onFavorite={(obj) => inToFav(obj)}
                onCart={(obj) => onAddToCart(obj)}
                loading={isLoading}
            />)
        )
    }

    return (
        <div className='content'>
            <div className='content__header'>
                <h1 className='content__title'>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className='content__search'>
                    <img src="img/search.svg" alt="Поиск" />
                    <input className='content__input' type="text" placeholder='Поиск...' value={searchValue} onChange={onSearchValue}/>
                </div>
            </div>
            
            <div className='content__cards'>
                {renderItems()}
            </div> 
            
        </div>
    )
}
