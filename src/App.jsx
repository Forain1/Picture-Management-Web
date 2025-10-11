import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectRoute';

export default function App() {



  return (
    <div className="bg-zinc-900 text-white min-h-screen overflow-hidden">
        <UserProvider>
          <Navbar/>
          {/* 路由配置 */}
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
            </Routes>
          </div>
      </UserProvider>
    </div>

  );
}
