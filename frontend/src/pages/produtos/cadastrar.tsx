import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faVideo,
  faTrash,
  faPlus,
  faSave,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

export default function CadastrarProduto() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('geral');
  const [showSuccess, setShowSuccess] = useState(false);

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo_produto: 'fisico',
    tipo_cobranca: 'unica',
    preco: '',
    preco_promocional: '',
    comissao_percentual: '',
    comissao_fixa: '',
    imagem_principal: null,
    imagens_checkout: [],
    garantia: 7,
    politica: '',
    ativo: true
  });

  // Variações
  const [variations, setVariations] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular salvamento
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/');
    }, 2000);
  };

  const commissionCalculated = () => {
    const preco = parseFloat(formData.preco) || 0;
    const percentual = parseFloat(formData.comissao_percentual) || 0;
    const fixa = parseFloat(formData.comissao_fixa) || 0;
    
    if (percentual > 0) {
      return (preco * percentual / 100).toFixed(2);
    }
    if (fixa > 0) {
      return fixa.toFixed(2);
    }
    return '0,00';
  };

  const tabs = [
    { id: 'geral', label: 'Geral' },
    { id: 'precificacao', label: 'Precificação' },
    { id: 'variacoes', label: 'Variações' },
    { id: 'checkout', label: 'Checkout' },
  ];

  return (
    <>
      <Head>
        <title>Cadastrar Produto - ONVEX</title>
      </Head>

      <div className="w-full">
        {/* Header da Página */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cadastrar Produto</h1>
          <p className="text-sm text-gray-500">Preencha as informações para criar um novo produto</p>
        </div>

        {/* Mensagem de Sucesso */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in">
            <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
            <span>Produto cadastrado com sucesso!</span>
          </div>
        )}

        {/* Abas */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Principal - Formulário */}
            <div className="lg:col-span-2 space-y-6">
              {/* ABA GERAL */}
              {activeTab === 'geral' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações Gerais</h2>
                  
                  <div className="space-y-4">
                    {/* Nome do Produto */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome do produto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Ex: Gel Volumetrão"
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Descrição detalhada do produto..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Use **negrito**, *itálico* ou markdown</p>
                    </div>

                    {/* Tipo de Produto e Cobrança */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tipo de produto
                        </label>
                        <select
                          name="tipo_produto"
                          value={formData.tipo_produto}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="fisico">Produto físico</option>
                          <option value="digital">Produto digital</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tipo de cobrança
                        </label>
                        <select
                          name="tipo_cobranca"
                          value={formData.tipo_cobranca}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="unica">Única</option>
                          <option value="recorrente">Recorrente</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA PRECIFICAÇÃO */}
              {activeTab === 'precificacao' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Precificação e Comissões</h2>
                  
                  <div className="space-y-4">
                    {/* Preços */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Preço base (R$) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="preco"
                          value={formData.preco}
                          onChange={handleChange}
                          required
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          placeholder="0,00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Preço promocional (R$)
                        </label>
                        <input
                          type="number"
                          name="preco_promocional"
                          value={formData.preco_promocional}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          placeholder="0,00"
                        />
                      </div>
                    </div>

                    {/* Comissões */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Comissão (%)
                        </label>
                        <input
                          type="number"
                          name="comissao_percentual"
                          value={formData.comissao_percentual}
                          onChange={handleChange}
                          step="0.1"
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Comissão fixa (R$)
                        </label>
                        <input
                          type="number"
                          name="comissao_fixa"
                          value={formData.comissao_fixa}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          placeholder="0,00"
                        />
                      </div>
                    </div>

                    {/* Preview da Comissão */}
                    {formData.preco && (formData.comissao_percentual || formData.comissao_fixa) && (
                      <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Preview da comissão do afiliado</p>
                        <p className="text-2xl font-bold text-purple-600">
                          R$ {commissionCalculated()} por venda
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ABA VARIAÇÕES */}
              {activeTab === 'variacoes' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Variações do Produto</h2>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center space-x-1"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                      <span>Adicionar variação</span>
                    </button>
                  </div>

                  <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <p className="text-gray-500">Nenhuma variação cadastrada</p>
                    <p className="text-sm text-gray-400 mt-1">Clique em "Adicionar variação" para começar</p>
                  </div>
                </div>
              )}

              {/* ABA CHECKOUT */}
              {activeTab === 'checkout' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configurações de Checkout</h2>
                  
                  <div className="space-y-4">
                    {/* Nome no Checkout */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome exibido no checkout
                      </label>
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Descrição Curta */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição curta
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Breve descrição para o checkout..."
                      />
                    </div>

                    {/* Garantia */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Garantia (dias)
                      </label>
                      <input
                        type="number"
                        name="garantia"
                        value={formData.garantia}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Política de Devolução */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Política de devolução
                      </label>
                      <textarea
                        name="politica"
                        value={formData.politica}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Descreva a política de devolução..."
                      />
                    </div>

                    {/* Ativar Produto */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="ativo"
                        checked={formData.ativo}
                        onChange={handleChange}
                        id="ativo"
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="ativo" className="text-sm text-gray-700 dark:text-gray-300">
                        Produto ativo na vitrine
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Lateral - Mídias */}
            <div className="lg:col-span-1 space-y-6">
              {/* Exibição na plataforma */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Exibição na plataforma</h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <FontAwesomeIcon icon={faImage} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Clique para enviar</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG até 2MB</p>
                  <p className="text-xs text-purple-600 mt-2">Imagem principal da vitrine</p>
                </div>
              </div>

              {/* Exibição no checkout */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Exibição no checkout</h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <FontAwesomeIcon icon={faImage} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Clique para enviar múltiplas</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG até 2MB cada</p>
                  <p className="text-xs text-purple-600 mt-2">Imagens da página de compra</p>
                </div>
              </div>

              {/* Preview do Link */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Link base do produto</p>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                  onvex.com/produto/123?ref={'{user_id}'}
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
              <span>Salvar produto</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
