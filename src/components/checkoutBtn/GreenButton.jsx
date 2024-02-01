import React from 'react'

import './greenButton.scss'

export default function GreenButton({children, url, name, onClick, disabled}) {
  return (
    <button disabled = {disabled} onClick = {onClick} className='drawer__checkoutBtn button'src={url}>
      <img class={name} src={url} alt='Стрелка'/>{children}
    </button>
  )
}
