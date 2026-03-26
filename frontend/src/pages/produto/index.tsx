import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '../../components/layout/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck, faShare, faCopy } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: 1,
    name: 'BIOVEIN 2.0',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
    rating: 5,
    commission: 'R$ 2.69M',
    commissionPercent: 15,
    rank: 1,
    sold: 5843,
    tags: ['Produto Físico', 'Cobrança Única'],
    description: 'O Biovein 2.0 é o suplemento mais vendido do momento.',
    priceRange: 'R$ 97,00 - R$ 197,00',
    category: 'Saúde'
  }
];

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => p.id === Number(id));

  if (!product) return <div>Carregando...</div>;

  return (
    <>
      <Head><title>{product.name} - ONVEX</title></Head>
      <div className="w-full">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1>{product.name}</h1>
        </div>
      </div>
    </>
  );
}
