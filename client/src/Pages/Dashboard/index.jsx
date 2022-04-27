import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import './styles.scss';

function Dashboard() {
  const { getUserBoards } = useStoreActions(actions => actions.user);
  const { boards, user } = useStoreState(state => state.user);
  useEffect(() => {
    getUserBoards();
    console.log(user);
  }, []);

  return (
    <div className='boards-container'>
      { boards && boards.map((board) => {
        return(
          <div key={board._id} className='board-card'>
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
          </div>
        )
        })
      }
    </div>
  );
}

export default Dashboard;
