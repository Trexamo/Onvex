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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'fisico',
    preco: '',
    quantidade_estoque: '',
    regiao: 'SP',
    tipo_entrega: 'link',
    conteudo: '',
    permitir_afiliados: true,
    comissao: '10',
    order_bump: '',
    bump_preco: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Calcular taxas automaticamente
      const taxaPercentual = formData.tipo === 'digital' ? 7.99 : 6.59;
      const taxaFixa = formData.tipo === 'digital' ? 0 : 7.99;
      const taxaEntrega = formData.tipo === 'digital' ? 0 : 19.99;

      const productData = {
        produtor_id: user?.id,
        name: formData.nome,
        description: formData.descricao,
        type: formData.tipo,
        price: parseFloat(formData.preco),
        taxa_percentual: taxaPercentual,
        taxa_fixa: taxaFixa,
        taxa_entrega: taxaEntrega,
        status: 'ativo',
        commission_percent: parseFloat(formData.comissao)
      };

      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (productError) throw productError;

      // Se for produto físico, adicionar estoque
      if (formData.tipo === 'fisico' && formData.quantidade_estoque) {
        const { error: stockError } = await supabase
          .from('product_stock')
          .insert({
            product_id: product.id,
            quantidade: parseInt(formData.quantidade_estoque),
            regiao: formData.regiao
          });

        if (stockError) throw stockError;
      }

      // Se for produto digital, adicionar conteúdo
      if (formData.tipo === 'digital' && formData.conteudo) {
        const { error: digitalError } = await supabase
          .from('product_digital')
          .insert({
            product_id: product.id,
            tipo_entrega: formData.tipo_entrega,
            conteudo: formData.conteudo
          });

        if (digitalError) throw digitalError;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/produtos');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar produto');
    }
    setLoading(false);
  };

  if (!user || user.role !== 'produtor') {
    return <div className="p-8 text-center text-white">Acesso negado. Apenas produtores podem cadastrar produtos.</div>;
  }

  return (
    <>
      <Head><title>Cadastrar Produto - ONVEX</title></Head>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Criar Produto</h1>
          <p className="text-gray-400">Preencha as informações abaixo</p>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500 text-green-500 rounded-lg fade-in">
            ✅ Produto cadastrado com sucesso! Redirecionando...
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-500 rounded-lg fade-in">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nome do produto *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="input"
              placeholder="Ex: Gel Volumetrão"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
            <textarea
              name="descricao"
              rows={4}
              value={formData.descricao}
              onChange={handleChange}
              className="input"
              placeholder="Descreva seu produto..."
            />
          </div>

          {/* Tipo e Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo do produto *</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange} className="input">
                <option value="fisico">📦 Produto Físico (COD)</option>
                <option value="digital">💻 Produto Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                required
                className="input"
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Campos específicos para Produto Físico */}
          {formData.tipo === 'fisico' && (
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 space-y-4">
              <h3 className="text-purple-400 font-semibold">📦 Configurações do Produto Físico</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Quantidade em estoque *</label>
                  <input
                    type="number"
                    name="quantidade_estoque"
                    value={formData.quantidade_estoque}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Mínimo 40 unidades"
                  />
                  <p className="text-xs text-gray-500 mt-1">Mínimo recomendado: 40 unidades</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Região de entrega</label>
                  <select name="regiao" value={formData.regiao} onChange={handleChange} className="input">
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="BA">Bahia</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-sm text-gray-400">📊 Taxas aplicadas:</p>
                <p className="text-xs text-gray-500">• Taxa da plataforma: 6,59%</p>
                <p className="text-xs text-gray-500">• Taxa fixa: R$ 7,99</p>
                <p className="text-xs text-gray-500">• Taxa de entrega: R$ 19,99</p>
              </div>
            </div>
          )}

          {/* Campos específicos para Produto Digital */}
          {formData.tipo === 'digital' && (
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 space-y-4">
              <h3 className="text-purple-400 font-semibold">💻 Configurações do Produto Digital</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de entrega</label>
                <select name="tipo_entrega" value={formData.tipo_entrega} onChange={handleChange} className="input">
                  <option value="link">Link de acesso</option>
                  <option value="arquivo">Arquivo para download</option>
                  <option value="membership">Área de membros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Conteúdo (URL ou link)</label>
                <input
                  type="text"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://seusite.com/produto"
                  required
                />
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-sm text-gray-400">📊 Taxas aplicadas:</p>
                <p className="text-xs text-gray-500">• Taxa da plataforma: 7,99%</p>
                <p className="text-xs text-gray-500">• Sem taxa fixa ou de entrega</p>
              </div>
            </div>
          )}

          {/* Configurações de Afiliados */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-4">
            <h3 className="text-purple-400 font-semibold">🤝 Configurações de Afiliados</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Permitir afiliados</p>
                <p className="text-xs text-gray-500">Afiliados podem promover seu produto</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="permitir_afiliados"
                  checked={formData.permitir_afiliados}
                  onChange={(e) => setFormData({ ...formData, permitir_afiliados: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Comissão para afiliados (%)</label>
              <input
                type="number"
                step="0.1"
                name="comissao"
                value={formData.comissao}
                onChange={handleChange}
                className="input"
                placeholder="10"
              />
              <p className="text-xs text-gray-500 mt-1">Valor recomendado: 10% a 30%</p>
            </div>
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-lg disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Criando produto...</span>
              </div>
            ) : (
              'Criar Produto'
            )}
          </button>
        </form>
      </div>
    </>
  );
}
