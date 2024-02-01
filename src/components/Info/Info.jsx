import {React, useContext} from 'react'

import GreenButton from '../checkoutBtn/GreenButton.jsx'

import {AppContext} from '../../App'

const Info = ({title, image, description, action, isCompleted, setIsCompleted, width}) => {

    const {setCartOpened} = useContext(AppContext)

    function closed() {
        setCartOpened(false);
        setIsCompleted(false);
    }

    return (
        <div className={`${isCompleted ? 'drawerCompleted' : 'drawerEmpty'}`}>
            <img width= '120px'  src={image} alt='Пустая корзина'></img>
            <h2>{title}</h2>
            <p className='opacity-6'>{description}</p>
            <GreenButton onClick={closed} name = 'left' url="img/leftArrow.svg">{action}</GreenButton>
        </div>
    )
}

export default Info;