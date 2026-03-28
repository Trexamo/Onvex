import React, { useState } from 'react';
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
    <header className="border-b sticky top-0 z-40" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-end px-6 h-16">
        <div className="flex items-center space-x-4">
          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 dropdown z-50">
                <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <h3 className="font-semibold">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b cursor-pointer transition-colors ${!notif.read ? 'bg-purple-500/10' : ''}`}
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <p className="text-sm">{notif.text}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <button className="text-sm text-purple-500">Ver todas</button>
                </div>
              </div>
            )}
          </div>

          {/* Perfil */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--hover-bg)' }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.name || 'Usuário'}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{user?.email || 'carregando...'}</p>
              </div>
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 dropdown z-50">
                <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm font-semibold">{user?.name || 'Usuário'}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{user?.email || ''}</p>
                  <p className="text-xs text-purple-500 mt-1">Afiliado</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                    <FontAwesomeIcon icon={faGear} className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  <div className="border-t my-2" style={{ borderColor: 'var(--border-color)' }}></div>
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
