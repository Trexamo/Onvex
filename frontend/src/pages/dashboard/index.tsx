import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faDownload, faWhatsapp } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

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

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <>
      <Head><title>Dashboard - ONVEX</title></Head>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">🎓 Tire dúvidas com mentores ao vivo!</h2>
            <p className="text-purple-200 mt-1">Participe das sessões e acelere seus resultados</p>
          </div>
          <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 w-full sm:w-auto">
            Entrar na comunidade
          </button>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500 rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="font-semibold text-white">⚠️ 2 avisos importantes não lidos</p>
              <p className="text-sm text-gray-400">Verifique suas notificações</p>
            </div>
          </div>
          <button className="text-purple-400 text-sm">Ver todos</button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">Filtros ativos</h3>
            <button className="bg-purple-600 px-4 py-1 rounded-lg text-sm flex items-center space-x-2 text-white">
              <FontAwesomeIcon icon={faFilter} className="w-3 h-3" />
              <span>Filtros</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300">
                {filter.label}: {filter.value}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-sm text-gray-400">Faturamento</p>
            <p className="text-3xl font-bold text-green-500">R$ {stats.revenue.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">Similar ao mês anterior</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-sm text-gray-400">Comissões</p>
            <p className="text-3xl font-bold text-green-500">R$ {stats.commissions.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">Similar ao mês anterior</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-sm text-gray-400">Vendas</p>
            <p className="text-3xl font-bold text-green-500">{stats.sales}</p>
            <p className="text-xs text-gray-500 mt-2">Similar ao mês anterior</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Solicitações de Afiliação</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-purple-500">Solicitações enviadas</button>
              <button className="text-sm text-purple-500">Solicitações recebidas</button>
              <button className="text-sm text-gray-500">Ações em massa</button>
            </div>
          </div>
          <div className="text-center py-8 text-gray-500">Nenhuma solicitação pendente</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Desempenho do período</h3>
            <div className="flex space-x-3">
              <button className="text-sm text-purple-500">Tudo</button>
              <button className="text-sm text-gray-500">Faturamento</button>
              <button className="text-sm text-gray-500">Comissão</button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-800 rounded-lg">Gráfico de desempenho</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4">Entregas de hoje</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-gray-500">Total de: R$ 0,00</p>
            <h3 className="font-semibold text-white mt-4 mb-2">Entregas futuras</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-gray-500">Total de: R$ 0,00</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4">Eficiência logística</h3>
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-4xl font-bold text-white">0%</p>
              <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm">Ruim</span>
            </div>
            <div className="space-y-3">
              <div><div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Completas:</span><span className="font-medium text-white">0 Vendas</span></div><div className="w-full bg-gray-800 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div></div></div>
              <div><div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Frustradas:</span><span className="font-medium text-white">0 Vendas</span></div><div className="w-full bg-gray-800 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div></div></div>
              <div><div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Canceladas:</span><span className="font-medium text-white">0 Vendas</span></div><div className="w-full bg-gray-800 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div></div></div>
              <div><div className="flex justify-between text-sm mb-1"><span className="text-gray-400">À reagendar:</span><span className="font-medium text-white">0 Vendas</span></div><div className="w-full bg-gray-800 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div></div></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Produtos mais vendidos</h3>
              <button className="text-sm text-purple-500 flex items-center gap-1"><FontAwesomeIcon icon={faDownload} className="w-3 h-3" />Exportar</button>
            </div>
            <div className="text-center py-12 text-gray-500">Nenhum produto encontrado</div>
            <div className="flex justify-center items-center space-x-4 mt-4"><button className="text-gray-500">&lt;</button><span className="text-sm text-gray-500">Página 1 / 1</span><button className="text-gray-500">&gt;</button></div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Melhores afiliados</h3>
              <button className="text-sm text-purple-500 flex items-center gap-1"><FontAwesomeIcon icon={faDownload} className="w-3 h-3" />Exportar</button>
            </div>
            <div className="text-center py-12 text-gray-500">Nenhum afiliado encontrado</div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="font-semibold text-white mb-4">Vendas por unidade</h3>
          <p className="text-sm text-gray-500 mb-4">Ranking das regiões com melhor desempenho.</p>
          <div className="text-center py-12 text-gray-500 bg-gray-800 rounded-lg">Nenhum dado disponível</div>
        </div>

        <a href="https://chat.whatsapp.com/HvPtMyH8ygd50sMO2SFNmg" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all z-50">
          <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7 text-white" />
        </a>
      </div>
    </>
  );
}
