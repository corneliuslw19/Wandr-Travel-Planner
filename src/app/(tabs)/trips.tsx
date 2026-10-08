import { router } from 'expo-router';
import { Colors } from '../../constants/theme';
import {
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTrips } from '../../context/TripContext';

function getDestinationImage(destination: string) {
  const value = destination.toLowerCase();

  if (value.includes('tokyo')) {
    return require('../../../assets/destinations/tokyo.jpg');
  }

  if (value.includes('seoul')) {
    return require('../../../assets/destinations/seoul.jpg');
  }

  if (value.includes('bangkok')) {
    return require('../../../assets/destinations/bangkok.jpg');
  }

  return require('../../../assets/destinations/default.jpg');
}

function parseDate(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number);

  return new Date(year, month - 1, day);
}

export default function TripsScreen() {
  const { trips } = useTrips();

  const today = new Date();

  const upcomingTrips = trips
    .filter((trip) => parseDate(trip.endDate) >= today)
    .sort(
      (a, b) =>
        parseDate(a.startDate).getTime() -
        parseDate(b.startDate).getTime()
    );

  const pastTrips = trips
    .filter((trip) => parseDate(trip.endDate) < today)
    .sort(
      (a, b) =>
        parseDate(b.startDate).getTime() -
        parseDate(a.startDate).getTime()
    );

  const openTrip = (id: string) => {
    router.push({
      pathname: '/trip-details',
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Trips</Text>

          <Pressable
            style={styles.addButton}
            onPress={() => router.push('/create-trip')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>UPCOMING</Text>

        {upcomingTrips.length === 0 ? (
          <Text style={styles.emptyText}>
            No upcoming trips.
          </Text>
        ) : (
          upcomingTrips.map((trip) => (
            <Pressable
              key={trip.id}
              style={styles.tripCard}
              onPress={() => openTrip(trip.id)}
            >
              <Image
                source={getDestinationImage(trip.destination)}
                style={styles.tripImage}
              />

              <View style={styles.tripInfo}>
                <Text style={styles.destination}>
                  {trip.destination}
                </Text>

                <Text style={styles.tripName}>
                  {trip.tripName}
                </Text>

                <Text style={styles.dates}>
                  {trip.startDate} - {trip.endDate}
                </Text>

                <Text style={styles.status}>
                  Upcoming
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))
        )}

        <Text style={styles.sectionTitle}>PAST</Text>

        {pastTrips.length === 0 ? (
          <Text style={styles.emptyText}>
            No past trips.
          </Text>
        ) : (
          pastTrips.map((trip) => (
            <Pressable
              key={trip.id}
              style={styles.tripCard}
              onPress={() => openTrip(trip.id)}
            >
              <Image
                source={getDestinationImage(trip.destination)}
                style={styles.tripImage}
              />

              <View style={styles.tripInfo}>
                <Text style={styles.destination}>
                  {trip.destination}
                </Text>

                <Text style={styles.tripName}>
                  {trip.tripName}
                </Text>

                <Text style={styles.dates}>
                  {trip.startDate} - {trip.endDate}
                </Text>

                <Text style={styles.status}>
                  Completed
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
    backgroundColor: Colors.light.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.text,
  },

  addButton: {
    width: 42,
    height: 42,
    backgroundColor: Colors.light.primary,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    fontSize: 26,
    lineHeight: 28,
    color: Colors.light.text,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
    color: Colors.light.text,
  },

  emptyText: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 24,
    paddingVertical: 12,
  },

  tripCard: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundElement,
  },

  tripInfo: {
    flex: 1,
  },

  destination: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },

  tripName: {
    fontSize: 14,
    marginTop: 3,
    color: Colors.light.text,
  },

  dates: {
    fontSize: 13,
    marginTop: 5,
    color: Colors.light.textSecondary,
  },

  status: {
    fontSize: 13,
    marginTop: 7,
    color: Colors.light.textSecondary,
  },

  arrow: {
    fontSize: 28,
    color: Colors.light.primary,
    marginLeft: 10,
  },

  tripImage: {
    width: 74,
    height: 74,
    borderRadius: 10,
    marginRight: 14,
  },
});