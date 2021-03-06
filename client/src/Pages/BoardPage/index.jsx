import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useStoreState } from 'easy-peasy';
import axios from 'axios';

import ListCard from '../../Components/ListCard';
import CreateListCard from '../../Components/CreateListCard';
import './styles.scss';

function BoardPage() {
  let params = useParams();
  const { user } = useStoreState(state => state.user);
  const [board, setBoard] = useState(null);

  async function getBoard(){
    const boardBaseUrl = `${process.env.REACT_APP_API_URL}/board`;
    const boardApi = axios.create({
      baseURL: boardBaseUrl,
    });

    try {
      const config = { headers: {authorization : `Bearer ${localStorage.getItem('token')}`}};
      const res = await boardApi.get(`/${params.id}`, config);
      if(res.status === 200){
       setBoard(res.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBoard();
    console.log(board);
  }, []);
  

  return (
    <>
      <div className='board-container'>
        {
          board
            ?
              board.data.map(i => {
                return(
                    <ListCard list={i.list} key={i.listId} cards={i.cards} />
                )
              })
            : 
              <></>
        }
        <CreateListCard id={params.id} getBoard={getBoard} />
      </div>
    </>
  )
}

export default BoardPage