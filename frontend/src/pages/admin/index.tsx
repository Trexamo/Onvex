import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Painel Admin - Logzz</title>
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white dark:bg-gray-800 h-screen shadow-lg">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-purple-600">Logzz Admin</h1>
            </div>
            <nav className="mt-8">
              <Link href="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900">
                Dashboard
              </Link>
              <Link href="/admin/products" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900">
                Produtos
              </Link>
              <Link href="/admin/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900">
                Pedidos
              </Link>
              <Link href="/admin/affiliates" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900">
                Afiliados
              </Link>
            </nav>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm">Vendas Hoje</h3>
                <p className="text-3xl font-bold text-purple-600">R$ 1.234</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm">Pedidos</h3>
                <p className="text-3xl font-bold text-purple-600">42</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm">Afiliados</h3>
                <p className="text-3xl font-bold text-purple-600">156</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
