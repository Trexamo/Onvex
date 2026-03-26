import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faComment,
  faDollarSign,
  faCheck,
  faPercent,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import ContactModal from './ContactModal';

const ChatCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    {
      icon: faComment,
      text: 'conversar em tempo real com um designer profissional para criar vídeos e imagens personalizadas'
    },
    {
      icon: faDollarSign,
      text: 'detalhes sobre pagamentos diretamente no chat'
    },
    {
      icon: faCheck,
      text: 'retenção com segurança garantida'
    },
    {
      icon: faPercent,
      text: '3,5% de taxa da plataforma'
    }
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#0a0a0f' }}>
        <div 
          className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 100%)',
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(147, 51, 234, 0.1)',
            border: '1px solid rgba(147, 51, 234, 0.2)'
          }}
        >
          {/* Efeito glassmorphism */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
          
          {/* Conteúdo */}
          <div className="relative p-8 z-10">
            {/* Header */}
            <div className="flex items-start space-x-6 mb-8">
              {/* Ícone de olho futurista */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center"
                     style={{ boxShadow: '0 0 20px #8b5cf6' }}>
                  <FontAwesomeIcon icon={faEye} className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-30"></div>
              </div>

              {/* Texto principal */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold leading-tight">
                  <span className="text-white">Crie seus criativos </span>
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    diretamente com um designer
                  </span>
                </h2>
              </div>
            </div>

            {/* Lista de benefícios */}
            <div className="space-y-5 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {/* Ícone com fundo */}
                  <div className="w-10 h-10 rounded-xl bg-purple-900/30 flex items-center justify-center flex-shrink-0"
                       style={{ boxShadow: '0 0 10px rgba(147, 51, 234, 0.3)' }}>
                    <FontAwesomeIcon icon={benefit.icon} className="w-5 h-5 text-purple-400" />
                  </div>

                  {/* Texto do benefício com palavras em roxo */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {benefit.text.split(' ').map((word, i, arr) => {
                      const purpleWords = ['designer profissional', 'vídeos', 'imagens', 'personalizadas', 'detalhes', 'chat', 'retenção', '3,5%', 'taxa'];
                      const shouldBePurple = purpleWords.some(pw => word.includes(pw));
                      return (
                        <span key={i} className={shouldBePurple ? 'text-purple-400 font-medium' : ''}>
                          {word}{i < arr.length - 1 ? ' ' : ''}
                        </span>
                      );
                    })}
                  </p>
                </div>
              ))}
            </div>

            {/* Texto pequeno */}
            <p className="text-center text-gray-400 text-sm mb-6">
              Após a aprovação do pedido, o valor é liberado automaticamente ao designer.
            </p>

            {/* Botão Iniciar Chat */}
            <div className="flex justify-center">
              {/* Botão visual (com overlay clicável) */}
              <div className="relative inline-block">
                <button
                  onClick={handleOpenModal}
                  className="relative px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full text-white font-semibold flex items-center space-x-3 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px #8b5cf6, 0 0 60px rgba(147, 51, 234, 0.3)',
                  }}
                >
                  <FontAwesomeIcon icon={faComment} className="w-5 h-5" />
                  <span>Iniciar Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Contato */}
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ChatCard;
