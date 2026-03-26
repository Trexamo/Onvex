import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Opção 1: mailto (simples)
    const subject = encodeURIComponent('Novo contato de design');
    const body = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\nMensagem: ${formData.mensagem}`
    );
    
    // Simular envio (na prática, aqui iria EmailJS ou mailto)
    setTimeout(() => {
      window.location.href = `mailto:designer@onvex.com?subject=${subject}&body=${body}`;
      setIsSending(false);
      setSent(true);
      
      // Fechar após 2 segundos
      setTimeout(() => {
        onClose();
        setSent(false);
        setFormData({ nome: '', email: '', mensagem: '' });
        setFile(null);
      }, 2000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay com blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#1a1a2e] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-purple-500/30"
           style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)' }}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Falar com Designer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCheck} className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-white">Mensagem enviada com sucesso!</p>
            <p className="text-gray-400 text-sm mt-2">Você será redirecionado para o email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#0f0f1a] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Seu nome"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email (Gmail)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                pattern=".*@gmail\.com"
                title="Use um email do Gmail"
                className="w-full px-4 py-2 bg-[#0f0f1a] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="seuemail@gmail.com"
              />
            </div>

            {/* Upload de foto (opcional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Foto (opcional)</label>
              <div className="flex items-center space-x-3">
                <label className="flex-1 cursor-pointer">
                  <div className="w-full px-4 py-2 bg-[#0f0f1a] border border-purple-500/30 rounded-lg text-gray-400 hover:border-purple-500 transition-colors flex items-center space-x-2">
                    <FontAwesomeIcon icon={faImage} className="w-4 h-4" />
                    <span className="text-sm truncate">{file ? file.name : 'Escolher arquivo'}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Mensagem inicial</label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-[#0f0f1a] border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Descreva sua ideia..."
              />
            </div>

            {/* Botão enviar */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50"
              style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' }}
            >
              {isSending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                  <span>Enviar mensagem</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
