import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <div className="bg-zinc-900 text-white h-screen overflow-hidden">
      <Navbar />

      {/* 路由配置 */}
      <div className="pt-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </div>
    </div>

    
  );
}
