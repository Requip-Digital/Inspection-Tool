import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/Requip.svg';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        {isHome ? <div className='w-[32px]'></div> : (
          <button 
            className="p-1 rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        )}
      </div>
      <img src={logo} alt="REQUIP Logo" className="h-5" />
      <div className="flex items-center gap-2">
        {user && (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-100 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
