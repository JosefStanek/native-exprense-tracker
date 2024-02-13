import { View, Text, Image, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Colors } from "../../Theme/colors";
import Card from "../ui/Card";

interface pieGraphProps {
  pieData: {
    expenseLength: number;
    incomeLength: number;
    totalLength: number;
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
    total: {
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
  };
}

const PieGraph: React.FC<pieGraphProps> = ({ pieData }) => {
  const data = [
    {
      value: pieData.totalLength,
      color: Colors.primary,
    },
    { value: pieData.expenseLength, color: Colors.secondary },
    { value: pieData.incomeLength, color: "orange" },
  ];
  return (
    <View style={{ alignItems: "center" }}>
      {pieData.totalLength === 0 && (
        <Image
          style={styles.image}
          source={require("../../assets/images/empty-content.png")}
        />
      )}
      {pieData.totalLength > 0 && (
        <Card>
          <View style={styles.container}>
            <PieChart
              data={data}
              radius={100}
              donut
              showText
              showValuesAsLabels
              textBackgroundRadius={22}
              textColor="white"
              textSize={16}
              fontWeight="bold"
              strokeColor="#333"
              innerCircleBorderWidth={10}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: Colors.primary }}>
                Total: {pieData.totalLength}
              </Text>
              <Text style={{ color: Colors.secondary }}>
                Expenses {pieData.expenseLength}
              </Text>
              <Text style={{ color: Colors.sun }}>
                Income {pieData.incomeLength}
              </Text>
            </View>
          </View>
        </Card>
      )}
    </View>
  );
};

export default PieGraph;

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 400,
  },
  title: {
    fontSize: 20,
  },
});
