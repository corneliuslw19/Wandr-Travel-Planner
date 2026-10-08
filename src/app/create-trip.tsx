import { router } from 'expo-router';
import { useTrips } from '../context/TripContext';
import { Colors } from '../constants/theme';
import KeyboardScreen from '../components/KeyboardScreen';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function CreateTripScreen() {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  
  const { addTrip } = useTrips();

const handleCreateTrip = () => {
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

const newTrip = {
  id: Date.now().toString(),
  tripName: tripName.trim(),
  destination: destination.trim(),
  startDate: startDate.trim(),
  endDate: endDate.trim(),
  budget: Number(budget),

  expenses: [],
  packingList: [],
  itinerary: [],
};

  console.log('New trip created:', newTrip);
  addTrip(newTrip);

  alert('Trip created successfully.');

  router.replace('/trips');
};

  return (
  <KeyboardScreen>
    <View style={styles.container}>
        <Text style={styles.label}>Trip Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Japan Holiday"
          value={tripName}
          onChangeText={setTripName}
        />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Tokyo, Japan"
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Text style={styles.label}>End Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={endDate}
          onChangeText={setEndDate}
        />

        <Text style={styles.label}>Budget (SGD)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 1500"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.createButton}
          onPress={handleCreateTrip}
        >
          <Text style={styles.createButtonText}>
            Create Trip
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

  createButton: {
    marginTop: 32,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },

  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
});