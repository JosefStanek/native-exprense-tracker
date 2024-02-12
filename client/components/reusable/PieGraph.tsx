import { View, Text, Image, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Colors } from "../../Theme/colors";
import Card from "../ui/Card";

interface pieGraphProps {
  pieData: {
    expenseLength: any;
    incomeLength: any;
    totalLength: any;
    expenses: {}[];
    total: {}[];
    incomes: {}[];
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
          <View style={{ padding: 20 }}>
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
              <Text style={{ color: Colors.primary }}>Total</Text>
              <Text style={{ color: Colors.secondary }}>Expenses</Text>
              <Text style={{ color: Colors.sun }}>Income</Text>
            </View>
          </View>
        </Card>
      )}
    </View>
  );
};

export default PieGraph;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 400,
  },
  title: {
    fontSize: 20,
  },
});
