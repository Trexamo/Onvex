import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signUpWithEmail, signInWithGoogle } from '../../lib/firebase';

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    
    const result = await signUpWithEmail(formData.email, formData.password, formData.name);
    
    if (result.success) {
      localStorage.setItem('@onvex:user', JSON.stringify(result.user));
      router.push('/onboarding');
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
      router.push('/onboarding');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Criar conta - ONVEX</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
        <div className="card w-full max-w-md p-8 mx-4 animate-fade-in">
          {/* Logo - APENAS UMA, GRANDE E COM GLOW NO TEMA ESCURO */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-16 logo-glow">
              <Image
                src="/images/onvex2.png"
                alt="ONVEX"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Criar conta</h1>
          <p className="text-center text-[var(--text-secondary)] mb-8">
            Preencha os dados para começar
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome completo</label>
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3.5 text-[var(--text-secondary)] w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input pl-10"
                  placeholder="Seu nome"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-2">Confirmar senha</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-[var(--text-secondary)] w-4 h-4" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-[var(--text-secondary)]"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
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

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-purple-500 hover:text-purple-400 font-medium">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
