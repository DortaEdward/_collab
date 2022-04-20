import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import Access from './Pages/Access';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/access' element={<Access />} />
    </Routes>
  </Router>
);
