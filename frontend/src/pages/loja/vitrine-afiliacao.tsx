import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function VitrineAfilicao() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    let query = supabase.from('products').select('*').eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head><title>Vitrine de Afiliação - ONVEX</title></Head>

      <div>
        <h1 className="text-2xl font-bold mb-2">Vitrine de Afiliação</h1>
        <p className="text-gray-400 mb-6">Escolha os melhores produtos para promover e ganhe comissões</p>

        {/* Busca e Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input w-40">
            <option value="">Todas</option>
            <option value="Beleza">Beleza</option>
            <option value="Saúde">Saúde</option>
            <option value="Casa">Casa</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Carregando produtos...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-xl">
            <p className="text-gray-400">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const finalPrice = product.promo_price || product.price;
              const commissionAmount = (finalPrice * (product.commission_percent || 10)) / 100;

              return (
                <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative h-48 bg-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">📦</div>
                    {product.type === 'digital' && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-xs px-2 py-1 rounded-full">Digital</span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{product.category || 'Sem categoria'}</p>

                    <div className="flex justify-between items-center mb-3">
                      <div>
                        {product.promo_price ? (
                          <>
                            <span className="text-2xl font-bold text-green-500">R$ {product.promo_price}</span>
                            <span className="text-sm line-through text-gray-500 ml-2">R$ {product.price}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-green-500">R$ {product.price}</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-purple-900/30 rounded-lg p-2 mb-4 text-center">
                      <p className="text-sm text-gray-300">💰 Sua comissão</p>
                      <p className="text-xl font-bold text-purple-400">R$ {commissionAmount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">({product.commission_percent || 10}% do valor)</p>
                    </div>

                    <Link href={`/produto/${product.id}`}>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        Promover produto
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
