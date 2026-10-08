import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/theme';
import KeyboardScreen from '../components/KeyboardScreen';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Activity } from '../data/trips';
import { useTrips } from '../context/TripContext';

export default function ItineraryScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { trips, updateTrip } = useTrips();

  const trip = trips.find((item) => item.id === id);

  const [activityTitle, setActivityTitle] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [activityTime, setActivityTime] = useState('');

  if (!trip) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trip not found.</Text>
      </View>
    );
  }

  const addActivity = () => {
    if (
      !activityTitle.trim() ||
      !activityDate.trim() ||
      !activityTime.trim()
    ) {
      alert('Please complete all activity fields.');
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      title: activityTitle.trim(),
      date: activityDate.trim(),
      time: activityTime.trim(),
    };

    updateTrip({
      ...trip,
      itinerary: [...trip.itinerary, newActivity],
    });

    setActivityTitle('');
    setActivityDate('');
    setActivityTime('');
  };

  const groupedActivities = trip.itinerary.reduce(
    (groups, activity) => {
      if (!groups[activity.date]) {
        groups[activity.date] = [];
      }

      groups[activity.date].push(activity);

      return groups;
    },
    {} as Record<string, Activity[]>
  );

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        <Text style={styles.tripTitle}>
          {trip.destination}
        </Text>

        <Text style={styles.sectionLabel}>ITINERARY</Text>

        {trip.itinerary.length === 0 ? (
          <Text style={styles.emptyText}>
            No activities added yet.
          </Text>
        ) : (
          Object.entries(groupedActivities).map(
            ([date, dayActivities]) => (
              <View key={date} style={styles.daySection}>
                <Text style={styles.dateTitle}>
                  {date}
                </Text>

                {dayActivities.map((activity) => (
                  <View
                    key={activity.id}
                    style={styles.activityRow}
                  >
                    <Text style={styles.time}>
                      {activity.time}
                    </Text>

                    <View style={styles.activityCard}>
                      <Text style={styles.activityTitle}>
                        {activity.title}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )
          )
        )}

        <Text style={styles.sectionLabel}>
          ADD ACTIVITY
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Activity name"
          value={activityTitle}
          onChangeText={setActivityTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Date (DD/MM/YYYY)"
          value={activityDate}
          onChangeText={setActivityDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Time (HH:MM)"
          value={activityTime}
          onChangeText={setActivityTime}
        />

        <Pressable
          style={styles.addButton}
          onPress={addActivity}
        >
          <Text style={styles.addButtonText}>
            + Add Activity
          </Text>
        </Pressable>
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

  tripTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 26,
    color: Colors.light.text,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
    marginTop: 8,
  },

  emptyText: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 24,
  },

  daySection: {
    marginBottom: 28,
  },

  dateTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    color: Colors.light.text,
  },

  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  time: {
    width: 60,
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 12,
    color: Colors.light.text,
  },

  activityCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    padding: 14,
    backgroundColor: Colors.light.backgroundElement,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: Colors.light.backgroundElement,
    color: Colors.light.text,
  },

  addButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },

  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
});