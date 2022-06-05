import React, { useRef } from 'react'
import axios from 'axios';
import './styles.scss';

function CreateListCard({id, getBoard}) {
  const listName = useRef(null);

  async function createList(e){
    e.preventDefault();
    const listBaseUrl = `${process.env.REACT_APP_API_URL}/list`;
    const listApi = axios.create({
      baseURL: listBaseUrl,
    });
    try {
      const config = { headers: {authorization : `Bearer ${localStorage.getItem('token')}`}};
      const payload = {name:listName.current.value};
      const res = await listApi.post(`/create/${id}`, payload, config);
      if(res.status === 200){
        getBoard();
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='board-card create-list-card'>
      <h2>Create a List</h2>
      <form onSubmit={e => createList(e)}>
        <input type="text" placeholder='Name' ref={listName} required/>
        <button className='create-list-btn btn'>Create List</button>
      </form>
    </div>
  )
}

export default CreateListCard;