import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "../../Theme/colors";
import Card from "../ui/Card";

interface barGraphProps {
  barData: {
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
const colors: { [key: string]: string } = {
  Food: Colors.primary,
  Fun: Colors.secondary,
  Education: Colors.sun,
  Work: Colors.grass,
  Services: Colors.sky,
  Other: Colors.fuchsia,
};

const getData = (
  barData: {
    amount: string;
    createdAt: string;
    name: string;
    payment: { key: string; value: string };
    type: { key: string; value: string };
    updatedAt: string;
    userId: string;
    _id: string;
  }[]
) => {
  const filteredData = barData.map(
    (item: { type: { key: string; value: string } }) => ({
      type: item.type,
    })
  );
  const result = filteredData.reduce(
    (
      accumulator: { label: string; value: number; frontColor: string }[],
      currentItem
    ) => {
      const found = accumulator.find(
        (item) => item.label === currentItem.type.value
      );

      if (found) {
        found.value++;
      } else {
        accumulator.push({
          label: currentItem.type.value,
          value: 1,
          frontColor: colors[currentItem.type.value],
        });
      }

      return accumulator;
    },
    []
  );
  return result;
};

const BarGraph: React.FC<barGraphProps> = ({ barData }) => {
  const extractedData = getData(barData);
  return (
    <Card>
      <BarChart
        barWidth={28}
        noOfSections={10}
        maxValue={100}
        secondaryYAxis={false}
        frontColor={Colors.basicGray}
        data={extractedData}
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
        {extractedData.map((item) => (
          <Text key={item.label} style={{ color: item.frontColor }}>
            {item.label}
          </Text>
        ))}
      </View>
    </Card>
  );
};

export default BarGraph;
