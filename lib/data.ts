import { Team, Match } from './types';

export const TEAMS: Team[] = [
  {
    id: 'real-madrid',
    name: 'ריאל מדריד',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  },
  {
    id: 'man-city',
    name: 'מנצ׳סטר סיטי',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  },
  {
    id: 'arsenal',
    name: 'ארסנל',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  },
  {
    id: 'liverpool',
    name: 'ליברפול',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  },
  {
    id: 'barcelona',
    name: 'ברצלונה',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  },
  {
    id: 'atletico',
    name: 'אתלטיקו מדריד',
    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c1/Atletico_Madrid_logo.svg',
  },
  {
    id: 'valencia',
    name: 'ולנסיה',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg',
  },
  {
    id: 'sevilla',
    name: 'סביליה',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg',
  },
  {
    id: 'chelsea',
    name: 'צ׳לסי',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  },
  {
    id: 'man-united',
    name: 'מנצ׳סטר יונייטד',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  },
  {
    id: 'tottenham',
    name: 'טוטנהאם',
    logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  },
];

export const MATCHES: Match[] = [
  // Real Madrid matches
  { id: 'm1', homeTeamId: 'real-madrid', awayTeamId: 'barcelona', date: '2026-03-15', stadium: 'סנטיאגו ברנבאו' },
  { id: 'm2', homeTeamId: 'real-madrid', awayTeamId: 'atletico', date: '2026-03-22', stadium: 'סנטיאגו ברנבאו' },
  { id: 'm3', homeTeamId: 'valencia', awayTeamId: 'real-madrid', date: '2026-04-05', stadium: 'מסטאייה' },
  { id: 'm4', homeTeamId: 'sevilla', awayTeamId: 'real-madrid', date: '2026-04-12', stadium: 'רמון סאנצ׳ס פיחואן' },
  
  // Man City matches
  { id: 'm5', homeTeamId: 'man-city', awayTeamId: 'liverpool', date: '2026-03-10', stadium: 'אצטדיון איתיחאד' },
  { id: 'm6', homeTeamId: 'chelsea', awayTeamId: 'man-city', date: '2026-03-24', stadium: 'סטמפורד ברידג׳' },
  { id: 'm7', homeTeamId: 'man-city', awayTeamId: 'man-united', date: '2026-04-01', stadium: 'אצטדיון איתיחאד' },
  { id: 'm8', homeTeamId: 'tottenham', awayTeamId: 'man-city', date: '2026-04-15', stadium: 'אצטדיון טוטנהאם הוטספר' },
];
