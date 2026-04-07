import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faUser,
  faChevronDown,
  faGear,
  faRightFromBracket,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const HeaderSuperior: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node) &&
          notificationButtonRef.current && !notificationButtonRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node) &&
          userButtonRef.current && !userButtonRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: 'Nova venda: R$ 129,90', time: 'há 5 min', read: false },
    { id: 2, text: 'Comissão creditada: R$ 45,00', time: 'há 2h', read: false },
    { id: 3, text: 'Produto aprovado', time: 'há 1 dia', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b sticky top-0 z-40" style={{ backgroundColor: '#0f172a', borderColor: 'rgba(139, 92, 246, 0.1)' }}>
      <div className="flex items-center justify-end px-6 h-16">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors hover:bg-gray-800/50"
            style={{ color: '#94a3b8' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <div className="relative">
            <button
              ref={notificationButtonRef}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg transition-colors hover:bg-gray-800/50"
              style={{ color: '#94a3b8' }}
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div ref={notificationRef} className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg z-50" style={{ backgroundColor: '#1e293b', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                <div className="p-4 border-b" style={{ borderColor: 'rgba(139, 92, 246, 0.1)' }}>
                  <h3 className="font-semibold text-white">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b cursor-pointer transition-colors ${!notif.read ? 'bg-purple-500/10' : ''}`}
                      style={{ borderColor: 'rgba(139, 92, 246, 0.1)' }}
                    >
                      <p className="text-sm text-white">{notif.text}</p>
                      <p className="text-xs mt-1 text-gray-400">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t" style={{ borderColor: 'rgba(139, 92, 246, 0.1)' }}>
                  <button className="text-sm text-purple-400">Ver todas</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              ref={userButtonRef}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors hover:bg-gray-800/50"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-white">{user?.name || 'Usuário'}</p>
                <p className="text-xs text-gray-400">{user?.email || 'carregando...'}</p>
              </div>
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-gray-400" />
            </button>

            {showUserMenu && (
              <div ref={userMenuRef} className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-50" style={{ backgroundColor: '#1e293b', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                <div className="p-3 border-b" style={{ borderColor: 'rgba(139, 92, 246, 0.1)' }}>
                  <p className="text-sm font-semibold text-white">{user?.name || 'Usuário'}</p>
                  <p className="text-xs text-gray-400">{user?.email || ''}</p>
                  <p className="text-xs text-purple-400 mt-1">Afiliado</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2 text-gray-300 hover:bg-gray-800">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2 text-gray-300 hover:bg-gray-800">
                    <FontAwesomeIcon icon={faGear} className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  <div className="border-t my-2" style={{ borderColor: 'rgba(139, 92, 246, 0.1)' }}></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2 text-red-500 hover:bg-red-500/10"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
