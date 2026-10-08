import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/theme';
import KeyboardScreen from '../components/KeyboardScreen';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useTrips } from '../context/TripContext';

export default function EditTripScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { trips, updateTrip, deleteTrip } = useTrips();

  const trip = trips.find((item) => item.id === id);

  const [tripName, setTripName] = useState(trip?.tripName ?? '');
  const [destination, setDestination] = useState(
    trip?.destination ?? ''
  );
  const [startDate, setStartDate] = useState(
    trip?.startDate ?? ''
  );
  const [endDate, setEndDate] = useState(
    trip?.endDate ?? ''
  );
  const [budget, setBudget] = useState(
    trip ? trip.budget.toString() : ''
  );

  if (!trip) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trip not found.</Text>
      </View>
    );
  }

  const handleSaveChanges = () => {
    if (
      !tripName.trim() ||
      !destination.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !budget.trim()
    ) {
      alert('Please complete all fields.');
      return;
    }
    
    const budgetNumber = Number(budget);

    if (isNaN(budgetNumber) || budgetNumber <= 0) {
      alert('Please enter a valid budget.');
      return;
    }

    updateTrip({
      ...trip,
      tripName: tripName.trim(),
      destination: destination.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      budget: budgetNumber,
    });

    alert('Trip updated successfully.');

    router.back();
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTrip(trip.id);
            router.replace('/trips');
          },
        },
      ]
    );
  };

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        <Text style={styles.label}>Trip Name</Text>

        <TextInput
          style={styles.input}
          value={tripName}
          onChangeText={setTripName}
        />

        <Text style={styles.label}>Destination</Text>

        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Start Date</Text>

        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={setStartDate}
          placeholder="DD/MM/YYYY"
        />

        <Text style={styles.label}>End Date</Text>

        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={setEndDate}
          placeholder="DD/MM/YYYY"
        />

        <Text style={styles.label}>Budget (SGD)</Text>

        <TextInput
          style={styles.input}
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.saveButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>
            Save Changes
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDeleteTrip}
        >
          <Text style={styles.deleteButtonText}>
            Delete Trip
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

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 18,
    color: Colors.light.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    backgroundColor: Colors.light.backgroundElement,
    color: Colors.light.text,
  },

  saveButton: {
    marginTop: 32,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },

  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },

  deleteButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.light.destructive,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundElement,
  },

  deleteButtonText: {
    color: Colors.light.destructive,
    fontSize: 16,
    fontWeight: '600',
  },
});