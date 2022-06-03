import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store/store';

import Access from './Pages/Access';
import Dashboard from './Pages/Dashboard';
import BoardPage from './Pages/BoardPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider store={store}>
    <Router>
      <Routes>
        <Route path='/' exact element={<App />} />
        <Route path='/access' exact element={<Access />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/board/:id' element={<BoardPage />} />
      </Routes>
    </Router>
  </StoreProvider>
);
