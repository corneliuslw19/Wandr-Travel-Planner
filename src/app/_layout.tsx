import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Colors } from '../constants/theme';
import { TripProvider } from '../context/TripContext';

export default function RootLayout() {
  return (
    <TripProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.light.background,
        }}
      >
        <StatusBar style="dark" />

        <Stack
          screenOptions={{
            headerBackTitle: 'Back',

            headerStyle: {
              backgroundColor: Colors.light.background,
            },

            headerTintColor: Colors.light.text,

            headerTitleStyle: {
              color: Colors.light.text,
              fontWeight: '600',
            },

            contentStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="create-trip"
            options={{ title: 'Create Trip' }}
          />

          <Stack.Screen
            name="trip-details"
            options={{ title: 'Trip Details' }}
          />

          <Stack.Screen
            name="itinerary"
            options={{ title: 'Itinerary' }}
          />

          <Stack.Screen
            name="budget"
            options={{ title: 'Budget' }}
          />

          <Stack.Screen
            name="packing"
            options={{ title: 'Packing List' }}
          />

          <Stack.Screen
            name="edit-trip"
            options={{ title: 'Edit Trip' }}
          />
        </Stack>
      </View>
    </TripProvider>
  );
}