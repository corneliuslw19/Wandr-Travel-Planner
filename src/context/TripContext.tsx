import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialTrips, Trip } from '../data/trips';

const TRIPS_STORAGE_KEY = '@wandr_trips';

type TripContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (updatedTrip: Trip) => void;
  deleteTrip: (id: string) => void;
};

const TripContext = createContext<TripContextType | undefined>(
  undefined
);

export function TripProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const savedTrips = await AsyncStorage.getItem(
          TRIPS_STORAGE_KEY
        );

        if (savedTrips !== null) {
          const parsedTrips: Trip[] = JSON.parse(savedTrips);

          const normalizedTrips = parsedTrips.map((trip) => ({
            ...trip,
            expenses: trip.expenses ?? [],
            packingList: trip.packingList ?? [],
            itinerary: trip.itinerary ?? [],
          }));

          setTrips(normalizedTrips);
        }
      } catch (error) {
        console.error('Failed to load trips:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTrips();
  }, []);

  useEffect(() => {
    const saveTrips = async () => {
      if (!isLoaded) {
        return;
      }

      try {
        await AsyncStorage.setItem(
          TRIPS_STORAGE_KEY,
          JSON.stringify(trips)
        );
      } catch (error) {
        console.error('Failed to save trips:', error);
      }
    };

    saveTrips();
  }, [trips, isLoaded]);

  const addTrip = (trip: Trip) => {
    setTrips((currentTrips) => [...currentTrips, trip]);
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === updatedTrip.id ? updatedTrip : trip
      )
    );
  };

  const deleteTrip = (id: string) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== id)
    );
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error(
      'useTrips must be used inside a TripProvider'
    );
  }

  return context;
}