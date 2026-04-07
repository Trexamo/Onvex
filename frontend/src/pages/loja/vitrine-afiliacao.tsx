import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheck, faChevronLeft, faChevronRight, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function VitrineAfilicao() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [addedProduct, setAddedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    loadProducts();
  }, [category, search, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*', { count: 'exact' }).eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (!error) {
      setProducts(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    }
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.promo_price || product.price,
      quantity: 1,
      type: product.type,
      commission_percent: product.commission_percent
    });
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <>
      <Head><title>Vitrine de Afiliação - ONVEX</title></Head>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Vitrine de Afiliação</h1>
          <Link href="/checkout" className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
            <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
            <span>Ver Carrinho</span>
          </Link>
        </div>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Escolha os melhores produtos para promover e ganhe comissões</p>

        {/* Busca e Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3" style={{ color: 'var(--text-tertiary)', width: '1rem', height: '1rem' }} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="input pl-10"
            />
          </div>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }} className="select w-40">
            <option value="">Todas</option>
            <option value="Beleza">Beleza</option>
            <option value="Saúde">Saúde</option>
            <option value="Casa">Casa</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>Carregando produtos...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const finalPrice = product.promo_price || product.price;
                const commissionAmount = (finalPrice * (product.commission_percent || 10)) / 100;

                return (
                  <div key={product.id} className="rounded-xl overflow-hidden transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                    <div className="relative h-48" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">📦</div>
                      {product.type === 'digital' && (
                        <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>Digital</span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>{product.category || 'Sem categoria'}</p>

                      <div className="flex justify-between items-center mb-3">
                        <div>
                          {product.promo_price ? (
                            <>
                              <span className="text-2xl font-bold" style={{ color: 'var(--success)' }}>R$ {product.promo_price}</span>
                              <span className="text-sm line-through ml-2" style={{ color: 'var(--text-tertiary)' }}>R$ {product.price}</span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold" style={{ color: 'var(--success)' }}>R$ {product.price}</span>
                          )}
                        </div>
                      </div>

                      <div className="rounded-lg p-2 mb-4 text-center" style={{ backgroundColor: 'var(--hover-bg)' }}>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>💰 Sua comissão</p>
                        <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>R$ {commissionAmount.toFixed(2)}</p>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>({product.commission_percent || 10}% do valor)</p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-2 rounded-lg transition-all flex items-center justify-center space-x-2"
                        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                      >
                        {addedProduct === product.id ? (
                          <>
                            <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                            <span>Adicionar ao carrinho</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg disabled:opacity-50"
                  style={{ backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </button>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Página {currentPage} de {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg disabled:opacity-50"
                  style={{ backgroundColor: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
                >
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
