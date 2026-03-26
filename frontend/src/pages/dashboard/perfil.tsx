import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faSave, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Perfil() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    nome: 'João Silva',
    email: 'joao@onvex.com',
    telefone: '(11) 99999-9999',
    documento: '123.456.789-00',
    dataNascimento: '1990-01-01',
    endereco: 'Rua das Flores, 123 - São Paulo/SP'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Dados salvos com sucesso!');
  };

  return (
    <>
      <Head>
        <title>Meu Perfil - ONVEX</title>
      </Head>

      <div className="w-full">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
            <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
          </div>
          <button
            onClick={() => editMode ? handleSave() : setEditMode(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FontAwesomeIcon icon={editMode ? faSave : faEdit} className="w-4 h-4" />
            <span>{editMode ? 'Salvar' : 'Editar'}</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {userData.nome.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData.nome}</h2>
              <p className="text-gray-500">Afiliado desde 2024</p>
              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Conta verificada</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome completo</label>
              <input
                type="text"
                name="nome"
                value={userData.nome}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={userData.telefone}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF/CNPJ</label>
              <input
                type="text"
                name="documento"
                value={userData.documento}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data de nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={userData.dataNascimento}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={userData.endereco}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">Dados bancários</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Banco</label>
                <input
                  type="text"
                  placeholder="Nome do banco"
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Agência</label>
                <input
                  type="text"
                  placeholder="0000"
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conta</label>
                <input
                  type="text"
                  placeholder="00000-0"
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
                <select disabled={!editMode} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:bg-gray-100">
                  <option>Corrente</option>
                  <option>Poupança</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
