import './App.css';
import Service from './pages/service/Service';
import Home from './pages/home/Home';
import Package from './pages/package/Package';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/service' element={<Service/>}/>
          <Route path='/package' element={<Package />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
