const API_KEY = process.env.FOOTBALL_API_KEY || 'REMOVED_SECRET';
const API_URL = 'https://v3.football.api-sports.io';

export async function fetchFixtures(teamId: number) {
  const response = await fetch(`${API_URL}/fixtures?team=${teamId}&next=10`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch fixtures');
  }

  const data = await response.json();
  return data.response;
}

// Map of team IDs to Hebrew names
export const TEAM_NAME_MAP: Record<string, string> = {
  '541': 'ריאל מדריד',
  '529': 'ברצלונה',
  '530': 'אתלטיקו מדריד',
  '543': 'ולנסיה',
  '536': 'סביליה',
  '33': 'מנצ׳סטר יונייטד',
  '40': 'ליברפול',
  '50': 'מנצ׳סטר סיטי',
  '49': 'צ׳לסי',
  '47': 'טוטנהאם',
  '42': 'ארסנל',
};

// Map of venue names to Hebrew names
export const STADIUM_NAME_MAP: Record<string, string> = {
  'Santiago Bernabéu': 'סנטיאגו ברנבאו',
  'Camp Nou': 'קאמפ נואו',
  'Estadio Wanda Metropolitano': 'וונדה מטרופוליטנו',
  'Estadio de Mestalla': 'מסטאייה',
  'Estadio Ramón Sánchez Pizjuán': 'רמון סאנצ׳ס פיחואן',
  'Old Trafford': 'אולד טראפורד',
  'Anfield': 'אנפילד',
  'Etihad Stadium': 'אצטדיון איתיחאד',
  'Stamford Bridge': 'סטמפורד ברידג׳',
  'Tottenham Hotspur Stadium': 'אצטדיון טוטנהאם הוטספר',
  'Emirates Stadium': 'אצטדיון האמירויות',
};
