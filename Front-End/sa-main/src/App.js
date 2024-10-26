
import './App.css';

import LoginSignup from './Components/LoginSignup/LoginSignup';
import Signup from './Components/LoginSignup/Signup';
import Home from './Components/Home/Home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Components/MainHome/HomePage';
import Profile from './Components/Profile/Profile';
import Editp from './Components/Editp/Editp';
import Adminlog from './Components/Adminlog/Adminlog';
import AdminHome from './Components/AdminHome/AdminHome';
import ManageAuctions from './Components/AdminHome/ManageAuctions';
import AddAuction from './Components/AdminHome/AddAuction';
import ViewUsers from './Components/AdminHome/ViewUsers';

function App() {
  return (
    <BrowserRouter>
    <div>

      <Routes>
        <Route path="/auction" element={<Home />}/>

        <Route path="/" element={<LoginSignup />} />

        <Route path="/sign" element={<Signup />}/>

        <Route path="/mainhome" element={<HomePage/>} />

        <Route path="/profile" element={<Profile/>} />

        <Route path="/editp" element={<Editp/>} />

        <Route path="/admin" element={<Adminlog/>} />

        <Route path="/adminHome" element={<AdminHome/>} />

        <Route path="/manage" element={<ManageAuctions/>} />

        <Route path="/addauc" element={<AddAuction/>} />

        <Route path="/viewU" element={<ViewUsers/>} />

      </Routes>

    </div>
  </BrowserRouter>
      
      
    
  );
}

export default App;
