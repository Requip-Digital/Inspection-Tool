import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import logo from '../assets/Requip.svg';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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
      <button 
      // to have menu uncomment the icon and add p-1 in class
        className="w-[32px] h-[32px] rounded-full hover:bg-blue-600 transition-colors"
        aria-label="Menu"
      >
        {/* <Menu size={24} /> */}
      </button>
    </header>
  );
};

export default Header;
