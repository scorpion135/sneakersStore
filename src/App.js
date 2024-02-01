import {React, useState, useEffect, createContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import axios from 'axios'

import Header from './components/header/Header.jsx'
import Content from './pages/Content.jsx'
import Drawer from './components/drawer/Drawer.jsx'
import Favorites from './pages/Favorites.jsx'
import Orders from './pages/Orders.jsx'
import Advertisment from './components/advertisment/Advertisment.jsx'

import './index.scss'
import './styles/reset.scss'

export const AppContext = createContext({})

function App() {

  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {

      try {
        axios.get('http://localhost:3000/products').then(res => {
        setItems(res.data)
        setIsLoading(false)
        })

        axios.get('http://localhost:3000/cart').then(res => {
          setCartItems(res.data)
        })
          
        axios.get('http://localhost:3000/fav').then(res => {
          setFavorites(res.data)
        })
      } catch(err) {
          alert('Ошибка загрузки данных')
          console.error(err)
      }
    }

    fetchData()
  }, [])

  function handleOpenCart() {
    setCartOpened(prev => !prev)
  }

  function handleCloseCart() {
    setCartOpened(prev => !prev)
  }

  async function onAddToCart(obj) {
    try {
      if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id))) 
        axios.delete(`http://localhost:3000/cart/${obj.id}`)
      } else {
        setCartItems([...cartItems, obj])
        await axios.post('http://localhost:3000/cart', obj)     
      }
    } catch(err) {
      alert('Не удалось добавить в корзину')
      console.error(err)
    }
  }

  async function onCancelCart(obj) {
    try {
      axios.delete(`http://localhost:3000/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } catch(err) {
      alert('Ошибка в удалении товара')
      console.error(err)
    }
  }

  async function onAddToFavorite(obj) {
    try {
      if(favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3000/fav/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))  
      } else {
        await axios.post('http://localhost:3000/fav', obj)
        setFavorites([...favorites, obj])
      }
    } catch(err) {
      alert('Не удалось добавить в избранное')
      console.error(err)
    }
  }

  function isItemAdded(id) {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  function isItemFavorited(id) {
    return favorites.some(obj => Number(obj.id) === Number(id))
  }


  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, isItemFavorited, setCartOpened, setCartItems}}>
      <div className="wrapper">
        <div className="container">

          <Drawer 
            items={cartItems} 
            onCancel={onCancelCart} 
            onClose={handleCloseCart}
            opened={cartOpened}
          />         
          <Header 
            onOpenCart={handleOpenCart}
          />

          <Routes>
            <Route 
              path='/' 
              element={
                <div>
                  <Advertisment/>
                  <Content  
                    onAddToCart={onAddToCart} 
                    inToFav={onAddToFavorite}
                    items={items}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    isLoading={isLoading}
                  />
                </div>
              } exact
            />
          </Routes>   

          <Routes>
            <Route 
              path='/favorites' 
              element={
                <Favorites 
                  onAddToFavorite={onAddToFavorite}/>
              } exact
            />
          </Routes>

          <Routes>
            <Route 
              path='/orders' 
              element={
                <Orders
                />
              } exact
            />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
