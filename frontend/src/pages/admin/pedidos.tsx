import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faEye,
  faCheck,
  faTimes,
  faTruck,
  faBox,
  faUndo,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

// Mock de pedidos
const pedidosMock = [
  {
    id: 'PED-001',
    cliente: 'João Silva',
    produto: 'GEL VOLUMETRÃO',
    afiliado: 'Maria Santos',
    valor: 129.90,
    comissao: 19.49,
    status: 'pendente',
    data: '2026-03-17'
  },
  {
    id: 'PED-002',
    cliente: 'Ana Costa',
    produto: 'JOELHEIRA ORTOPÉDICA',
    afiliado: 'Carlos Oliveira',
    valor: 89.50,
    comissao: 13.43,
    status: 'confirmado',
    data: '2026-03-17'
  },
  {
    id: 'PED-003',
    cliente: 'Pedro Santos',
    produto: 'CLAREADOR DE MANCHAS',
    afiliado: 'Juliana Lima',
    valor: 67.80,
    comissao: 10.17,
    status: 'em_separacao',
    data: '2026-03-16'
  },
  {
    id: 'PED-004',
    cliente: 'Mariana Souza',
    produto: 'KIT FACAS PREMIUM',
    afiliado: 'Roberto Alves',
    valor: 159.90,
    comissao: 23.99,
    status: 'enviado',
    data: '2026-03-16'
  },
  {
    id: 'PED-005',
    cliente: 'Lucas Ferreira',
    produto: 'BIOVEIN 2.0',
    afiliado: 'Fernanda Costa',
    valor: 97.00,
    comissao: 14.55,
    status: 'entregue',
    data: '2026-03-15'
  },
  {
    id: 'PED-006',
    cliente: 'Carla Mendes',
    produto: 'PRIMEIRA VENDA EM 24H',
    afiliado: 'Ricardo Santos',
    valor: 147.00,
    comissao: 29.40,
    status: 'cancelado',
    data: '2026-03-14'
  }
];

const statusOptions = [
  { value: 'pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'confirmado', label: 'Confirmado', color: 'bg-blue-100 text-blue-700' },
  { value: 'em_separacao', label: 'Em separação', color: 'bg-purple-100 text-purple-700' },
  { value: 'enviado', label: 'Enviado', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'em_rota', label: 'Em rota', color: 'bg-orange-100 text-orange-700' },
  { value: 'entregue', label: 'Entregue', color: 'bg-green-100 text-green-700' },
  { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-700' },
  { value: 'nao_atendido', label: 'Não atendido', color: 'bg-gray-100 text-gray-700' },
  { value: 'devolvido', label: 'Devolvido', color: 'bg-rose-100 text-rose-700' }
];

const getStatusBadge = (status) => {
  const option = statusOptions.find(opt => opt.value === status) || statusOptions[0];
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${option.color}`}>{option.label}</span>;
};

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState(pedidosMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedPedido, setSelectedPedido] = useState(null);

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.produto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || pedido.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (pedidoId, newStatus) => {
    setPedidos(prev => prev.map(p => 
      p.id === pedidoId ? { ...p, status: newStatus } : p
    ));
    setSelectedPedido(null);
  };

  return (
    <>
      <Head>
        <title>Admin - Pedidos | ONVEX</title>
      </Head>

      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Pedidos</h1>
          <p className="text-sm text-gray-500">Acompanhe e gerencie todos os pedidos da plataforma</p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="todos">Todos os status</option>
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar por ID, cliente ou produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            </div>

            <div className="text-sm text-gray-500">
              Total: {filteredPedidos.length} pedidos
            </div>
          </div>
        </div>

        {/* Tabela de Pedidos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Afiliado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comissão</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 font-medium">{pedido.id}</td>
                    <td className="px-6 py-4">{pedido.cliente}</td>
                    <td className="px-6 py-4">{pedido.produto}</td>
                    <td className="px-6 py-4">{pedido.afiliado}</td>
                    <td className="px-6 py-4">R$ {pedido.valor.toFixed(2)}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">R$ {pedido.comissao.toFixed(2)}</td>
                    <td className="px-6 py-4">{getStatusBadge(pedido.status)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedPedido(pedido)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Detalhes */}
        {selectedPedido && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pedido {selectedPedido.id}
                  </h2>
                  <button
                    onClick={() => setSelectedPedido(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Informações do Pedido */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Cliente</p>
                      <p className="font-medium">{selectedPedido.cliente}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Produto</p>
                      <p className="font-medium">{selectedPedido.produto}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Afiliado</p>
                      <p className="font-medium">{selectedPedido.afiliado}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Data</p>
                      <p className="font-medium">{new Date(selectedPedido.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  {/* Valores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-xs text-purple-600">Valor total</p>
                      <p className="text-2xl font-bold text-purple-600">R$ {selectedPedido.valor.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-xs text-green-600">Comissão gerada</p>
                      <p className="text-2xl font-bold text-green-600">R$ {selectedPedido.comissao.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Status Atual */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Status atual</p>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(selectedPedido.status)}
                    </div>
                  </div>

                  {/* Ações de Status */}
                  <div>
                    <p className="text-sm font-medium mb-2">Alterar status</p>
                    <div className="grid grid-cols-3 gap-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => updateStatus(selectedPedido.id, status.value)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            selectedPedido.status === status.value
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ações Especiais */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                      <span>Cancelar pedido</span>
                    </button>
                    <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faUndo} className="w-4 h-4" />
                      <span>Reprocessar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
