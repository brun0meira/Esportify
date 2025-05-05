import { ChatRoomResponse } from './chat.dto';

export class CreateMatchDto {
    opponent: string;
    date: Date;
    isHomeGame?: boolean;
    tournament?: string;
}
  
export class UpdateMatchDto {
    opponent?: string;
    date?: Date;
    isHomeGame?: boolean;
    tournament?: string;
    status?: 'UPCOMING' | 'LIVE' | 'FINISHED' | 'POSTPONED';
    scoreFURIA?: number;
    scoreOpponent?: number;
}
  
export class MatchResponse {
    id: string;
    opponent: string;
    date: Date;
    isHomeGame: boolean;
    tournament?: string;
    scoreFURIA?: number;
    scoreOpponent?: number;
    status: string;
    liveChat?: ChatRoomResponse;
}