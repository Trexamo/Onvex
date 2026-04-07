import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function Onboarding() {
  const router = useRouter();
  const { user, setRole } = useAuth();
  const [perfil, setPerfil] = useState('');

  const handleSubmit = () => {
    if (perfil) {
      setRole(perfil);
      router.push('/');
    }
  };

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  if (user.role) {
    router.push('/');
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
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo!</h1>
            <p className="text-gray-500 mt-2">Como você quer atuar na plataforma?</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setPerfil('produtor')}
              className={`w-full p-4 rounded-xl text-left transition-all ${perfil === 'produtor' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            >
              <div className="font-semibold">📦 Produtor</div>
              <div className="text-sm">Vender seus produtos</div>
            </button>
            
            <button
              onClick={() => setPerfil('afiliado')}
              className={`w-full p-4 rounded-xl text-left transition-all ${perfil === 'afiliado' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            >
              <div className="font-semibold">🤝 Afiliado</div>
              <div className="text-sm">Promover produtos</div>
            </button>
            
            <button
              onClick={() => setPerfil('entregador')}
              className={`w-full p-4 rounded-xl text-left transition-all ${perfil === 'entregador' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            >
              <div className="font-semibold">🚚 Entregador</div>
              <div className="text-sm">Realizar entregas</div>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!perfil}
            className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700"
          >
            Começar
          </button>
        </div>
      </div>
    </>
  );
}
