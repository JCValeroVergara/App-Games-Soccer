import React, { useState } from 'react';
import {MobileMenu} from '../icons';
import { useNavigate } from 'react-router-dom';
import icono from '../assets/icono.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between space-x-2">
        <img src={icono} alt="icono" className="w-10 h-10 rounded-full" />
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-semibold text-2xl tracking-tight">PROGRAMA TÚ FÚTBOL</span>
        </div>
        <div className="hidden md:block">
          <div className="flex space-x-4">
            <button
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              onClick={()=>navigate('/')}
            >
              Juegos
            </button>
            <button
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              onClick={()=>navigate('/fields')}
            >
              Campos
            </button>
            <button
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              onClick={()=>navigate('/teams')}
            >
              Equipos
            </button>
            <button
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              onClick={()=>navigate('/players')}
            >
              Jugadores
            </button>
          </div>
        </div>
        <div className="block md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="m-0 flex items-center px-3 py-2 border rounded text-gray-400 border-gray-600 hover:text-white hover:border-white"
          >
            <MobileMenu style={{ height: '1.5rem', width: '1.5rem'}} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <button
            className="block text-white text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              navigate('/')
              setIsMobileMenuOpen(false)
            }}
          >
            Juegos
          </button>
          <button
            className="block text-white text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              navigate('/fields');
              setIsMobileMenuOpen(false)
            }}
          >
            Campos
          </button>
          <button
            className="block text-white text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              navigate('/teams');
              setIsMobileMenuOpen(false)
            }}
          >
            Equipos
          </button>
          <button
            className="block text-white text-left px-4 py-2 hover:bg-gray-700"
            onClick={() =>{
              navigate('/players');
              setIsMobileMenuOpen(false)
            }}
          >
            Jugadores
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

