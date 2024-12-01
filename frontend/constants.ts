export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const APTOS_API_KEY = import.meta.env.VITE_APTOS_API_KEY;

// constants.ts
export const BettingCardDummy = {
  Football: [
    {
      game: "Football. UEFA Champions League",
      location: "London, England",
      when: "TOMORROW, 22:00",
      teamA: "Chelsea FC",
      teamB: "Real Madrid",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [2.5, 3.3, 2.8],
    },
    {
      game: "Football. La Liga",
      location: "Madrid, Spain",
      when: "NEXT WEEK, 20:00",
      teamA: "Atletico Madrid",
      teamB: "Barcelona",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [2.4, 3.1, 2.5],
    },
    {
      game: "Football. Premier League",
      location: "Manchester, England",
      when: "NEXT WEEK, 19:00",
      teamA: "Manchester United",
      teamB: "Liverpool FC",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [2.1, 3.4, 2.6],
    },
    {
      game: "Football. Copa America",
      location: "Buenos Aires, Argentina",
      when: "NEXT MONTH, 22:00",
      teamA: "Brazil",
      teamB: "Argentina",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [2.1, 3.5, 2.2],
    },
  ],
  Basketball: [
    {
      game: "Basketball. NBA Finals",
      location: "Los Angeles, USA",
      when: "TOMORROW, 18:00",
      teamA: "Los Angeles Lakers",
      teamB: "Miami Heat",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.95, 4.5, 3.6],
    },
    {
      game: "Basketball. NBA",
      location: "New York, USA",
      when: "NEXT WEEK, 21:00",
      teamA: "Brooklyn Nets",
      teamB: "Golden State Warriors",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.85, 4.0, 3.25],
    },
    {
      game: "Basketball. FIBA World Cup",
      location: "Beijing, China",
      when: "NEXT MONTH, 19:00",
      teamA: "USA",
      teamB: "Spain",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.5, 4.2, 3.0],
    },
  ],
  Cricket: [
    {
      game: "Cricket. IPL",
      location: "Mumbai, India",
      when: "TOMORROW, 15:30",
      teamA: "Mumbai Indians",
      teamB: "Delhi Capitals",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.5, 2.2, 3.5],
    },
    {
      game: "Cricket. ICC World Cup",
      location: "London, UK",
      when: "NEXT MONTH, 11:30",
      teamA: "England",
      teamB: "Australia",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.7, 3.6, 2.8],
    },
  ],
  Tennis: [
    {
      game: "Tennis. Wimbledon",
      location: "London, UK",
      when: "NEXT WEEK, 10:00",
      teamA: "Serena Williams",
      teamB: "Naomi Osaka",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.8, 3.5, 2.0],
    },
    {
      game: "Tennis. Australian Open",
      location: "Melbourne, Australia",
      when: "NEXT MONTH, 14:00",
      teamA: "Roger Federer",
      teamB: "Novak Djokovic",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.5, 2.8, 3.2],
    },
  ],
  Kabaddi: [
    {
      game: "Kabaddi. India. Pro Kabaddi League",
      location: "Bengaluru, India",
      when: "TODAY, 20:00",
      teamA: "Patna Pirates",
      teamB: "Bengaluru Bulls",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.26, 17.0, 4.26],
    },
    {
      game: "Kabaddi. India. Pro Kabaddi League",
      location: "Bengaluru, India",
      when: "TODAY, 21:00",
      teamA: "Jaipur Pink Panthers",
      teamB: "Telugu Titans",
      teamAImage: "https://via.placeholder.com/32",
      teamBImage: "https://via.placeholder.com/32",
      odds: [1.7, 10.0, 5.0],
    },
  ],
};

export const sportsList = [
  {
    id: 1,
    name: "Football",
    image: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    name: "Basketball",
    image: "https://via.placeholder.com/32",
  },
  {
    id: 3,
    name: "Baseball",
    image: "https://via.placeholder.com/32",
  },
  {
    id: 4,
    name: "Tennis",
    image: "https://via.placeholder.com/32",
  },
  {
    id: 5,
    name: "Cricket",
    image: "https://via.placeholder.com/32",
  },
  {
    id: 6,
    name: "Kabaddi",
    image: "https://via.placeholder.com/32",
  },
];

export const accountData = {
  user: {
    name: "Aptos User",
    username: "@aptosuser",
    profileInitial: "A",
  },
  balances: {
    accountBalance: 1245.67,
    bonusBalance: 320.0,
  },
  transactions: [
    { id: 1, type: "Deposit", date: "Nov 20, 2024", amount: 500.0, isPositive: true },
    { id: 2, type: "Bet Winnings", date: "Nov 18, 2024", amount: 150.0, isPositive: true },
    { id: 3, type: "Bet Loss", date: "Nov 15, 2024", amount: -100.0, isPositive: false },
  ],
  settings: [
    { id: 1, label: "Change Password", action: () => console.log("Change Password") },
    { id: 2, label: "Update Profile", action: () => console.log("Update Profile") },
    { id: 3, label: "Log Out", action: () => console.log("Log Out") },
  ],
};
