import React from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faSlidersH } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: 1,
    name: 'GEL VOLUMETRÃO',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    rating: 5,
    price: 21.90,
    rank: 1,
  },
  {
    id: 2,
    name: 'JOELHEIRA ORTOPÉDICA',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
    rating: 5,
    price: 17.90,
    rank: 2,
  },
  {
    id: 3,
    name: 'CLAREADOR DE MANCHAS',
    image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=500',
    rating: 4,
    price: 28.31,
    rank: 3,
  },
  {
    id: 4,
    name: 'KIT FACAS',
    image: 'https://images.pexels.com/photos/5825367/pexels-photo-5825367.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 5,
    price: 25.00,
    rank: 4,
  },
];

export default function VitrineFornecimento() {
  return (
    <>
      <Head>
        <title>Vitrine de Fornecimento - ONVEX</title>
      </Head>

      <div className="w-full">
        {/* Banner */}
        <div className="relative h-[250px] rounded-xl overflow-hidden mt-6 bg-gradient-to-r from-purple-900 to-purple-700">
          <div className="relative h-full flex items-center px-8">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center bg-black/50 px-4 py-2 rounded-full mb-4">
                <span>SÓ NA ONVEX ⭐</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">
                Com a ONVEX você vende sem precisar de estoque!
              </h1>
              <p className="text-white/80">
                Se associe a fornecedores e venda produtos pelo preço que quiser.
              </p>
            </div>
          </div>
        </div>

        {/* Header da Seção */}
        <div className="flex justify-between items-center mt-8 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Vitrine de Fornecimento</h2>
            <p className="text-gray-500">Exibindo 1 a {products.length} de 121 no total.</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg">
              <FontAwesomeIcon icon={faVideo} className="w-4 h-4" />
              <span>Vídeo</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
              <FontAwesomeIcon icon={faSlidersH} className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {product.rank}°
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-500">CUSTO POR UNIDADE</p>
                  <p className="text-xl font-bold text-purple-600">R$ {product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
