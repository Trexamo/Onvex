import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGift,
  faStore,
  faShoppingBag,
  faBox,
  faWarehouse,
  faChevronLeft,
  faChevronDown,
  faChevronRight,
  faStar,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../contexts/ThemeContext';

const menuItems = [
  { icon: faStar, label: 'Perfil', path: '/dashboard/perfil' },
  { icon: faGift, label: 'Recrute e Ganhe', path: '/dashboard/recrute' },
  {
    icon: faStore, label: 'Loja', path: '/loja',
    subItems: [
      { label: 'Vitrine de afiliação', path: '/' },
      { label: 'Vitrine de fornecimento', path: '/loja/vitrine-fornecimento' },
    ],
  },
  { icon: faShoppingBag, label: 'Vendas', path: '/dashboard/vendas' },
  { icon: faBox, label: 'Produtos', path: '/produtos' },
  { icon: faWarehouse, label: 'Estoques e Operações', path: '/dashboard/estoques' },
];

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Loja']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="h-screen border-r flex-shrink-0 transition-all duration-300 flex flex-col" style={{ width: isCollapsed ? '80px' : '280px', backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      {/* Logo */}
      <div className="flex-shrink-0 h-28 flex items-center justify-center border-b" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/">
          {isCollapsed ? (
            <div className="w-12 h-12 relative"><Image src="/images/onvex1.png" alt="ONVEX" width={48} height={48} className="object-contain" /></div>
          ) : (
            <div className="relative" style={{ width: '200px', height: '100px' }}><Image src="/images/onvex2.png" alt="ONVEX" fill className="object-contain" priority /></div>
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-1">
            <div onClick={() => { if (item.subItems) toggleExpand(item.label); else router.push(item.path); }} className={`flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all ${isActive(item.path) || (item.subItems && item.subItems.some(sub => isActive(sub.path))) ? 'bg-purple-600 text-white' : 'sidebar-item'}`}>
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              {!isCollapsed && (<><span className="flex-1">{item.label}</span>{item.subItems && (<FontAwesomeIcon icon={expandedItems.includes(item.label) ? faChevronDown : faChevronRight} className="w-3 h-3" />)}</>)}
            </div>
            {!isCollapsed && item.subItems && expandedItems.includes(item.label) && (<div className="mt-1 ml-8 space-y-1">{item.subItems.map((subItem) => (<div key={subItem.label} onClick={() => router.push(subItem.path)} className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${isActive(subItem.path) ? 'text-purple-600 font-medium bg-purple-500/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{subItem.label}</div>))}</div>)}
          </div>
        ))}
      </div>

      {/* Botões do rodapé */}
      <div className="flex-shrink-0 border-t pt-3 pb-4 px-3 space-y-2" style={{ borderColor: 'var(--border-color)' }}>
        <div onClick={toggleTheme} className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all">
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          {!isCollapsed && <span className="ml-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Tema {theme === 'dark' ? 'claro' : 'escuro'}</span>}
        </div>
        <div onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all">
          <FontAwesomeIcon icon={faChevronLeft} className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} />
          {!isCollapsed && <span className="ml-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Recolher</span>}
        </div>
      </div>
    </aside>
  );
};
