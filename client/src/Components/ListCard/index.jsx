import React from 'react'
import './styles.scss';

function ListCard({list,cards}) {
  return (
    <div className='list-card-container'>
      <h2 className='list-name'>{list.name}</h2>
      <button>Add to List</button>
      {
        cards ? 
          cards.map(card => {
            return(
              <div key={card._id} className='card-container'>
                <div className='card-color'></div>
              <div className="card-details">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
              </div>
            )
          })
          : 
          <></>
      }
    </div>
  )
}

export default ListCard