import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../contexts/ThemeContext';

// Dados mockados para exemplo
const mockProducts = [
  {
    id: 1,
    name: 'Smartphone XYZ Pro',
    description: 'Smartphone de última geração com câmera de 108MP',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
    commission: 10,
    stock: 15
  },
  {
    id: 2,
    name: 'Notebook Ultra Gamer',
    description: 'Notebook com RTX 4060, 32GB RAM, 1TB SSD',
    price: 8999.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
    commission: 8,
    stock: 5
  },
  {
    id: 3,
    name: 'Fone Bluetooth Pro',
    description: 'Fone com cancelamento de ruído e 40h de bateria',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    commission: 15,
    stock: 30
  },
  {
    id: 4,
    name: 'Smartwatch Series 5',
    description: 'Monitoramento cardíaco, GPS, resistente à água',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    commission: 12,
    stock: 8
  },
  {
    id: 5,
    name: 'Tablet Ultra Fino',
    description: 'Tela 11", 256GB, Caneta inclusa',
    price: 3299.99,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500',
    commission: 10,
    stock: 12
  },
  {
    id: 6,
    name: 'Câmera DSLR Pro',
    description: 'Câmera profissional com lente 18-55mm',
    price: 4599.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    commission: 8,
    stock: 3
  }
];

export default function ProductList() {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Produtos - Logzz Marketplace</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Logzz
                </span>
              </Link>

              <div className="flex items-center space-x-6">
                <Link href="/product/list" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium">
                  Produtos
                </Link>
                <Link href="/affiliate/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium">
                  Afiliados
                </Link>
                <Link href="/checkout" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium relative">
                  🛒 Carrinho
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <Link href="/auth/login" className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg">
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-5xl font-bold mb-4">Produtos Incríveis</h1>
            <p className="text-xl text-purple-100 mb-8">Os melhores produtos com as melhores comissões para afiliados</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-gray-900 text-lg shadow-xl focus:ring-4 focus:ring-purple-300 outline-none"
                />
                <button className="absolute right-2 top-2 bg-purple-600 text-white px-8 py-2 rounded-full hover:bg-purple-700 transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {['todos', 'Eletrônicos', 'Moda', 'Casa', 'Esportes', 'Beleza'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {product.commission}% comissão
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Preço</span>
                      <p className="text-3xl font-bold text-purple-600">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Estoque</span>
                      <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} un` : 'Esgotado'}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                      Comprar
                    </button>
                    <button className="p-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105">
                      🔗
                    </button>
                  </div>

                  <button className="w-full mt-3 text-green-600 hover:text-green-700 font-medium flex items-center justify-center space-x-2">
                    <span>📍</span>
                    <span>Ver cidades com delivery</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
