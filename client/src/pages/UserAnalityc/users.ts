const INTERESTS = [
    "CS2", "Valorant", "League of Legends", "FURIA Academy", "Watch Parties",
    "Treinamentos ao vivo", "Streamings dos jogadores", "Notícias e bastidores da FURIA",
    "Colecionáveis digitais (NFTs)", "Feminino no esports", "Documentários e vídeos exclusivos",
    "Arena FURIA", "Fantasy game da FURIA"
];
  
const EVENTS = [
    "IEM Rio Major 2022", "CBLOL Arena 2023", "Arena FURIA São Paulo", "FURIA Fan Fest",
    "ESL Pro League Finals", "DreamHack Open Rio", "Treino aberto da FURIA",
    "Evento de lançamento de uniforme 2024", "Meet & Greet com jogadores",
    "Game XP", "Campus Party", "Showmatch da FURIA com streamers"
];
  
const PURCHASES = [
    "Camisa oficial da FURIA 2024", "Edição limitada - Jaqueta FURIA x Nike",
    "Mochila personalizada da FURIA", "Mousepad FURIA XL", "Assinatura FURIA+ (conteúdo exclusivo)",
    "Figurinha digital FURIA Legends", "Combo ingresso + camisa para evento", "Boné oficial da FURIA",
    "Chaveiro Pantera", "Sticker da FURIA no CS2", "Skins em parceria com a FURIA", "Coleção Pride Edition"
];

const STATES = [
    "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
    "Rio Grande do Sul", "Pernambuco", "Ceará", "Distrito Federal", "Goiás"
];

interface User {
    email: string;
    hashedPassword: string;
    name: string;
    cpf: string;
    rg: string;
    address: string;
    interests: string[];
    eventsAttended: string[];
    purchases: string[];
}
  
const randomItems = (array: string[], count: number) =>
    [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  

export const users: User[] = Array.from({ length: 100 }, (_, i) => ({
    email: `user${i + 1}@example.com`,
    hashedPassword: `hashedpassword${i + 1}`,
    name: `User ${i + 1}`,
    cpf: `000.000.000-${(i + 10).toString().padStart(2, '0')}`,
    rg: `${1000000 + i}`,
    address: STATES[Math.floor(Math.random() * STATES.length)],
    interests: randomItems(INTERESTS, Math.floor(Math.random() * 5) + 1),
    eventsAttended: randomItems(EVENTS, Math.floor(Math.random() * 3)),
    purchases: randomItems(PURCHASES, Math.floor(Math.random() * 4))
}));
  