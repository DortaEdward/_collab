import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import './styles.scss';
import Navbar from "../../Components/Navbar";
import CreateBoard from "../../Components/CreateBoard";
import BoardCard from "../../Components/BoardCard";

function Dashboard() {
  const { getUserBoards } = useStoreActions(actions => actions.user);
  const { boards, user } = useStoreState(state => state.user);
  useEffect(() => {
    getUserBoards();
  }, []);

  return (
    <>
      <div className='boards-container'>
        { boards && boards.map((board) => {
          return(
            <BoardCard board={board} user={user} key={board._id}/>
          )
          })
        }
        <CreateBoard />
    </div>
    </>
  );
}

export default Dashboard;
