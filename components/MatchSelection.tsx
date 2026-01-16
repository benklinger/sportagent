'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATCHES, TEAMS } from '@/lib/data';
import { Match } from '@/lib/types';
import { MapPin, CalendarDays } from 'lucide-react';
import CustomDatePicker from './CustomDatePicker';
import { format } from 'date-fns';
import { he } from 'date-fns/locale/he';

interface MatchSelectionProps {
  selectedTeamId: string;
  startDate: string;
  selectedMatchId: string;
  onDateChange: (date: string) => void;
  onMatchSelect: (matchId: string) => void;
}

export default function MatchSelection({
  selectedTeamId,
  startDate,
  selectedMatchId,
  onDateChange,
  onMatchSelect,
}: MatchSelectionProps) {
  const getTeam = (teamId: string) => {
    return TEAMS.find(t => t.id === teamId);
  };

  const filteredMatches = useMemo(() => {
    let matches = MATCHES.filter((m) => m.homeTeamId === selectedTeamId || m.awayTeamId === selectedTeamId);
    
    if (startDate) {
      matches = matches
        .filter((m) => m.date >= startDate)
        .sort((a, b) => a.date.localeCompare(b.date));
    }
    
    return matches;
  }, [selectedTeamId, startDate]);

  const renderMatchCard = (match: Match) => {
    const homeTeam = getTeam(match.homeTeamId);
    const awayTeam = getTeam(match.awayTeamId);
    const isSelected = selectedMatchId === match.id;

    return (
      <motion.button
        key={match.id}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onMatchSelect(match.id)}
        className={`w-full p-5 rounded-2xl border-2 transition-all ${
          isSelected ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-100 bg-white'
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Away Team (Left) */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 relative flex items-center justify-center">
                {awayTeam?.logo ? (
                  <img src={awayTeam.logo} alt={awayTeam.name} className="object-contain w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400 font-bold">
                    LOGO
                  </div>
                )}
              </div>
              <span className="text-xs font-bold text-gray-900 text-center">{awayTeam?.name}</span>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <div className="text-gray-300 font-bold text-xl">VS</div>
            </div>

            {/* Home Team (Right) */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 relative flex items-center justify-center">
                {homeTeam?.logo ? (
                  <img src={homeTeam.logo} alt={homeTeam.name} className="object-contain w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400 font-bold">
                    LOGO
                  </div>
                )}
              </div>
              <span className="text-xs font-bold text-gray-900 text-center">{homeTeam?.name}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-3 flex flex-row-reverse justify-between items-center px-1">
            <div className="flex flex-row-reverse items-center gap-1.5 text-gray-500">
              <MapPin size={14} />
              <span className="text-xs font-medium">
                {match.stadium}
              </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-1.5 text-gray-500">
              <CalendarDays size={14} />
              <span className="text-xs font-medium">
                {format(new Date(match.date), 'EEEE, d בMMMM yyyy', { locale: he })}
              </span>
            </div>
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="pt-2">
          <CustomDatePicker 
            selectedDate={startDate}
            onChange={onDateChange}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map(renderMatchCard)
          ) : (
            <p className="text-gray-500 text-center py-4">לא נמצאו משחקים אחרי תאריך זה.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
