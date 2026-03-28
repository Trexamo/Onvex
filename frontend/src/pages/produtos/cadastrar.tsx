import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function CadastrarProduto() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    promo_price: '',
    stock: '',
    category: '',
    type: 'fisico',
    images: [],
    commission_percent: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Calcular comissão padrão (10% para afiliados)
    const commission = formData.commission_percent || 10;

    const productData = {
      produtor_id: user?.id,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      promo_price: formData.promo_price ? parseFloat(formData.promo_price) : null,
      stock: parseInt(formData.stock) || 0,
      category: formData.category,
      type: formData.type,
      commission_percent: commission,
      is_active: true
    };

    const { data, error: supabaseError } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (supabaseError) {
      setError(supabaseError.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/produtos');
      }, 2000);
    }
    setLoading(false);
  };

  if (!user || user.role !== 'produtor') {
    return <div className="p-8 text-center">Acesso negado. Apenas produtores podem cadastrar produtos.</div>;
  }

  return (
    <>
      <Head><title>Cadastrar Produto - ONVEX</title></Head>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Produto</h1>

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500 text-green-500 rounded-lg">
            Produto cadastrado com sucesso! Redirecionando...
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do produto *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="input" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preço (R$) *</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preço promocional (R$)</label>
              <input type="number" step="0.01" name="promo_price" value={formData.promo_price} onChange={handleChange} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estoque</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="input" placeholder="Ex: Beleza, Saúde, Casa" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo do produto</label>
              <select name="type" value={formData.type} onChange={handleChange} className="input">
                <option value="fisico">Produto Físico (0% taxa)</option>
                <option value="digital">Produto Digital (7,99% taxa)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {formData.type === 'digital' ? 'Taxa da plataforma: 7,99% sobre cada venda' : 'Produtos físicos não têm taxa da plataforma'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comissão do afiliado (%)</label>
              <input type="number" step="0.1" name="commission_percent" value={formData.commission_percent} onChange={handleChange} className="input" placeholder="10%" />
              <p className="text-xs text-gray-500 mt-1">Padrão: 10% do valor do produto</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </>
  );
}
