import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMotorcycle,
  faMapMarkerAlt,
  faMoneyBillWave,
  faCheckCircle,
  faTimesCircle,
  faSearch,
  faQrcode
} from '@fortawesome/free-solid-svg-icons';

// Mock de entregas
const entregasMock = [
  {
    id: 1,
    cliente: 'João Silva',
    endereco: 'Rua das Flores, 123 - Centro',
    valor: 129.90,
    formaPagamento: 'dinheiro',
    valorPagoCliente: 150,
    troco: 20.10,
    status: 'em_rota',
    distancia: '2.3 km',
    telefone: '(11) 99999-9999'
  },
  {
    id: 2,
    cliente: 'Maria Santos',
    endereco: 'Av. Paulista, 1000 - apto 45',
    valor: 89.50,
    formaPagamento: 'pix',
    status: 'em_rota',
    distancia: '3.1 km',
    telefone: '(11) 98888-8888'
  },
  {
    id: 3,
    cliente: 'Pedro Oliveira',
    endereco: 'Rua Augusta, 500 - casa 2',
    valor: 245.00,
    formaPagamento: 'dinheiro',
    valorPagoCliente: 250,
    troco: 5.00,
    status: 'entregue',
    distancia: '1.5 km',
    telefone: '(11) 97777-7777'
  },
];

export default function AppEntregador() {
  const [entregas, setEntregas] = useState(entregasMock);
  const [entregaSelecionada, setEntregaSelecionada] = useState<any>(null);
  const [qrScanner, setQrScanner] = useState(false);

  const calcularTroco = (valorPedido: number, valorPago: number): number => {
    return valorPago - valorPedido;
  };

  const marcarComoEntregue = (entregaId: number) => {
    setEntregas(entregas.map(e => 
      e.id === entregaId ? {...e, status: 'entregue'} : e
    ));
    setEntregaSelecionada(null);
  };

  const entregasAtivas = entregas.filter(e => e.status === 'em_rota');
  const entregasEntregues = entregas.filter(e => e.status === 'entregue');

  return (
    <>
      <Head>
        <title>App Entregador - Onvex</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header do Entregador */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faMotorcycle} className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Olá, José!</h1>
                <p className="text-purple-100 text-sm">Entregador · Ativo</p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              {entregasAtivas.length} entregas ativas
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs opacity-80">Entregas hoje</p>
              <p className="text-2xl font-bold">{entregas.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs opacity-80">Ganhos hoje</p>
              <p className="text-2xl font-bold">R$ 98,50</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-xs opacity-80">Distância</p>
              <p className="text-2xl font-bold">6.9km</p>
            </div>
          </div>
        </div>

        {/* Scanner QR Code (se ativado) */}
        {qrScanner && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Escanear QR Code</h3>
                <button onClick={() => setQrScanner(false)}>✕</button>
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faQrcode} className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Escaneie o QR Code do pedido para confirmar a entrega
              </p>
            </div>
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="p-6 max-w-md mx-auto">
          {/* Busca */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar entregas..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-4 text-gray-400 w-4 h-4"
            />
          </div>

          {/* Entregas Ativas */}
          <h2 className="font-bold text-gray-900 mb-3">Entregas Ativas</h2>
          <div className="space-y-4 mb-6">
            {entregasAtivas.map((entrega) => (
              <div
                key={entrega.id}
                onClick={() => setEntregaSelecionada(entrega)}
                className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{entrega.cliente}</h3>
                    <p className="text-sm text-gray-500">{entrega.endereco}</p>
                  </div>
                  <span className="text-sm font-medium text-purple-600">
                    {entrega.distancia}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Valor</p>
                    <p className="font-bold text-purple-600">R$ {entrega.valor.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Pagamento</p>
                    <p className="font-medium">{entrega.formaPagamento}</p>
                  </div>
                  {entrega.formaPagamento === 'dinheiro' && entrega.troco > 0 && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                      Troco: R$ {entrega.troco.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Entregas Entregues */}
          <h2 className="font-bold text-gray-900 mb-3">Entregues Hoje</h2>
          <div className="space-y-3">
            {entregasEntregues.map((entrega) => (
              <div
                key={entrega.id}
                className="bg-white/80 rounded-xl p-4 opacity-75"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{entrega.cliente}</h3>
                    <p className="text-sm text-gray-500">R$ {entrega.valor.toFixed(2)}</p>
                  </div>
                  <span className="text-green-600 text-sm font-medium">✓ Entregue</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Detalhes da Entrega */}
        {entregaSelecionada && (
          <div className="fixed inset-0 bg-black/50 flex items-end z-50">
            <div className="bg-white rounded-t-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">Detalhes da Entrega</h2>
                <button onClick={() => setEntregaSelecionada(null)}>✕</button>
              </div>

              <div className="space-y-6">
                {/* Cliente */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{entregaSelecionada.cliente}</h3>
                    <p className="text-gray-600">{entregaSelecionada.endereco}</p>
                    <p className="text-sm text-purple-600 mt-1">{entregaSelecionada.telefone}</p>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-3">Informações de Pagamento</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor do pedido:</span>
                      <span className="font-bold">R$ {entregaSelecionada.valor.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Forma de pagamento:</span>
                      <span className="font-medium">{entregaSelecionada.formaPagamento}</span>
                    </div>
                    
                    {entregaSelecionada.formaPagamento === 'dinheiro' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cliente vai pagar:</span>
                          <span className="font-medium">
                            R$ {entregaSelecionada.valorPagoCliente?.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium">TROCO:</span>
                          <span className="text-2xl font-bold text-green-600">
                            R$ {entregaSelecionada.troco?.toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setQrScanner(true)}
                    className="flex-1 bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 font-bold"
                  >
                    Escanear QR Code
                  </button>
                  <button
                    onClick={() => marcarComoEntregue(entregaSelecionada.id)}
                    className="flex-1 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 font-bold"
                  >
                    Confirmar Entrega
                  </button>
                </div>

                <button className="w-full border-2 border-red-500 text-red-500 py-4 rounded-xl font-bold hover:bg-red-50">
                  Reportar Problema
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
