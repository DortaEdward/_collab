import React from 'react'
import './styles.scss';

function ListCard({list}) {
  const cards = null
  return (
    <div className='list-card-container'>
      <h2>{list.name}</h2>
      <button>Add to List</button>
    </div>
  )
}

export default ListCard