import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/theme';
import KeyboardScreen from '../components/KeyboardScreen';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTrips } from '../context/TripContext';

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { trips } = useTrips();

  const trip = trips.find((item) => item.id === id);

  if (!trip) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Trip not found</Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // Calculate total amount spent
  const totalSpent = trip.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Calculate remaining budget
  const remainingBudget = trip.budget - totalSpent;

  // Calculate packing progress
  const packedCount = trip.packingList.filter(
    (item) => item.packed
  ).length;

  const totalPackingItems = trip.packingList.length;

  const packingPercentage =
    totalPackingItems === 0
      ? 0
      : Math.round(
          (packedCount / totalPackingItems) * 100
        );

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        {/* Trip Information */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.destination}>
              {trip.destination}
            </Text>

            <Text style={styles.tripName}>
              {trip.tripName}
            </Text>

            <Text style={styles.dates}>
              {trip.startDate} - {trip.endDate}
            </Text>
          </View>

          <Pressable
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: '/edit-trip',
                params: { id: trip.id },
              })
            }
          >
            <Text style={styles.editButtonText}>
              Edit
            </Text>
          </Pressable>
        </View>

        {/* Itinerary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              ITINERARY
            </Text>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/itinerary',
                  params: { id: trip.id },
                })
              }
            >
              <Text style={styles.link}>
                View All ›
              </Text>
            </Pressable>
          </View>

          {trip.itinerary.length === 0 ? (
            <Text style={styles.secondaryText}>
              No activities added yet.
            </Text>
          ) : (
            trip.itinerary.slice(0, 2).map((activity) => (
              <View
                key={activity.id}
                style={styles.itemRow}
              >
                <Text style={styles.time}>
                  {activity.time}
                </Text>

                <Text style={styles.itemText}>
                  {activity.title}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              BUDGET
            </Text>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/budget',
                  params: { id: trip.id },
                })
              }
            >
              <Text style={styles.link}>
                View Budget ›
              </Text>
            </Pressable>
          </View>

          <Text style={styles.bigText}>
            ${totalSpent.toLocaleString()} spent of $
            {trip.budget.toLocaleString()}
          </Text>

          <Text style={styles.secondaryText}>
            ${remainingBudget.toLocaleString()} remaining
          </Text>
        </View>

        {/* Packing */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              PACKING
            </Text>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/packing',
                  params: { id: trip.id },
                })
              }
            >
              <Text style={styles.link}>
                View List ›
              </Text>
            </Pressable>
          </View>

          {totalPackingItems === 0 ? (
            <Text style={styles.secondaryText}>
              No packing items added yet.
            </Text>
          ) : (
            <>
              <Text style={styles.bigText}>
                {packedCount} of {totalPackingItems} items packed
              </Text>

              <Text style={styles.secondaryText}>
                {packingPercentage}% complete
              </Text>
            </>
          )}
        </View>
      </View>
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
    backgroundColor: Colors.light.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },

  headerText: {
    flex: 1,
    paddingRight: 15,
  },

  destination: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },

  tripName: {
    fontSize: 17,
    marginTop: 4,
    color: Colors.light.text,
  },

  dates: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 6,
  },

  editButton: {
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  editButtonText: {
    fontWeight: '600',
    color: Colors.light.text,
  },

  section: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
  },

  link: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.link,
  },

  itemRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  time: {
    width: 60,
    fontWeight: '600',
    color: Colors.light.text,
  },

  itemText: {
    flex: 1,
    color: Colors.light.text,
  },

  bigText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.text,
  },

  secondaryText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.light.background,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: Colors.light.text,
  },

  backButton: {
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  backButtonText: {
    fontWeight: '600',
    color: Colors.light.text,
  },
});