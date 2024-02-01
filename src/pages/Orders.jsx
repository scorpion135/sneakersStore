import axios from 'axios'
import { useEffect } from 'react'
import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import Card from '../components/card/Card.jsx'
import GreenButton from './../components/checkoutBtn/GreenButton.jsx'
import './orders.scss'

export default function Orders() {

    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('http://localhost:3000/order')
                setOrders(data.map(obj => obj.products).flat())
                setIsLoading(false)
            } catch (err) {
                alert('Ошибка при загрузке покупок')
                console.error(err.message)
            }
        })()
    }, [])

    return (
        <>
            { orders.length > 0 ? 
                <div className='orders'>
                    <div className='orders__header'>
                        <Link to='/'>
                            <button className='orders__btn'>
                                <img src="img/favoriteExitArrow.png" alt="" />
                            </button>
                        </Link> 
                        <h1 className='orders__title'>
                            Мои покупки
                        </h1>
                    </div>

                    <div className='orders__cards'>
                        { 
                            (isLoading ? [...Array(8)] : orders)
                                .map((item, index) => <Card 
                                    key={index}
                                    id={item && item.id}
                                    img={item && item.img}
                                    name={item && item.name}
                                    price={item && item.price}
                                    loading={isLoading}
                                />) 
                        }
                    </div>
                </div> : 
                    <div className='orders-no-wrap'>
                        <div className='orders-no'>
                            <img width='80px' src='/img/noOrdersSmile.png' alt='Заказов нет'></img>
                            <h2 className='orders-no__title'>У вас нет заказов</h2>
                            <p className=' orders-no__text opacity-6'>Оформите хотя бы один заказ</p>
                            <Link to='/'>
                                <GreenButton  name = 'left' url="img/leftArrow.svg">Вернуться назад</GreenButton>
                            </Link>   
                        </div>
                    </div>}
        </>
    )
}
