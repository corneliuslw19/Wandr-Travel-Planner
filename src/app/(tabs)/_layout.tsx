import { Tabs } from 'expo-router';

import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 10 }}
      screenOptions={{
        headerShown: false,

        sceneStyle: {
          backgroundColor: Colors.light.background,
        },

        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.border,
        },

        tabBarActiveTintColor: Colors.light.text,
        tabBarInactiveTintColor: Colors.light.textSecondary,

        tabBarActiveBackgroundColor:
          Colors.light.backgroundSelected,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}