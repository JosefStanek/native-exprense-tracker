import { View, Text, StyleSheet } from "react-native";
import Card from "../ui/Card";

interface expenseBarProps {
  totalLength: number;
  expenseLength: number;
  incomeLength: number;
}

const ExpenseBar: React.FC<expenseBarProps> = ({
  totalLength,
  expenseLength,
  incomeLength,
}) => {
  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>Total: {totalLength}</Text>
        <Text style={styles.title}>Expenses: {expenseLength}</Text>
        <Text style={styles.title}>Income: {incomeLength}</Text>
      </View>
    </Card>
  );
};

export default ExpenseBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  title: {
    padding: 10,
    textTransform: "uppercase",
  },
});
