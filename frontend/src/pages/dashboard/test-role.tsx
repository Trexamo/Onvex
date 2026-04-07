import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function TestRole() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Role</h1>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p><strong>Nome:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role atual:</strong> <span className="text-purple-400">{user?.role || 'Nenhuma'}</span></p>
        <p><strong>Onboarding concluído:</strong> {user?.isOnboarded ? 'Sim' : 'Não'}</p>
      </div>
    </div>
  );
}