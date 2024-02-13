import { View, Text, StyleSheet } from "react-native";
import Card from "../ui/Card";
import { Colors } from "../../Theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface expenseBarProps {
  expenses: {
    amount: string;
    createdAt: string;
    name: string;
    payment: { key: string; value: string };
    type: { key: string; value: string };
    updatedAt: string;
    userId: string;
    _id: string;
  }[];
  incomes: {
    amount: string;
    createdAt: string;
    name: string;
    payment: { key: string; value: string };
    type: { key: string; value: string };
    updatedAt: string;
    userId: string;
    _id: string;
  }[];
}

const getTotalExpense = (expenses: { amount: string }[]) => {
  const expenseArray = expenses.map((expense) => {
    return { type: "expenses", value: expense.amount };
  });

  const totalExpense = expenseArray.reduce((sum, item) => {
    return sum + parseFloat(item.value);
  }, 0);

  return totalExpense;
};

const getTotalIncome = (incomes: { amount: string }[]) => {
  const incomeArray = incomes.map((income) => {
    return { type: "expenses", value: income.amount };
  });

  const totalIncome = incomeArray.reduce((sum, item) => {
    return sum + parseFloat(item.value);
  }, 0);

  return totalIncome;
};

const ExpenseBar: React.FC<expenseBarProps> = ({ expenses, incomes }) => {
  console.log("expenses", expenses);
  const expense = getTotalExpense(expenses);
  const income = getTotalIncome(incomes);
  const total = income - expense;
  return (
    <View style={{ backgroundColor: Colors.primary }}>
      <Card>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            <MaterialCommunityIcons
              name="finance"
              size={24}
              color={Colors.basicGray}
            />
          </Text>
          <Text style={styles.headerTitle}>My finance statistics</Text>
        </View>
        <Text style={[styles.title, { color: Colors.primary }]}>
          total: {total ? total : 0}
        </Text>
        <View style={styles.container}>
          <Text style={[styles.subtitle, { color: Colors.secondary }]}>
            Expenses: {expenses ? expense : 0}
          </Text>
          <Text style={[styles.subtitle, { color: Colors.sun }]}>
            Incomes: {incomes ? expense : 0}
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default ExpenseBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.basicGray,
  },
  headerTitle: {
    color: Colors.basicGray,
  },
  title: {
    padding: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    textTransform: "uppercase",
    padding: 10,
  },
});
