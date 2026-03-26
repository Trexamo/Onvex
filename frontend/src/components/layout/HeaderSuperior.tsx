import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faClock,
  faUser,
  faChevronDown,
  faGear,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

export const HeaderSuperior: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Dados do usuário
  const user = {
    name: 'Administração ONVEX'',
    email: 'teste@gmail.com',
    avatar: null, // Seria a imagem do avatar
    level: 'Afiliado Premium'
  };

  // Notificações mock
  const notifications = [
    { id: 1, text: 'Nova venda: R$ 129,90', time: 'há 5 min', read: false },
    { id: 2, text: 'Comissão creditada: R$ 45,00', time: 'há 2h', read: false },
    { id: 3, text: 'Produto aprovado: Biovein 2.0', time: 'há 1 dia', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-40" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-between px-6 h-20">
        {/* Lado Esquerdo - Logo ONVEX GRANDE */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative" style={{ width: '180px', height: '70px' }}>
              <Image
                src="/images/onvex2.png"
                alt="ONVEX"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Breadcrumb / Navegação Rápida */}
          <nav className="hidden md:flex items-center space-x-1 ml-6">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg">
              Dashboard
            </Link>
            <Link href="/vitrine" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              Vitrine
            </Link>
            <Link href="/produtos" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              Produtos
            </Link>
          </nav>
        </div>

        {/* Lado Direito - Ações e Perfil */}
        <div className="flex items-center space-x-4">
          {/* Últimas Atualizações */}
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faClock} className="w-5 h-5" />
          </button>

          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Painel de Notificações */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notif.read ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}>
                      <p className="text-sm text-gray-900 dark:text-white">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-purple-600 hover:text-purple-700">Ver todas</button>
                </div>
              </div>
            )}
          </div>

          {/* Perfil do Usuário */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold shadow-md">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              </div>
              
              {/* Informações do Usuário */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              
              <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-gray-500" />
            </button>

            {/* Menu do Usuário */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <p className="text-xs text-purple-600 mt-1">{user.level}</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2">
                    <FontAwesomeIcon icon={faGear} className="w-4 h-4" />
                    <span>Configurações</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center space-x-2">
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
