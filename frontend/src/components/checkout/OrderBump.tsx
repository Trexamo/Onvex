import React, { useState } from 'react';
import Image from 'next/image';

interface OrderBumpProps {
  produtoPrincipal: any;
  produtoBump: any;
  onAdicionar: (produto: any) => void;
  onRemover: () => void;
}

export const OrderBump: React.FC<OrderBumpProps> = ({
  produtoPrincipal,
  produtoBump,
  onAdicionar,
  onRemover
}) => {
  const [adicionou, setAdicionou] = useState(false);

  const handleToggle = (checked: boolean) => {
    setAdicionou(checked);
    if (checked) {
      onAdicionar(produtoBump);
    } else {
      onRemover();
    }
  };

  if (!produtoBump) return null;

  const precoOriginal = produtoBump.preco * 1.3; // Simulando preço original 30% maior
  const economia = precoOriginal - produtoBump.preco;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 my-6">
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="pt-1">
          <input
            type="checkbox"
            id="order-bump"
            checked={adicionou}
            onChange={(e) => handleToggle(e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
          />
        </div>

        {/* Imagem do produto */}
        <div className="w-20 h-20 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
          {produtoBump.imagem ? (
            <img
              src={produtoBump.imagem}
              alt={produtoBump.nome}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-purple-400">
              🎁
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="flex-1">
          <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mb-2">
            OFERTA ESPECIAL
          </span>
          <h3 className="font-bold text-gray-900">{produtoBump.nome}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Adicione por apenas <span className="font-bold text-purple-600">R$ {produtoBump.preco.toFixed(2)}</span>
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="line-through text-gray-400">
              R$ {precoOriginal.toFixed(2)}
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Economia de R$ {economia.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Badge de economia */}
        <div className="bg-purple-600 text-white px-3 py-1 rounded-lg text-center">
          <span className="text-xs">ECONOMIZE</span>
          <span className="block font-bold">R$ {economia.toFixed(2)}</span>
        </div>
      </div>

      {/* Efeito no total */}
      {adicionou && (
        <div className="mt-4 pt-4 border-t border-purple-200 flex justify-between items-center text-sm">
          <span className="text-gray-600">Total com bump:</span>
          <span className="font-bold text-purple-600">
            R$ {(produtoPrincipal.preco + produtoBump.preco).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};
