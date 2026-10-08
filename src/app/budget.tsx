import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/theme';
import KeyboardScreen from '../components/KeyboardScreen';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Expense } from '../data/trips';
import { useTrips } from '../context/TripContext';

export default function BudgetScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { trips, updateTrip } = useTrips();

  const trip = trips.find((item) => item.id === id);

  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  if (!trip) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trip not found.</Text>
      </View>
    );
  }

  const totalSpent = trip.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remainingBudget = trip.budget - totalSpent;

  const percentageSpent =
    trip.budget > 0
      ? Math.min((totalSpent / trip.budget) * 100, 100)
      : 0;

  const addExpense = () => {
    if (!expenseName.trim() || !expenseAmount.trim()) {
      alert('Please complete all expense fields.');
      return;
    }

    const amount = Number(expenseAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid expense amount.');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      name: expenseName.trim(),
      amount,
    };

    updateTrip({
      ...trip,
      expenses: [...trip.expenses, newExpense],
    });

    setExpenseName('');
    setExpenseAmount('');
  };

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        <Text style={styles.tripTitle}>
          {trip.destination}
        </Text>

        <Text style={styles.sectionLabel}>TRIP BUDGET</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.budgetAmount}>
            ${trip.budget.toLocaleString()}
          </Text>

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Spent</Text>

              <Text style={styles.summaryValue}>
                ${totalSpent.toLocaleString()}
              </Text>
            </View>

            <View style={styles.summaryRight}>
              <Text style={styles.summaryLabel}>Remaining</Text>

              <Text style={styles.summaryValue}>
                ${remainingBudget.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentageSpent}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.percentageText}>
            {Math.round(percentageSpent)}% of budget used
          </Text>
        </View>

        <Text style={styles.sectionLabel}>EXPENSES</Text>

        {trip.expenses.length === 0 ? (
          <Text style={styles.emptyText}>
            No expenses added yet.
          </Text>
        ) : (
          <View style={styles.expenseList}>
            {trip.expenses.map((expense) => (
              <View
                key={expense.id}
                style={styles.expenseRow}
              >
                <Text style={styles.expenseName}>
                  {expense.name}
                </Text>

                <Text style={styles.expenseAmount}>
                  ${expense.amount.toLocaleString()}
                </Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>

              <Text style={styles.totalText}>
                ${totalSpent.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionLabel}>
          ADD EXPENSE
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Expense name"
          value={expenseName}
          onChangeText={setExpenseName}
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.addButton}
          onPress={addExpense}
        >
          <Text style={styles.addButtonText}>
            + Add Expense
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

  summaryCard: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 14,
    padding: 20,
    marginBottom: 30,
    backgroundColor: Colors.light.backgroundElement,
  },

  budgetAmount: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 22,
    color: Colors.light.text,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  summaryRight: {
    alignItems: 'flex-end',
  },

  summaryLabel: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 19,
    fontWeight: '600',
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

  percentageText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },

  emptyText: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },

  expenseList: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    marginBottom: 28,
  },

  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },

  expenseName: {
    fontSize: 16,
    color: Colors.light.text,
  },

  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },

  totalText: {
    fontSize: 17,
    fontWeight: '700',
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

  link: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});