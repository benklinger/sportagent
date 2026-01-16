'use client';

import { motion } from 'framer-motion';
import { Plane, Hotel, Ticket } from 'lucide-react';

interface PreferencesSelectionProps {
  preferences: {
    flight: boolean;
    hotel: boolean;
    tickets: boolean;
  };
  onToggle: (key: 'flight' | 'hotel' | 'tickets') => void;
}

export default function PreferencesSelection({ preferences, onToggle }: PreferencesSelectionProps) {
  const options = [
    { id: 'flight', label: 'טיסות', icon: Plane },
    { id: 'hotel', label: 'מלון', icon: Hotel },
    { id: 'tickets', label: 'כרטיסים למשחק', icon: Ticket },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={option.id === 'tickets' ? {} : { scale: 1.01 }}
            whileTap={option.id === 'tickets' ? {} : { scale: 0.98 }}
            onClick={() => option.id !== 'tickets' && onToggle(option.id)}
            className={`p-4 rounded-xl border-2 flex flex-row-reverse items-center justify-between transition-all ${
              preferences[option.id] ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white'
            } ${option.id === 'tickets' ? 'cursor-default opacity-80' : ''}`}
          >
            <div className="flex flex-row-reverse items-center gap-4">
              <div className={`p-2 rounded-lg ${preferences[option.id] ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                <option.icon size={20} />
              </div>
              <span className={`font-semibold ${preferences[option.id] ? 'text-blue-700' : 'text-gray-700'}`}>
                {option.label}
              </span>
            </div>
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
              preferences[option.id] ? 'bg-blue-600 border-blue-600' : 'border-gray-200'
            }`}>
              {preferences[option.id] && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
