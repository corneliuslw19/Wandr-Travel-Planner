import { useLocalSearchParams } from 'expo-router';
import KeyboardScreen from '../components/KeyboardScreen';
import { Colors } from '../constants/theme';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { PackingItem } from '../data/trips';
import { useTrips } from '../context/TripContext';

export default function PackingScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { trips, updateTrip } = useTrips();

  const trip = trips.find((item) => item.id === id);

  const [newItem, setNewItem] = useState('');

  if (!trip) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trip not found.</Text>
      </View>
    );
  }

  const packedCount = trip.packingList.filter(
    (item) => item.packed
  ).length;

  const totalItems = trip.packingList.length;

  const packingPercentage =
    totalItems === 0
      ? 0
      : Math.round((packedCount / totalItems) * 100);

  const togglePacked = (itemId: string) => {
    const updatedPackingList = trip.packingList.map((item) =>
      item.id === itemId
        ? {
            ...item,
            packed: !item.packed,
          }
        : item
    );

    updateTrip({
      ...trip,
      packingList: updatedPackingList,
    });
  };

  const addPackingItem = () => {
    if (!newItem.trim()) {
      alert('Please enter an item.');
      return;
    }

    const item: PackingItem = {
      id: Date.now().toString(),
      name: newItem.trim(),
      packed: false,
    };

    updateTrip({
      ...trip,
      packingList: [...trip.packingList, item],
    });

    setNewItem('');
  };

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        <Text style={styles.tripTitle}>
          {trip.destination}
        </Text>

        <Text style={styles.sectionLabel}>
          PACKING PROGRESS
        </Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressMain}>
            {packedCount} of {totalItems} items packed
          </Text>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${packingPercentage}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {packingPercentage}% complete
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          PACKING ITEMS
        </Text>

        {trip.packingList.length === 0 ? (
          <Text style={styles.emptyText}>
            No packing items added yet.
          </Text>
        ) : (
          trip.packingList.map((item) => (
            <Pressable
              key={item.id}
              style={styles.itemRow}
              onPress={() => togglePacked(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.packed && styles.checkboxPacked,
                ]}
              >
                {item.packed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text
                style={[
                  styles.itemText,
                  item.packed && styles.itemTextPacked,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))
        )}

        <Text style={styles.sectionLabel}>
          ADD ITEM
        </Text>

        <View style={styles.addRow}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Sunglasses"
            value={newItem}
            onChangeText={setNewItem}
          />

          <Pressable
            style={styles.addButton}
            onPress={addPackingItem}
          >
            <Text style={styles.addButtonText}>
              Add
            </Text>
          </Pressable>
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

  progressCard: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 14,
    padding: 20,
    marginBottom: 30,
    backgroundColor: Colors.light.backgroundElement,
  },

  progressMain: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    color: Colors.light.text,
  },

  progressBackground: {
    height: 10,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.primary,
  },

  progressText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },

  emptyText: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 24,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxPacked: {
    backgroundColor: Colors.light.primaryLight,
  },

  checkmark: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },

  itemText: {
    fontSize: 16,
    color: Colors.light.text,
  },

  itemTextPacked: {
    color: Colors.light.textSecondary,
    textDecorationLine: 'line-through',
  },

  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.light.backgroundElement,
    color: Colors.light.text,
  },

  addButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
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