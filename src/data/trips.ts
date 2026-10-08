export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type PackingItem = {
  id: string;
  name: string;
  packed: boolean;
};

export type Activity = {
  id: string;
  title: string;
  date: string;
  time: string;
};

export type Trip = {
  id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;

  expenses: Expense[];
  packingList: PackingItem[];
  itinerary: Activity[];
};

export const initialTrips: Trip[] = [
  {
    id: '1',
    tripName: 'Japan Holiday',
    destination: 'Tokyo, Japan',
    startDate: '12/12/2026',
    endDate: '18/12/2026',
    budget: 1500,

    expenses: [
      {
        id: 'expense-1',
        name: 'Hotel',
        amount: 250,
      },
      {
        id: 'expense-2',
        name: 'Transport',
        amount: 100,
      },
      {
        id: 'expense-3',
        name: 'Food',
        amount: 70,
      },
    ],

    packingList: [
      {
        id: 'packing-1',
        name: 'Passport',
        packed: true,
      },
      {
        id: 'packing-2',
        name: 'Wallet',
        packed: true,
      },
      {
        id: 'packing-3',
        name: 'Travel Adapter',
        packed: false,
      },
      {
        id: 'packing-4',
        name: 'Shirts',
        packed: true,
      },
      {
        id: 'packing-5',
        name: 'Jacket',
        packed: false,
      },
      {
        id: 'packing-6',
        name: 'Shoes',
        packed: false,
      },
    ],

    itinerary: [
      {
        id: 'activity-1',
        title: 'Arrive at Haneda Airport',
        date: '12/09/2026',
        time: '09:00',
      },
      {
        id: 'activity-2',
        title: 'Hotel Check-in',
        date: '12/09/2026',
        time: '12:00',
      },
      {
        id: 'activity-3',
        title: 'Shibuya Crossing',
        date: '12/09/2026',
        time: '15:00',
      },
      {
        id: 'activity-4',
        title: 'Meiji Shrine',
        date: '13/09/2026',
        time: '10:00',
      },
    ],
  },

  {
    id: '2',
    tripName: 'Korea Holiday',
    destination: 'Seoul, South Korea',
    startDate: '12/09/2026',
    endDate: '18/09/2026',
    budget: 1200,

    expenses: [],
    packingList: [],
    itinerary: [],
  },

  {
    id: '3',
    tripName: 'Bangkok Trip',
    destination: 'Bangkok, Thailand',
    startDate: '25/09/2025',
    endDate: '30/09/2025',
    budget: 800,

    expenses: [],
    packingList: [],
    itinerary: [],
  },
];