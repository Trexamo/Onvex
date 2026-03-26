import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/onboarding');
    } else {
      setError(result.error || 'E-mail ou senha incorretos');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    const result = await loginWithGoogle();
    
    if (result.success) {
      router.push('/onboarding');
    } else {
      setError(result.error || 'Erro ao fazer login com Google');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login - ONVEX</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
        <div className="card w-full max-w-md p-8 mx-4 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-12">
              <Image
                src="/images/onvex2.png"
                alt="ONVEX"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Entrar na plataforma</h1>
          <p className="text-center text-[var(--text-secondary)] mb-8">
            Acesse sua conta para continuar
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3.5 text-[var(--text-secondary)] w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input pl-10"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-[var(--text-secondary)] w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-[var(--text-secondary)]"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/auth/esqueci-senha" className="text-sm text-purple-500 hover:text-purple-400">
                Esqueci a senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loader w-5 h-5 border-2"></div>
                  <span className="ml-2">Verificando...</span>
                </div>
              ) : (
                'Entrar na minha conta'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-color)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[var(--card-bg)] text-[var(--text-secondary)]">Ou</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 border border-[var(--border-color)] py-3 rounded-xl hover:bg-[var(--hover-bg)] transition-colors"
          >
            <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-red-500" />
            <span>Continuar com Google</span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Não tem uma conta?{' '}
              <Link href="/auth/register" className="text-purple-500 hover:text-purple-400 font-medium">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
