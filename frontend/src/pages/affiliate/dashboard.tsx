import React, { useState } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AffiliateDashboard() {
  const [dateRange, setDateRange] = useState({
    start: '2026-03-05',
    end: '2026-03-12'
  });

  // Dados mockados
  const stats = {
    revenue: 0,
    commissions: 0,
    sales: 0,
    previousRevenue: 0,
    previousCommissions: 0,
    previousSales: 0
  };

  const deliveries = {
    today: { count: 0, total: 0 },
    future: { count: 0, total: 0 }
  };

  const logistics = {
    efficiency: 0,
    completed: { count: 0, percentage: 0 },
    frustrated: { count: 0, percentage: 0 },
    cancelled: { count: 0, percentage: 0 },
    reschedule: { count: 0, percentage: 0 }
  };

  const rescheduleConversion = {
    rate: 0,
    toReschedule: { count: 0, percentage: 0 },
    recovered: { count: 0, percentage: 0 },
    cancelled: { count: 0, percentage: 0 }
  };

  const topProducts = [];
  const topAffiliates = [];
  const salesByRegion = [];

  const filters = [
    { label: 'Data de início', value: format(new Date(dateRange.start), "dd/MM/yyyy") },
    { label: 'Data de fim', value: format(new Date(dateRange.end), "dd/MM/yyyy") },
    { label: 'Base da data', value: 'Agendamento' },
    { label: 'Tipo de venda', value: 'Vendas gerais' },
  ];

  return (
    <>
      <Head>
        <title>Dashboard - Logzz Afiliado</title>
      </Head>

      <DashboardLayout>
        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Filtros ativos:
          </h2>
          <div className="flex flex-wrap gap-4">
            {filters.map((filter, index) => (
              <div key={index} className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">{filter.label}:</span>
                <span className="ml-2 font-semibold text-purple-600 dark:text-purple-400">{filter.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2">
            <span>🔍</span>
            <span>Filtros</span>
          </button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Faturamento</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              R$ {stats.revenue.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Similar ao mês anterior.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Comissões</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              R$ {stats.commissions.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Similar ao mês anterior.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Vendas</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.sales}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Similar ao mês anterior.
            </p>
          </div>
        </div>

        {/* Seção de Desempenho */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Desempenho do período
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Filtre por dado e período desejado.
            </p>
          </div>

          <div className="flex space-x-4 mb-6">
            {['Tudo', 'Faturamento', 'Comissão'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 border-b-2 border-transparent hover:border-purple-600 transition-colors"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Placeholder para gráfico */}
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Gráfico de desempenho</p>
          </div>
        </div>

        {/* Grid de 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Entregas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Entregas de hoje</h3>
            <div className="flex items-end space-x-2 mb-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{deliveries.today.count}</p>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Total de: R$ {deliveries.today.total.toFixed(2)}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Entregas futuras</h3>
            <div className="flex items-end space-x-2">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{deliveries.future.count}</p>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Total de: R$ {deliveries.future.total.toFixed(2)}</p>
            </div>
          </div>

          {/* Eficiência Logística */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Eficiência logística</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{logistics.efficiency}%</p>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Ruim</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Completas:</span>
                  <span className="font-medium">{logistics.completed.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${logistics.completed.percentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Frustradas:</span>
                  <span className="font-medium">{logistics.frustrated.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${logistics.frustrated.percentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Canceladas:</span>
                  <span className="font-medium">{logistics.cancelled.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${logistics.cancelled.percentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">À reagendar:</span>
                  <span className="font-medium">{logistics.reschedule.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${logistics.reschedule.percentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda linha do grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Conversão de reagendamentos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversão reagendamentos</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{rescheduleConversion.rate}%</p>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Ruim</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">À reagendar:</span>
                  <span className="font-medium">{rescheduleConversion.toReschedule.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${rescheduleConversion.toReschedule.percentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Recuperadas:</span>
                  <span className="font-medium">{rescheduleConversion.recovered.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${rescheduleConversion.recovered.percentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Canceladas:</span>
                  <span className="font-medium">{rescheduleConversion.cancelled.count} Vendas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${rescheduleConversion.cancelled.percentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Produtos mais vendidos */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Produtos mais vendidos</h3>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Exportar</button>
            </div>
            
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhum produto encontrado</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Não há produtos para exibir no período selecionado.
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-gray-400 hover:text-gray-600">&lt;</button>
              <span className="text-sm text-gray-600 dark:text-gray-400">Página 1 / 1</span>
              <button className="text-gray-400 hover:text-gray-600">&gt;</button>
            </div>
          </div>
        </div>

        {/* Terceira linha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Melhores afiliados */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Melhores afiliados</h3>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Exportar</button>
            </div>
            
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhum afiliado encontrado</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Não há afiliados para exibir no período selecionado.
              </p>
            </div>
          </div>

          {/* Vendas por região */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vendas por unidade</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Ranking das regiões com melhor desempenho.
            </p>
            
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhum dado disponível</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Não há dados de vendas por região para exibir no momento.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
