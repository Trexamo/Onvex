import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload, faWhatsapp } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!isClient) {
    return null;
  }

  if (!user) {
    return null;
  }

  const stats = {
    revenue: 0,
    commissions: 0,
    sales: 0
  };

  const filters = [
    { label: 'Data de início', value: '01/03/2026' },
    { label: 'Data de fim', value: '31/03/2026' },
    { label: 'Base da data', value: 'Agendamento' },
    { label: 'Tipo de venda', value: 'Vendas gerais' },
  ];

  return (
    <>
      <Head><title>Dashboard - ONVEX</title></Head>

      <div className="space-y-6 animate-fade-up">
        {/* Banner */}
        <div className="card-premium overflow-hidden p-0">
          <img 
            src="/images/onvexbanner.png" 
            alt="Onvex Banner" 
            className="w-full h-auto object-cover"
            style={{ maxHeight: '280px', minHeight: '160px' }}
          />
        </div>

        {/* Alerta - laranja suave (não amarelo) */}
        <div className="alert-warning">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-white">⚠️ 2 avisos importantes não lidos</p>
                <p className="text-sm text-orange-300/70">Verifique suas notificações</p>
              </div>
            </div>
            <button className="text-orange-400 text-sm hover:text-orange-300 transition-colors">Ver todos</button>
          </div>
        </div>

        {/* Filtros Ativos */}
        <div className="card-premium p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">Filtros ativos</h3>
            <button className="btn-premium text-sm py-1.5 px-3">
              <FontAwesomeIcon icon={faFilter} className="w-3 h-3 mr-1" />
              Filtros
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <span key={index} className="bg-gray-800/30 px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-700/50">
                {filter.label}: {filter.value}
              </span>
            ))}
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-metric text-center">
            <p className="text-sm text-gray-400 mb-2">Faturamento</p>
            <p className="metric-value-success">R$ {stats.revenue.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">Similar ao mês anterior</p>
          </div>
          <div className="card-metric text-center">
            <p className="text-sm text-gray-400 mb-2">Comissões</p>
            <p className="metric-value-success">R$ {stats.commissions.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">Similar ao mês anterior</p>
          </div>
          <div className="card-metric text-center">
            <p className="text-sm text-gray-400 mb-2">Vendas</p>
            <p className="metric-value">{stats.sales}</p>
            <p className="text-xs text-gray-500 mt-2">Similar ao mês anterior</p>
          </div>
        </div>

        {/* Solicitações de Afiliação */}
        <div className="card-premium p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Solicitações de Afiliação</h3>
            <div className="flex space-x-3">
              <button className="text-sm text-purple-400 hover:text-purple-300">Enviadas</button>
              <button className="text-sm text-purple-400 hover:text-purple-300">Recebidas</button>
              <button className="text-sm text-gray-500">Ações</button>
            </div>
          </div>
          <div className="text-center py-8 text-gray-500">
            Nenhuma solicitação pendente
          </div>
        </div>

        {/* Desempenho do período */}
        <div className="card-premium p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Desempenho do período</h3>
            <div className="flex space-x-3">
              <button className="text-sm text-purple-400">Tudo</button>
              <button className="text-sm text-gray-500">Faturamento</button>
              <button className="text-sm text-gray-500">Comissão</button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-800/30 rounded-lg">
            📊 Gráfico de desempenho
          </div>
        </div>

        {/* Grid 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-premium p-6">
            <h3 className="font-semibold text-white mb-4">Entregas de hoje</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-gray-400 mt-1">Total de: R$ 0,00</p>
            <h3 className="font-semibold text-white mt-6 mb-2">Entregas futuras</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-gray-400 mt-1">Total de: R$ 0,00</p>
          </div>

          <div className="card-premium p-6">
            <h3 className="font-semibold text-white mb-4">Eficiência logística</h3>
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-5xl font-bold text-white">0%</p>
              <span className="badge-danger">Ruim</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Completas:</span>
                  <span className="font-medium text-white">0 Vendas (0%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Frustradas:</span>
                  <span className="font-medium text-white">0 Vendas (0%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Canceladas:</span>
                  <span className="font-medium text-white">0 Vendas (0%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-danger h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos mais vendidos */}
        <div className="card-premium p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Produtos mais vendidos</h3>
            <button className="text-sm text-purple-400 flex items-center gap-1 hover:text-purple-300">
              <FontAwesomeIcon icon={faDownload} className="w-3 h-3" />
              Exportar
            </button>
          </div>
          <div className="text-center py-12 text-gray-500">
            Nenhum produto encontrado
          </div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button className="text-gray-500 hover:text-white">&lt;</button>
            <span className="text-sm text-gray-500">Página 1 / 1</span>
            <button className="text-gray-500 hover:text-white">&gt;</button>
          </div>
        </div>

        {/* Melhores afiliados */}
        <div className="card-premium p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Melhores afiliados</h3>
            <button className="text-sm text-purple-400 flex items-center gap-1 hover:text-purple-300">
              <FontAwesomeIcon icon={faDownload} className="w-3 h-3" />
              Exportar
            </button>
          </div>
          <div className="text-center py-12 text-gray-500">
            Nenhum afiliado encontrado
          </div>
        </div>

        {/* WhatsApp Flutuante */}
        <a
          href="https://chat.whatsapp.com/HvPtMyH8ygd50sMO2SFNmg"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all z-50 hover:scale-110"
          style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)' }}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7 text-white" />
        </a>
      </div>
    </>
  );
}
