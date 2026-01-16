'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MATCHES, TEAMS } from '@/lib/data';
import { Match } from '@/lib/types';
import CustomDatePicker from './CustomDatePicker';
import { format } from 'date-fns';
import { he } from 'date-fns/locale/he';
import Image from 'next/image';
import { MapPin, CalendarDays, Loader2 } from 'lucide-react';
import { TEAM_NAME_MAP, STADIUM_NAME_MAP } from '@/lib/football-api';

interface ApiFixture {
  fixture: {
    id: number;
    date: string;
  };
  teams: {
    home: { id: number };
    away: { id: number };
  };
  venue: {
    name: string;
  };
}

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
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTeam = useMemo(() => TEAMS.find(t => t.id === selectedTeamId), [selectedTeamId]);

  useEffect(() => {
    if (selectedTeam?.apiId) {
      fetchLiveMatches(selectedTeam.apiId);
    } else {
      setLiveMatches([]);
    }
  }, [selectedTeam]);

  async function fetchLiveMatches(apiId: number) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/fixtures/${apiId}`);
      if (!response.ok) throw new Error('Failed to fetch fixtures');
      const data = await response.json();
      
      const formattedMatches: Match[] = data.map((f: ApiFixture) => ({
        id: f.fixture.id.toString(),
        homeTeamId: f.teams.home.id.toString(),
        awayTeamId: f.teams.away.id.toString(),
        date: f.fixture.date.split('T')[0],
        stadium: STADIUM_NAME_MAP[f.venue.name] || f.venue.name,
      }));

      setLiveMatches(formattedMatches);
    } catch (err) {
      console.error('Error fetching live matches:', err);
      setError('שגיאה בטעינת משחקים חיים');
    } finally {
      setIsLoading(false);
    }
  }

  const getTeam = (teamId: string) => {
    // Try to find in our local TEAMS first (for logo)
    const localTeam = TEAMS.find(t => t.apiId?.toString() === teamId || t.id === teamId);
    if (localTeam) return localTeam;

    // Fallback name from map if available
    return {
      id: teamId,
      name: TEAM_NAME_MAP[teamId] || teamId,
      logo: `https://media.api-sports.io/football/teams/${teamId}.png`,
    };
  };

  const filteredMatches = useMemo(() => {
    const sourceMatches = selectedTeam?.apiId ? liveMatches : MATCHES.filter((m) => m.homeTeamId === selectedTeamId || m.awayTeamId === selectedTeamId);
    
    if (startDate) {
      return sourceMatches
        .filter((m) => m.date >= startDate)
        .sort((a, b) => a.date.localeCompare(b.date));
    }
    
    return sourceMatches;
  }, [selectedTeamId, startDate, liveMatches, selectedTeam]);

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
                  <Image src={awayTeam.logo} alt={awayTeam.name} width={48} height={48} className="object-contain w-full h-full" unoptimized />
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
                  <Image src={homeTeam.logo} alt={homeTeam.name} width={48} height={48} className="object-contain w-full h-full" unoptimized />
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-gray-500 font-medium">טוען משחקים מהליגה...</p>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : filteredMatches.length > 0 ? (
            filteredMatches.map(renderMatchCard)
          ) : (
            <p className="text-gray-500 text-center py-4">לא נמצאו משחקים אחרי תאריך זה.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
