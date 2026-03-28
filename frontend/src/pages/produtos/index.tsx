import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function MeusProdutos() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadProducts();
    }
  }, [user]);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('produtor_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (!error) loadProducts();
  };

  if (!user || user.role !== 'produtor') {
    return <div className="p-8 text-center">Acesso negado. Área do produtor.</div>;
  }

  return (
    <>
      <Head><title>Meus Produtos - ONVEX</title></Head>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Produtos</h1>
          <Link href="/produtos/cadastrar" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            + Novo Produto
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-xl">
            <p className="text-gray-400">Você ainda não tem produtos cadastrados.</p>
            <Link href="/produtos/cadastrar" className="inline-block mt-4 text-purple-500">Cadastrar primeiro produto</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-400">
                    R$ {product.price} | Estoque: {product.stock} | 
                    {product.type === 'digital' ? ' Digital (7,99% taxa)' : ' Físico (0% taxa)'}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => toggleStatus(product.id, product.is_active)}
                    className={`px-3 py-1 rounded-lg text-sm ${product.is_active ? 'bg-green-600' : 'bg-gray-600'}`}
                  >
                    {product.is_active ? 'Ativo' : 'Inativo'}
                  </button>
                  <Link href={`/produtos/editar/${product.id}`} className="px-3 py-1 bg-purple-600 rounded-lg text-sm">Editar</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
