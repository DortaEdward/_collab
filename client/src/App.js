import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import './App.scss';

function App() {
  const { user } = useStoreState(state => state.user);
  const { getUserData } = useStoreActions(actions => actions.user);
  useEffect(() => {
    if(localStorage.getItem('token')){
      getUserData();
    }
  }, []);
  return (
    <div className="App">
      <Navbar/>
      {
        user
          ? <Dashboard />
          : <Home />
      }
      <Footer />
    </div>
  );
}

export default App;
