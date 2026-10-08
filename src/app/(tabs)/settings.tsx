import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/theme';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.text}>
        ABOUT

        Wandr
        Version 1.0.0 

        Wandr helps travellers organise their trips,
        itineraries, budgets and packing lists in one place.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: Colors.light.background,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
    color: Colors.light.text,
  },

  text: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
});