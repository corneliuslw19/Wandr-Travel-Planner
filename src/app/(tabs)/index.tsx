import { router } from 'expo-router';
import { Colors } from '../../constants/theme';
import {
  Pressable,
  SafeAreaView,
  Image,
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

  return require('../../../assets/destinations/tokyo.jpg');
}

function parseDate(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number);

  return new Date(year, month - 1, day);
}

export default function HomeScreen() {
  const { trips } = useTrips();

  const today = new Date();

  const upcomingTrips = trips
    .filter((trip) => parseDate(trip.startDate) >= today)
    .sort(
      (a, b) =>
        parseDate(a.startDate).getTime() -
        parseDate(b.startDate).getTime()
    );

  const nextTrip = upcomingTrips[0];

  const getDaysUntilTrip = () => {
    if (!nextTrip) {
      return 0;
    }

    const tripDate = parseDate(nextTrip.startDate);

    const difference = tripDate.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const daysUntilTrip = getDaysUntilTrip();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Wandr</Text>

        <Text style={styles.sectionLabel}>
          YOUR NEXT ADVENTURE
        </Text>

        {nextTrip ? (
          <>
            <View style={styles.tripCard}>
              <Image
                source={getDestinationImage(nextTrip.destination)}
                style={styles.destinationImage}
              />

              <Text style={styles.destination}>
                {nextTrip.destination}
              </Text>

              <Text style={styles.tripName}>
                {nextTrip.tripName}
              </Text>

              <Text style={styles.dates}>
                {nextTrip.startDate} - {nextTrip.endDate}
              </Text>

              <Text style={styles.countdown}>
                {daysUntilTrip === 0
                  ? 'Trip starts today'
                  : `${daysUntilTrip} days to go`}
              </Text>

              <Pressable
                style={styles.viewButton}
                onPress={() =>
                  router.push({
                    pathname: '/trip-details',
                    params: { id: nextTrip.id },
                  })
                }
              >
                <Text style={styles.viewButtonText}>
                  View Trip
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No upcoming trips
            </Text>

            <Text style={styles.emptyText}>
              Start planning your next adventure.
            </Text>
          </View>
        )}

        <Pressable
          style={styles.planButton}
          onPress={() => router.push('/create-trip')}
        >
          <Text style={styles.planButtonText}>
            + Plan New Trip
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: Colors.light.background,
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 36,
    color: Colors.light.text,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
    marginTop: 8,
  },

  tripCard: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    padding: 16,
    backgroundColor: Colors.light.backgroundElement,
  },

  destinationImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 18,
    resizeMode: 'cover',
  },

  destination: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
  },

  tripName: {
    fontSize: 15,
    marginTop: 4,
    color: Colors.light.textSecondary,
  },

  dates: {
    fontSize: 15,
    marginTop: 6,
    color: Colors.light.text,
  },

  countdown: {
    fontSize: 15,
    marginTop: 8,
    marginBottom: 18,
    color: Colors.light.textSecondary,
  },

  viewButton: {
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },

  viewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },

  planButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  planButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },

  emptyCard: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 14,
    padding: 24,
    backgroundColor: Colors.light.backgroundElement,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.light.text,
  },

  emptyText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 6,
  },
});