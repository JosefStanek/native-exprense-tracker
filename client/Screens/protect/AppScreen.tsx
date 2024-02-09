import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Colors } from "../../Theme/colors";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import Card from "../../components/ui/Card";

interface appScreenProps {
  navigation: any;
}

const AppScreen: React.FC<appScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Entypo
            name="squared-plus"
            size={24}
            color={Colors.basicLight}
            style={{ marginLeft: 20 }}
            onPress={() => navigation.navigate("add")}
          />
          <Entypo
            name="list"
            size={24}
            color={Colors.basicLight}
            onPress={() => navigation.navigate("list")}
          />
        </View>
      ),
      headerRight: () => (
        <Entypo
          name="log-out"
          size={24}
          color={Colors.basicLight}
          style={{ marginRight: 20 }}
        />
      ),
    });
  }, [navigation]);

  const pieData = [
    {
      value: 54,
      color: Colors.primary,
    },
    { value: 40, color: Colors.secondary },
    { value: 20, color: "orange" },
  ];

  return (
    <View>
      <Card>
        <View
          style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}
        >
          <Text>Total: 300</Text>
          <Text>Expenses: 20</Text>
          <Text>Income: 20</Text>
        </View>
      </Card>

      <View style={{ alignItems: "center" }}>
        <Card>
          <View style={{ padding: 20 }}>
            <PieChart
              data={pieData}
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
              <Text style={{ color: "indigo" }}>Total</Text>
              <Text style={{ color: "crimson" }}>Expenses</Text>
              <Text style={{ color: "orange" }}>Income</Text>
            </View>
          </View>
        </Card>
      </View>
      <Card>
        <Text>Last Expense</Text>
      </Card>
      <Card>
        <Text>Last Income</Text>
      </Card>
    </View>
  );
};

export default AppScreen;
