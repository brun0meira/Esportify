// events.ts
export interface Event {
    id: number;
    date: string;
    time: string;
    title: string;
    dayNumber: string;
  }
  
  export const events: Event[] = [
    { id: 1, date: '2025-01-10', time: '07:00', title: 'PGS 7 Fase Final', dayNumber: 'DIA 1' },
    { id: 2, date: '2025-01-11', time: '07:00', title: 'PGS 7 Fase Final', dayNumber: 'DIA 2' },
    { id: 3, date: '2025-02-05', time: '08:00', title: 'BLAST Premier', dayNumber: 'DIA 1' },
    { id: 4, date: '2025-02-06', time: '08:00', title: 'BLAST Premier', dayNumber: 'DIA 2' },
    { id: 5, date: '2025-03-12', time: '09:00', title: 'ESL Pro League', dayNumber: 'DIA 1' },
    { id: 6, date: '2025-03-13', time: '09:00', title: 'ESL Pro League', dayNumber: 'DIA 2' },
    { id: 7, date: '2025-04-15', time: '10:00', title: 'IEM Katowice', dayNumber: 'DIA 1' },
    { id: 8, date: '2025-04-16', time: '10:00', title: 'IEM Katowice', dayNumber: 'DIA 2' },
    { id: 9, date: '2025-05-02', time: '07:00', title: 'PGS 7 Fase Final', dayNumber: 'DIA 1' },
    { id: 10, date: '2025-05-03', time: '07:00', title: 'PGS 7 Fase Final', dayNumber: 'DIA 2' },
    { id: 11, date: '2025-06-05', time: '11:00', title: 'DreamHack Masters', dayNumber: 'DIA 1' },
    { id: 12, date: '2025-06-06', time: '11:00', title: 'DreamHack Masters', dayNumber: 'DIA 2' },
    { id: 13, date: '2025-07-08', time: '12:00', title: 'Major Championship', dayNumber: 'DIA 1' },
    { id: 14, date: '2025-07-09', time: '12:00', title: 'Major Championship', dayNumber: 'DIA 2' },
    { id: 15, date: '2025-08-20', time: '13:00', title: 'Summer Showdown', dayNumber: 'DIA 1' },
    { id: 16, date: '2025-08-21', time: '13:00', title: 'Summer Showdown', dayNumber: 'DIA 2' },
    { id: 17, date: '2025-09-15', time: '14:00', title: 'Fall Championship', dayNumber: 'DIA 1' },
    { id: 18, date: '2025-09-16', time: '14:00', title: 'Fall Championship', dayNumber: 'DIA 2' },
    { id: 19, date: '2025-10-10', time: '15:00', title: 'World Finals', dayNumber: 'DIA 1' },
    { id: 20, date: '2025-10-11', time: '15:00', title: 'World Finals', dayNumber: 'DIA 2' },
    { id: 21, date: '2025-11-05', time: '16:00', title: 'Regional Finals', dayNumber: 'DIA 1' },
    { id: 22, date: '2025-11-06', time: '16:00', title: 'Regional Finals', dayNumber: 'DIA 2' },
    { id: 23, date: '2025-12-01', time: '17:00', title: 'Showmatch FURIA', dayNumber: 'DIA 1' },
    { id: 24, date: '2025-12-02', time: '17:00', title: 'Showmatch FURIA', dayNumber: 'DIA 2' },
  ];
  