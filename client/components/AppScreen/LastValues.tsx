import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Card from "../ui/Card";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../Theme/colors";

interface LastValuesProps {
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
const LastValues: React.FC<LastValuesProps> = ({ expenses, incomes }) => {
  const lastExpense = expenses[0];
  const lastIncome = incomes[0];
  const expenseTime = moment(lastExpense.createdAt);
  const incomeTime = moment(lastIncome.createdAt);
  const screetWidth = Dimensions.get("window").width;
  console.log(screetWidth);
  return (
    <ScrollView horizontal={true}>
      {expenses.length > 0 && (
        <View style={{ width: screetWidth }}>
          <Card>
            <Text style={[styles.title, { color: Colors.secondary }]}>
              Last Expense
            </Text>
            <Text style={styles.subtitle}>{lastExpense.name}</Text>

            <View style={styles.inlineText}>
              <Text>
                <Entypo name="calendar" size={24} color={Colors.secondary} />
              </Text>
              <Text>{expenseTime.format("DD.MM.YYYY")}</Text>
            </View>
            <View style={styles.inlineText}>
              <Text>
                <Entypo name="clock" size={24} color={Colors.secondary} />
              </Text>
              <Text>{expenseTime.format("HH:mm")}</Text>
            </View>
          </Card>
        </View>
      )}
      {incomes.length > 0 && (
        <View style={{ width: screetWidth }}>
          <Card>
            <Text style={[styles.title, { color: Colors.sun }]}>
              Last Income
            </Text>
            <Text style={styles.subtitle}>{lastIncome.name}</Text>
            <View style={styles.inlineText}>
              <Text>
                <Entypo name="calendar" size={24} color={Colors.sun} />
              </Text>
              <Text>{incomeTime.format("DD.MM.YYYY")}</Text>
            </View>
            <View style={styles.inlineText}>
              <Text>
                <Entypo name="clock" size={24} color={Colors.sun} />
              </Text>
              <Text>{incomeTime.format("HH:mm")}</Text>
            </View>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};

export default LastValues;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    paddingVertical: 10,
    fontWeight: "bold",
  },
  subtitle: {
    color: Colors.basicGray,
    paddingVertical: 10,
  },
  inlineText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 2,
    paddingVertical: 5,
  },
});
