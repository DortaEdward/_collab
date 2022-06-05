import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Access from './Pages/Access';
import Dashboard from './Pages/Dashboard';

import './App.scss';

function App() {
  const { user } = useStoreState(state => state.user);
  const { getUserData } = useStoreActions(actions => actions.user);
  useEffect(() => {
    if(localStorage.getItem('token') && !user){
      getUserData();
    }
  }, []);

  return (
    <div className="App">
      {
        user
          ? <Dashboard />
          : <Access />
      }
    </div>
  );
}

export default App;
