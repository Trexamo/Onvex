import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faUser, faEnvelope, faPhone, faIdCard, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function Perfil() {
  const { user, refreshUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    data_nascimento: '',
    rg: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    banco: '',
    agencia: '',
    conta: '',
    tipo_conta: 'corrente'
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (data && !error) {
      setFormData({
        nome: data.name || '',
        email: data.email || '',
        telefone: data.phone || '',
        cpf: data.cpf || '',
        data_nascimento: data.birth_date || '',
        rg: data.rg || '',
        endereco: data.address || '',
        cidade: data.city || '',
        estado: data.state || '',
        cep: data.zip_code || '',
        banco: data.bank || '',
        agencia: data.bank_agency || '',
        conta: data.bank_account || '',
        tipo_conta: data.bank_account_type || 'corrente'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('users')
      .update({
        name: formData.nome,
        phone: formData.telefone,
        cpf: formData.cpf,
        birth_date: formData.data_nascimento,
        rg: formData.rg,
        address: formData.endereco,
        city: formData.cidade,
        state: formData.estado,
        zip_code: formData.cep,
        bank: formData.banco,
        bank_agency: formData.agencia,
        bank_account: formData.conta,
        bank_account_type: formData.tipo_conta,
        updated_at: new Date()
      })
      .eq('id', user.id);

    if (error) {
      setMessage('Erro ao salvar: ' + error.message);
    } else {
      setMessage('Dados salvos com sucesso!');
      setEditMode(false);
      await refreshUser();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <>
      <Head><title>Meu Perfil - ONVEX</title></Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>Meu Perfil</h1>
            <p className="text-sm" style={{ color: '#4a5568' }}>Gerencie suas informações pessoais e bancárias</p>
          </div>
          <button
            onClick={() => editMode ? handleSubmit() : setEditMode(true)}
            disabled={loading}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FontAwesomeIcon icon={editMode ? faSave : faEdit} className="w-4 h-4" />
            <span>{editMode ? (loading ? 'Salvando...' : 'Salvar') : 'Editar'}</span>
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2" style={{ color: '#1a1a2e' }}>
              <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-purple-500" />
              <span>Dados Pessoais</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Nome completo *</label><input type="text" name="nome" value={formData.nome} onChange={handleChange} disabled={!editMode} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>E-mail *</label><input type="email" name="email" value={formData.email} disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Telefone *</label><input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} disabled={!editMode} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="(11) 99999-9999" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>CPF *</label><input type="text" name="cpf" value={formData.cpf} onChange={handleChange} disabled={!editMode} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="123.456.789-00" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Data de Nascimento</label><input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>RG</label><input type="text" name="rg" value={formData.rg} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2" style={{ color: '#1a1a2e' }}>
              <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-purple-500" />
              <span>Endereço</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>CEP</label><input type="text" name="cep" value={formData.cep} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Endereço</label><input type="text" name="endereco" value={formData.endereco} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Cidade</label><input type="text" name="cidade" value={formData.cidade} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Estado</label><input type="text" name="estado" value={formData.estado} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
            </div>
          </div>

          {/* Dados Bancários */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2" style={{ color: '#1a1a2e' }}>
              <FontAwesomeIcon icon={faIdCard} className="w-5 h-5 text-purple-500" />
              <span>Dados Bancários (para receber comissões)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Banco</label><input type="text" name="banco" value={formData.banco} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Nome do banco" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Agência</label><input type="text" name="agencia" value={formData.agencia} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="0000" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Conta</label><input type="text" name="conta" value={formData.conta} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="00000-0" /></div>
              <div><label className="block text-sm mb-1" style={{ color: '#4a5568' }}>Tipo de Conta</label><select name="tipo_conta" value={formData.tipo_conta} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="corrente">Corrente</option><option value="poupanca">Poupança</option></select></div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
