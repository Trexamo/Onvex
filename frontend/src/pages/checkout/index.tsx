import React from 'react';
import Head from 'next/head';

export default function AdminAffiliates() {
  const mockAffiliates = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', sales: 45, earnings: 1250.00, status: 'active' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', sales: 32, earnings: 890.50, status: 'active' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com', sales: 18, earnings: 450.75, status: 'inactive' },
  ];

  return (
    <>
      <Head>
        <title>Afiliados - Admin Logzz</title>
      </Head>

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Afiliados</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ganhos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{affiliate.name}</td>
                  <td className="px-6 py-4">{affiliate.email}</td>
                  <td className="px-6 py-4">{affiliate.sales}</td>
                  <td className="px-6 py-4">R$ {affiliate.earnings}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      affiliate.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {affiliate.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-purple-600 hover:text-purple-800">Ver detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
