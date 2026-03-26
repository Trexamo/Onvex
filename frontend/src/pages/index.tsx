import React from 'react';
import Head from 'next/head';
import ProductCard from '../components/product/ProductCard';

const products = [
  {
    id: 1,
    name: 'GEL VOLUMETRÃO',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    rating: 5,
    commission: 'R$ 12.10M',
    commissionValue: 12100000,
    rank: 1,
    sold: 70763,
    category: 'Beleza',
  },
  {
    id: 2,
    name: 'JOELHEIRA ORTOPÉDICA',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
    rating: 5,
    commission: 'R$ 8.45M',
    commissionValue: 8450000,
    rank: 2,
    sold: 45231,
    category: 'Saúde',
  }
];

const sortedProducts = [...products].sort((a, b) => b.commissionValue - a.commissionValue);

export default function Home() {
  return (
    <>
      <Head>
        <title>ONVEX - Vitrine de Afiliação</title>
      </Head>

      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vitrine de Afiliação</h1>
          <p className="text-sm text-gray-500">Produtos ordenados por maior comissão</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              image={product.image}
              rating={product.rating}
              commission={product.commission}
              rank={product.rank}
              sold={product.sold}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </>
  );
}
