import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function Onboarding() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [perfil, setPerfil] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Se já tem role, redireciona
  useEffect(() => {
    if (user && user.role && user.role !== '') {
      console.log('Usuário já tem role, redirecionando...');
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = () => {
    if (!perfil) {
      setError('Selecione um perfil');
      return;
    }
    
    console.log('Salvando perfil:', perfil);
    setLoading(true);
    
    updateUser({ role: perfil, isOnboarded: true });
    
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  // Se já tem role, não mostra o onboarding
  if (user.role && user.role !== '') {
    return null;
  }

  return (
    <>
      <Head><title>Escolha seu perfil - ONVEX</title></Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative w-40 h-12">
                <Image src="/images/onvex2.png" alt="ONVEX" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, {user?.name || 'usuário'}!</h1>
            <p className="text-gray-500 mt-2">Como você quer atuar na plataforma?</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => setPerfil('produtor')}
              className={`w-full p-4 rounded-xl text-left transition-all ${perfil === 'produtor' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <div className="font-semibold">📦 Produtor</div>
              <div className="text-sm opacity-80">Vender seus produtos e ter afiliados</div>
            </button>
            
            <button
              onClick={() => setPerfil('afiliado')}
              className={`w-full p-4 rounded-xl text-left transition-all ${perfil === 'afiliado' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <div className="font-semibold">🤝 Afiliado</div>
              <div className="text-sm opacity-80">Promover produtos e ganhar comissões</div>
            </button>
            
            <button
              onClick={() => setPerfil('entregador')}
              className={`w-full p-4 rounded-xl text-left transition-all ${perfil === 'entregador' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <div className="font-semibold">🚚 Entregador</div>
              <div className="text-sm opacity-80">Realizar entregas</div>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!perfil || loading}
            className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Começar'}
          </button>
        </div>
      </div>
    </>
  );
}
