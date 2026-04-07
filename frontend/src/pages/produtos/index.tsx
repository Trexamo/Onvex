import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function MeusProdutos() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // LOG para debug
  console.log('=== DEBUG MEUS PRODUTOS ===');
  console.log('user:', user);
  console.log('user?.role:', user?.role);
  console.log('loading:', loading);

  useEffect(() => {
    console.log('useEffect executado - user:', user);
    if (user?.id && user?.role === 'produtor') {
      console.log('Carregando produtos para produtor:', user.id);
      loadProducts();
    } else {
      console.log('Não carregando produtos - role:', user?.role);
      setIsLoading(false);
    }
  }, [user]);

  const loadProducts = async () => {
    console.log('Buscando produtos do produtor:', user.id);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('produtor_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) {
      console.log('Produtos encontrados:', data?.length);
      setProducts(data || []);
    } else {
      console.error('Erro ao carregar produtos:', error);
    }
    setIsLoading(false);
  };

  // Mostrar loading
  if (loading || isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">Carregando...</div>
      </div>
    );
  }

  // Se não está logado
  if (!user) {
    console.log('Usuário não logado');
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Faça login para acessar seus produtos.</p>
        <Link href="/auth/login" className="inline-block mt-4 text-purple-500">Ir para login</Link>
      </div>
    );
  }

  // Se não for produtor
  if (user.role !== 'produtor') {
    console.log('Acesso negado - role:', user.role);
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-8 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-yellow-500 mb-4">Área do Produtor</h1>
          <p className="text-gray-400 mb-4">Esta área é exclusiva para produtores.</p>
          <p className="text-sm text-gray-500">Sua role atual: <strong className="text-purple-400">{user.role || 'Nenhuma'}</strong></p>
          <p className="text-xs text-gray-500 mt-2">Onboarding concluído: {user.isOnboarded ? 'Sim' : 'Não'}</p>
          <Link href="/" className="inline-block mt-4 text-purple-500 hover:underline">
            Voltar para o início
          </Link>
        </div>
      </div>
    );
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

        {products.length === 0 ? (
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
                    R$ {product.price} | Estoque: {product.stock || 'N/A'} | 
                    {product.type === 'digital' ? ' Digital (7,99% taxa)' : ' Físico (0% taxa)'}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-sm ${product.is_active ? 'bg-green-600' : 'bg-gray-600'}`}>
                    {product.is_active ? 'Ativo' : 'Inativo'}
                  </span>
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
