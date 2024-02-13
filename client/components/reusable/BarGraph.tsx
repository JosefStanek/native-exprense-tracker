import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "../../Theme/colors";
import Card from "../ui/Card";

interface barGraphProps {
  barData: {
    expenseLength: string;
    incomeLength: string;
    totalLength: string;
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

const BarGraph: React.FC<barGraphProps> = ({ barData }) => {
  console.log(barData);
  const data = [
    {
      value: 250,
      label: "Food",
      frontColor: Colors.secondary,
    },
    { value: 500, label: "Fun", frontColor: Colors.primary },
    { value: 745, label: "Education", frontColor: Colors.sun },
    { value: 320, label: "Work", frontColor: Colors.grass },
    { value: 600, label: "Services", frontColor: Colors.sky },
    { value: 256, label: "Other", frontColor: Colors.fuchsia },
  ];
  return (
    <Card>
      <BarChart
        barWidth={28}
        noOfSections={5}
        secondaryYAxis={false}
        frontColor={Colors.basicGray}
        data={data}
        yAxisThickness={0}
        xAxisThickness={0}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Text>Food</Text>
        <Text>Fun</Text>
        <Text>Education</Text>
        <Text>Work</Text>
        <Text>Services</Text>
        <Text>Other</Text>
      </View>
    </Card>
  );
};

export default BarGraph;
