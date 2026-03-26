import React, { useState } from "react";

const CommunityButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-purple-700 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? "▼" : "👥"}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-xl shadow-2xl p-2 min-w-[220px] border">
          <a
            href="https://chat.whatsapp.com/HvPtMyH8ygd50sMO2SFNmg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              W
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Comunidade ONVEX</p>
              <p className="text-xs text-gray-500">Grupo no WhatsApp</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default CommunityButton;