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
  faTruck,
  faBox,
  faWarehouse,
  faChevronLeft,
  faChevronDown,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  {
    icon: faStar,
    label: 'Perfil',
    path: '/dashboard/perfil',
  },
  {
    icon: faGift,
    label: 'Recrute e Ganhe',
    path: '/dashboard/recrute',
  },
  {
    icon: faStore,
    label: 'Loja',
    path: '/loja',
    subItems: [
      { label: 'Vitrine de afiliação', path: '/' },
      { label: 'Vitrine de fornecimento', path: '/loja/vitrine-fornecimento' },
    ],
  },
  {
    icon: faShoppingBag,
    label: 'Vendas',
    path: '/dashboard/vendas',
  },
  {
    icon: faTruck,
    label: 'Expedições',
    path: '/expedicoes',
    subItems: [
      { label: 'Dashboard', path: '/expedicoes/dashboard' },
      { label: 'Lista', path: '/expedicoes/lista' },
    ],
  },
  {
    icon: faBox,
    label: 'Produtos',
    path: '/produtos',
  },
  {
    icon: faWarehouse,
    label: 'Estoques e Operações',
    path: '/dashboard/estoques',
  },
];

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Loja']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <aside
      className="h-screen border-r flex-shrink-0 transition-all duration-300"
      style={{ 
        width: isCollapsed ? '80px' : '280px',
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* LOGO GRANDE NO TOPO */}
      <div className="h-28 flex items-center justify-center border-b" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/" className="flex items-center justify-center">
          {isCollapsed ? (
            <div className="w-12 h-12 relative">
              <Image
                src="/images/onvex1.png"
                alt="ONVEX"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="relative" style={{ width: '200px', height: '100px' }}>
              <Image
                src="/images/onvex2.png"
                alt="ONVEX"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </Link>
      </div>

      {/* Menu Items */}
      <div className="py-6 px-3 h-[calc(100vh-160px)] overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-1">
            <div
              onClick={() => {
                if (item.subItems) {
                  toggleExpand(item.label);
                } else {
                  router.push(item.path);
                }
              }}
              className={`flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all ${
                isActive(item.path) || (item.subItems && item.subItems.some(sub => isActive(sub.path)))
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.subItems && (
                    <FontAwesomeIcon
                      icon={expandedItems.includes(item.label) ? faChevronDown : faChevronRight}
                      className="w-3 h-3"
                    />
                  )}
                </>
              )}
            </div>

            {/* Subitems */}
            {!isCollapsed && item.subItems && expandedItems.includes(item.label) && (
              <div className="mt-1 ml-8 space-y-1">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.label}
                    onClick={() => router.push(subItem.path)}
                    className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                      isActive(subItem.path)
                        ? 'text-purple-600 font-medium bg-purple-50'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recolher Button */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-4 left-3 right-3 flex items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all border-t pt-3"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <FontAwesomeIcon icon={faChevronLeft} className={`w-4 h-4 text-gray-500 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        {!isCollapsed && <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Recolher</span>}
      </div>
    </aside>
  );
};
