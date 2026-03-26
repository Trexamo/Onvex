import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signInWithEmail, signInWithGoogle } from '../../lib/firebase';

export default function Login() {
  const router = useRouter();
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
    
    const result = await signInWithEmail(formData.email, formData.password);
    
    if (result.success) {
      localStorage.setItem('@onvex:user', JSON.stringify(result.user));
      router.push('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    const result = await signInWithGoogle();
    
    if (result.success) {
      localStorage.setItem('@onvex:user', JSON.stringify(result.user));
      router.push('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login - ONVEX</title>
      </Head>

      <div className="min-h-screen flex">
        {/* Lado Esquerdo - Formulário */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white dark:bg-gray-900">
          {/* Logo */}
          <div className="absolute top-8 left-8 md:left-16 lg:left-24">
            <div className="relative" style={{ width: '140px', height: '50px' }}>
              <Image
                src="/images/onvex2.png"
                alt="ONVEX"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Conteúdo do Formulário */}
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Acesse sua conta
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Entre com suas credenciais para continuar
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo E-mail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Recuperar Senha */}
              <div className="flex justify-end">
                <Link href="/auth/esqueci-senha" className="text-sm text-purple-600 hover:text-purple-700">
                  Recuperar senha
                </Link>
              </div>

              {/* Botão Acessar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? 'Acessando...' : 'Acessar conta'}
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-gray-900 text-gray-500">Ou</span>
              </div>
            </div>

            {/* Botão Google */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-red-500" />
              <span>Continuar com Google</span>
            </button>

            {/* Link Criar Conta */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Não tem uma conta?{' '}
                <Link href="/auth/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Criar conta
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Lado Direito - Imagem */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="/images/singup.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 to-purple-600/30"></div>
        </div>
      </div>
    </>
  );
}
