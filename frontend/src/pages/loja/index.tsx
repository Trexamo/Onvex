import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faFilter, faUsers, faShoppingCart, faTruck, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { user } = useAuth();
  const [showAvisos, setShowAvisos] = useState(true);

  const avisos = [
    { id: 1, title: 'Novo produto disponível', message: 'Gel Volumetrão agora na vitrine!', read: false },
    { id: 2, title: 'Comissão creditada', message: 'R$ 45,00 foi creditado na sua conta', read: false }
  ];

  const filtrosAtivos = [
    { label: 'Data de início', value: '01/03/2026' },
    { label: 'Data de fim', value: '31/03/2026' },
    { label: 'Base da data', value: 'Agendamento' },
    { label: 'Tipo de venda', value: 'Vendas gerais' }
  ];

  return (
    <>
      <Head><title>Dashboard - ONVEX</title></Head>

      <div className="space-y-6">
        {/* Banner Superior */}
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">🎓 Tire dúvidas com mentores ao vivo!</h2>
            <p className="text-purple-200 mt-1">Participe das sessões e acelere seus resultados</p>
          </div>
          <Link href="/comunidade" className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Entrar na comunidade
          </Link>
        </div>

        {/* Aviso Importante */}
        {showAvisos && avisos.filter(a => !a.read).length > 0 && (
          <div className="rounded-xl p-4 flex justify-between items-center" style={{ backgroundColor: 'var(--warning)/20', border: '1px solid var(--warning)' }}>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" style={{ color: 'var(--warning)' }} />
              <div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>⚠️ {avisos.filter(a => !a.read).length} avisos importantes não lidos</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Verifique suas notificações</p>
              </div>
            </div>
            <button onClick={() => setShowAvisos(false)} className="hover:opacity-70" style={{ color: 'var(--text-tertiary)' }}>✕</button>
          </div>
        )}

        {/* Filtros Ativos */}
        <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Filtros ativos</h3>
            <button className="px-4 py-1 rounded-lg text-sm flex items-center space-x-2" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
              <FontAwesomeIcon icon={faFilter} className="w-3 h-3" />
              <span>Filtros</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtrosAtivos.map((filtro, index) => (
              <span key={index} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)' }}>
                {filtro.label}: {filtro.value}
              </span>
            ))}
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Faturamento</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>R$ 0,00</p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>Similar ao mês anterior</p>
          </div>
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Comissões</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>R$ 0,00</p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>Similar ao mês anterior</p>
          </div>
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Vendas</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>0</p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>Similar ao mês anterior</p>
          </div>
        </div>

        {/* Solicitações de Afiliação */}
        <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Solicitações de Afiliação</h3>
            <div className="flex space-x-2">
              <button className="text-sm" style={{ color: 'var(--primary)' }}>Solicitações enviadas</button>
              <button className="text-sm" style={{ color: 'var(--primary)' }}>Solicitações recebidas</button>
            </div>
          </div>
          <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>Nenhuma solicitação pendente</div>
        </div>

        {/* Grid inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Entregas de hoje</h3>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total de: R$ 0,00</p>
            <h3 className="font-semibold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>Entregas futuras</h3>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total de: R$ 0,00</p>
          </div>
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Eficiência logística</h3>
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>0%</p>
              <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}>Ruim</span>
            </div>
          </div>
        </div>

        {/* Produtos mais vendidos e Melhores afiliados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Produtos mais vendidos</h3>
              <button className="text-sm" style={{ color: 'var(--primary)' }}>Exportar</button>
            </div>
            <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>Nenhum produto encontrado</div>
          </div>
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Melhores afiliados</h3>
              <button className="text-sm" style={{ color: 'var(--primary)' }}>Exportar</button>
            </div>
            <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>Nenhum afiliado encontrado</div>
          </div>
        </div>
      </div>
    </>
  );
}
