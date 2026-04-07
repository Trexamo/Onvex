import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login(email, password);
    setTimeout(() => {
      router.push('/onboarding');
    }, 500);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    router.push('/onboarding');
  };

  return (
    <>
      <Head><title>Cadastro | Onvex</title></Head>
      <div className="min-h-screen" style={{ background: '#060814' }}>
        <div className="sticky top-0 z-50" style={{ backdropFilter: 'saturate(160%) blur(14px)', background: 'linear-gradient(180deg, rgba(6,8,20,.86), rgba(6,8,20,.42))', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/onvexlogo.png" alt="Onvex" className="h-12 w-auto" />
            </Link>
            <div className="flex gap-3">
              <Link href="/auth/login" className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white hover:border-purple-500 transition-all">
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{ background: 'linear-gradient(135deg, #ffffff 8%, #dbe7ff 35%, #9fc2ff 60%, #c48cff 95%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Criar conta
              </h1>
              <p className="text-gray-400">Comece sua jornada na Onvex</p>
            </div>

            <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(180deg, rgba(12,18,38,.95), rgba(10,14,28,.82))', border: '1px solid rgba(255,255,255,.08)', boxShadow: '0 24px 80px rgba(3, 7, 18, .55)' }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full font-bold text-white transition-all transform hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.94), rgba(168,85,247,.94))', boxShadow: '0 14px 30px rgba(59,130,246,.18), 0 10px 24px rgba(168,85,247,.18)' }}
                >
                  {loading ? 'Criando conta...' : 'Criar conta'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-transparent text-gray-400">Ou</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-white/20 text-white hover:border-purple-500 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continuar com Google</span>
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Já tem uma conta?{' '}
                  <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
