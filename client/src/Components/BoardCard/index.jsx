import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom';
function BoardCard({board, user}) {
  return (
    <Link to={`/board/${board._id}`} key={board._id} className='board-card'>
    <img src={board.backgroundImg} alt="Background" className="board-background-img" />
    <div className="board-info">
      <p className="board-name">{board.name}</p>
      {
        board.ownerId === user._id &&
          <p className='board-owner'>
            {user.displayName}
          </p>
      }
    </div>
  </Link>
  )
}

export default BoardCard;