import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Componente de card simples (definido no mesmo arquivo)
const ProdutoCard = ({ product }: any) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
          #{product.rank}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-purple-600 mb-2">{product.category}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.sold})</span>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase">Total em comissões</p>
          <p className="text-2xl font-bold text-green-600">{product.commission}</p>
        </div>
        
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Ver detalhes
        </button>
      </div>
    </div>
  );
};

// Dados dos produtos
const products = [
  {
    id: 1,
    name: 'GEL VOLUMETRÃO',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    rating: 5,
    commission: 'R$ 12.10M',
    rank: 1,
    sold: 70763,
    category: 'Beleza'
  },
  {
    id: 2,
    name: 'JOELHEIRA ORTOPÉDICA',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
    rating: 5,
    commission: 'R$ 8.45M',
    rank: 2,
    sold: 45231,
    category: 'Saúde'
  },
  {
    id: 3,
    name: 'CLAREADOR DE MANCHAS',
    image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=500',
    rating: 4,
    commission: 'R$ 6.32M',
    rank: 3,
    sold: 38987,
    category: 'Beleza'
  },
  {
    id: 4,
    name: 'KIT FACAS PREMIUM',
    image: 'https://images.pexels.com/photos/5825367/pexels-photo-5825367.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 5,
    commission: 'R$ 4.89M',
    rank: 4,
    sold: 23456,
    category: 'Casa'
  }
];

export default function ProdutosPage() {
  return (
    <>
      <Head>
        <title>Produtos - ONVEX</title>
      </Head>

      <div className="w-full p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Todos os Produtos
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {products.length} produtos disponíveis para afiliação
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProdutoCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
