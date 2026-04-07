import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function ProdutorDashboard() {
  const { user } = useAuth();
  const [modalidade, setModalidade] = useState<'produtor' | 'fornecedor' | null>(null);

  if (!modalidade) {
    return (
      <>
        <Head><title>Escolha sua modalidade - ONVEX</title></Head>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Bem-vindo, {user?.name || 'Produtor'}!</h1>
          <p className="text-gray-400 mb-12">Escolha como você quer atuar na plataforma</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-8 text-left">
              <h2 className="text-2xl font-bold mb-4">📦 Produtor</h2>
              <p className="text-gray-400 mb-6">
                Nesta modalidade, você deverá comercializar o produto direto aos clientes finais, 
                podendo ter afiliados e co-produtores.
              </p>
              <button
                onClick={() => setModalidade('produtor')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
              >
                Selecionar
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 text-left">
              <h2 className="text-2xl font-bold mb-4">🏭 Fornecedor</h2>
              <p className="text-gray-400 mb-6">
                Nesta modalidade, você poderá apenas fornecer o seu produto a outros produtores da ONVEX, 
                não podendo vendê-lo para clientes finais.
              </p>
              <button
                onClick={() => setModalidade('fornecedor')}
                className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
              >
                Selecionar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Painel do Produtor - ONVEX</title></Head>
      <div>
        <h1 className="text-2xl font-bold mb-6">Painel do Produtor</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/produtos/cadastrar" className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition">
            <h3 className="text-xl font-semibold mb-2">➕ Cadastrar Produto</h3>
            <p className="text-gray-400">Adicione novos produtos à plataforma</p>
          </Link>
          <Link href="/produtos" className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition">
            <h3 className="text-xl font-semibold mb-2">📋 Meus Produtos</h3>
            <p className="text-gray-400">Gerencie seus produtos cadastrados</p>
          </Link>
        </div>
      </div>
    </>
  );
}
