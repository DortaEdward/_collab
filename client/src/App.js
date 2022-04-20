import './App.scss';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Footer from './Components/Footer';

function App() {
  const user = null;
  return (
    <div className="App">
      <Navbar user={user}/>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
