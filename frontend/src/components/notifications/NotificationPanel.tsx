import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface NotificationPanelProps {
  onClose: () => void;
}

const notifications = [
  {
    date: '12 Mar 2026',
    title: 'Nova venda realizada',
    description: 'Você tem uma nova venda no valor de R$ 299,90',
    tag: 'NEW',
  },
  {
    date: '11 Mar 2026',
    title: 'Comissão creditada',
    description: 'Sua comissão de R$ 45,90 foi creditada na conta',
    tag: 'FIX',
  },
  {
    date: '10 Mar 2026',
    title: 'Produto em falta',
    description: 'O produto "Progressiva Vegetal" está com estoque baixo',
    tag: 'NEW',
  },
  {
    date: '09 Mar 2026',
    title: 'Saque aprovado',
    description: 'Seu saque de R$ 1.500,00 foi aprovado',
    tag: 'FIX',
  },
];

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  return (
    <div className="absolute top-12 right-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-[#2fde91] p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">Últimas Atualizações</h3>
        <button onClick={onClose} className="text-white hover:text-white/80">
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">{notification.date}</span>
              <span className={notification.tag === 'NEW' ? 'badge-new' : 'badge-fix'}>
                {notification.tag}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
