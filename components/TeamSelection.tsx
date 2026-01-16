'use client';

import { motion } from 'framer-motion';
import { TEAMS } from '@/lib/data';
import Image from 'next/image';

interface TeamSelectionProps {
  selectedTeamId: string;
  onSelect: (teamId: string) => void;
}

export default function TeamSelection({ selectedTeamId, onSelect }: TeamSelectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4" dir="rtl">
      {TEAMS.map((team) => (
        <motion.button
          key={team.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(team.id)}
          className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
            selectedTeamId === team.id
              ? 'border-blue-600 bg-blue-50 shadow-lg'
              : 'border-gray-100 hover:border-blue-200 bg-white'
          }`}
        >
          <div className="relative w-16 h-16">
            <Image
              src={team.logo}
              alt={team.name}
              width={64}
              height={64}
              className="object-contain w-full h-full"
              unoptimized
            />
          </div>
          <span className={`font-semibold text-center ${
            selectedTeamId === team.id ? 'text-blue-700' : 'text-gray-700'
          }`}>
            {team.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
