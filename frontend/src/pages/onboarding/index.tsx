import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function Onboarding() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipoPerfil: '',
    tipoProduto: '',
    preferenciaEntrega: '',
    receberPromocoes: '',
    comoConheceu: '',
    vende: '',
    vendeOutraPlataforma: '',
    tipoEntrega: '',
    tipoEmpresa: '',
    veiculo: '',
    modoRecebimento: '',
    setor: '',
    responsabilidade: ''
  });

  const [perfil, setPerfil] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await completeOnboarding({ ...formData, perfil });
    router.push('/');
    setLoading(false);
  };

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  if (step === 1) {
    return (
      <>
        <Head><title>Bem-vindo - ONVEX</title></Head>
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
          <div className="card w-full max-w-lg p-8 mx-4 animate-fade-in">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative w-48 h-16 logo-glow">
                  <Image src="/images/onvex2.png" alt="ONVEX" fill className="object-contain" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Bem-vindo(a), {user.name || 'usuário'}!</h1>
              <p className="text-[var(--text-secondary)] mt-2">Vamos configurar sua experiência rapidamente</p>
            </div>

            <h2 className="text-lg font-semibold mb-4">Qual é o seu perfil?</h2>
            <div className="space-y-3">
              <label className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-all ${perfil === 'produtor' ? 'border-purple-500 bg-purple-500/10' : 'border-[var(--border-color)] hover:border-purple-500/50'}`}>
                <input type="radio" name="perfil" value="produtor" onChange={(e) => setPerfil(e.target.value)} className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <span className="font-medium">Produtor</span>
                  <p className="text-sm text-[var(--text-secondary)]">Vender seus produtos</p>
                </div>
              </label>
              <label className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-all ${perfil === 'afiliado' ? 'border-purple-500 bg-purple-500/10' : 'border-[var(--border-color)] hover:border-purple-500/50'}`}>
                <input type="radio" name="perfil" value="afiliado" onChange={(e) => setPerfil(e.target.value)} className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <span className="font-medium">Afiliado</span>
                  <p className="text-sm text-[var(--text-secondary)]">Promover produtos e ganhar comissões</p>
                </div>
              </label>
              <label className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-all ${perfil === 'entregador' ? 'border-purple-500 bg-purple-500/10' : 'border-[var(--border-color)] hover:border-purple-500/50'}`}>
                <input type="radio" name="perfil" value="entregador" onChange={(e) => setPerfil(e.target.value)} className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <span className="font-medium">Entregador</span>
                  <p className="text-sm text-[var(--text-secondary)]">Realizar entregas</p>
                </div>
              </label>
            </div>
            <button onClick={() => setStep(2)} disabled={!perfil} className="btn-primary w-full mt-8">Continuar</button>
          </div>
        </div>
      </>
    );
  }

  // Perguntas por perfil
  return (
    <>
      <Head><title>Complete seu perfil - ONVEX</title></Head>
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
        <div className="card w-full max-w-2xl p-8 mx-4 animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-48 h-16 logo-glow">
                <Image src="/images/onvex2.png" alt="ONVEX" fill className="object-contain" />
              </div>
            </div>
            <h2 className="text-xl font-semibold">
              {perfil === 'produtor' && 'Vamos preparar sua loja em menos de 1 minuto'}
              {perfil === 'afiliado' && 'Configure sua área de afiliado'}
              {perfil === 'entregador' && 'Configure seu modo de entrega'}
            </h2>
          </div>

          <div className="space-y-5">
            {/* Perguntas para PRODUTOR */}
            {perfil === 'produtor' && (
              <>
                <div><label className="block text-sm font-medium mb-2">O que você vende?</label><select name="vende" onChange={handleChange} className="input"><option value="">Selecione</option><option value="fisicos">Produtos físicos</option><option value="digitais">Produtos digitais</option><option value="ambos">Ambos</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Você já vende em outra plataforma?</label><select name="vendeOutraPlataforma" onChange={handleChange} className="input"><option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Não</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Deseja usar entrega própria ou transportadora?</label><select name="tipoEntrega" onChange={handleChange} className="input"><option value="">Selecione</option><option value="propria">Entrega própria</option><option value="transportadora">Transportadora</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Sua empresa é:</label><select name="tipoEmpresa" onChange={handleChange} className="input"><option value="">Selecione</option><option value="mei">MEI</option><option value="empresa">Empresa</option><option value="pf">Pessoa física</option></select></div>
              </>
            )}

            {/* Perguntas para AFILIADO */}
            {perfil === 'afiliado' && (
              <>
                <div><label className="block text-sm font-medium mb-2">Qual tipo de produto você mais promove?</label><select name="tipoProduto" onChange={handleChange} className="input"><option value="">Selecione</option><option value="fisicos">Produtos físicos</option><option value="digitais">Produtos digitais</option><option value="ambos">Ambos</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Você prefere comissão maior ou produtos mais fáceis de vender?</label><select name="preferenciaEntrega" onChange={handleChange} className="input"><option value="">Selecione</option><option value="comissao">Comissão maior</option><option value="facil">Mais fácil de vender</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Deseja receber promoções e novidades?</label><select name="receberPromocoes" onChange={handleChange} className="input"><option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Não</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Como conheceu a plataforma?</label><select name="comoConheceu" onChange={handleChange} className="input"><option value="">Selecione</option><option value="instagram">Instagram</option><option value="indicacao">Indicação</option><option value="google">Google</option><option value="outro">Outro</option></select></div>
              </>
            )}

            {/* Perguntas para ENTREGADOR */}
            {perfil === 'entregador' && (
              <>
                <div><label className="block text-sm font-medium mb-2">Você usa moto, bicicleta ou carro?</label><select name="veiculo" onChange={handleChange} className="input"><option value="">Selecione</option><option value="moto">Moto</option><option value="bicicleta">Bicicleta</option><option value="carro">Carro</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Deseja receber pedidos automaticamente ou manualmente?</label><select name="modoRecebimento" onChange={handleChange} className="input"><option value="">Selecione</option><option value="automatico">Automaticamente</option><option value="manual">Manualmente</option></select></div>
              </>
            )}
          </div>

          <div className="flex space-x-3 mt-8">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">Voltar</button>
            <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1">{loading ? 'Salvando...' : 'Começar'}</button>
          </div>
        </div>
      </div>
    </>
  );
}
