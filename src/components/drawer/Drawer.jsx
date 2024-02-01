import {React, useState, useContext} from 'react'
import './drawer.scss'
import axios from 'axios'

import CartItem from './../cartItem/CartItem'
import GreenButton from './../checkoutBtn/GreenButton'
import Info from '../Info/Info.jsx'

import {AppContext} from '../../App'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function Drawer({onCancel, onClose, items=[], opened}) {

    const priceFormatter = new Intl.NumberFormat()

    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const {cartItems, setCartItems} = useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => sum += Number(obj.price), 0)

    async function onClickOrder() {
        try {
            setIsLoading(true)
            const {data} = await axios.post('http://localhost:3000/order', {
                products: cartItems
            })
            setOrderId(data.id)
            setIsOrderCompleted(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('http://localhost:3000/cart/' + item.id);
                await delay(1000)
            }

        } catch (error) {
            alert('Не удалось оформить заказ')
        }

        setIsLoading(false)
        
    }

    return (    
        <div className={`overlay ${opened ? 'overlayVisible' : ''}`}>
            <div className='drawer'>
                <h2 className='drawer__title'>Корзина {items.length > 0 ? <img className='removeBtn' src="img/cancelBtn.svg" alt="" onClick={onClose}/> : null}</h2>

                {
                    items.length > 0 ? 
                        <div className='drawer__section'> 
                            <div className='drawer__content'>
                                {items.map(obj => <CartItem 
                                    key={obj.id} 
                                    id={obj.id}
                                    name={obj.name} 
                                    url={obj.img} 
                                    price={obj.price}
                                    onCloseCartItem={(sneaker) => onCancel(sneaker)}
                                    setIsCompleted={setIsOrderCompleted}
                                    />)
                                }
                            </div>
                            <div>
                                <ul className='drawer__list'>
                                    <li className='drawer__result'>
                                        <span>Итого:</span>
                                        <div></div>
                                        <p>{priceFormatter.format(totalPrice)} руб.</p>
                                    </li>
                                    <li className='drawer__tax'>
                                        <span>Налог 5%</span>
                                        <div></div>
                                        <p>{(totalPrice * 0.05).toFixed(2)} руб.</p>
                                    </li>   
                                </ul>
                                <GreenButton disabled={isLoading} onClick={onClickOrder} name ='right' url="img/rightArrow.svg">Оформить заказ</GreenButton>
                            </div>

                        </div> :
                            <Info 
                                title={isOrderCompleted ? 'Заказ оформлен' : 'Корзина пуста' } 
                                description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ' }
                                image={isOrderCompleted ? '/img/completeForm.png' : '/img/emptyCart.png' } 
                                action='Вернуться назад'
                                isCompleted={isOrderCompleted}
                                setIsCompleted={setIsOrderCompleted}
                                width='120px'
                            /> 
                }
            </div>
        </div>
    )
}
