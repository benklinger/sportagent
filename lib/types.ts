export interface Team {
  id: string;
  name: string;
  logo: string;
  apiId?: number;
}

export interface Match {
  id: string;
  awayTeamId: string;
  date: string;
  homeTeamId: string;
  stadium: string;
}

export interface FormData {
  selectedTeamId: string;
  startDate?: string;
  selectedOpponentId?: string;
  selectedMatchId?: string;
  preferences: {
    flight: boolean;
    hotel: boolean;
    tickets: boolean;
  };
  firstName: string;
  phone: string;
}
