import React, {useRef} from 'react'
import './styles.scss';

import { useStoreActions } from 'easy-peasy';

function CreateBoard() {
  const boardName = useRef(null);
  const boardBackground = useRef(null);
  const { createBoard } = useStoreActions(actions => actions.user);

  const createBoardSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: boardName.current.value,
      backgroundImg: boardBackground.current.value
    }
    createBoard(payload);
    boardName.current.value = null
  }

  return (
    <div className='create-card board-card'>
      <h2>Create a Board</h2>
      <form onSubmit={createBoardSubmit}>
        <input type="text" placeholder='Board Name' ref={boardName} required/>
        <input type="text" placeholder='Board Background' ref={boardBackground} />
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateBoard