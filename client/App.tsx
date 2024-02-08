import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./Screens/public/RegisterScreen";
import LoginScreen from "./Screens/public/LoginScreen";
import AppScreen from "./Screens/protect/AppScreen";
import { Colors } from "./Theme/colors";
const Stack = createStackNavigator();

function PublicNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: "white",
        headerLeft: () => null,
        headerTitle: () => null,
      }}
    >
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function ProtectNavigation() {
  <Stack.Navigator>
    <Stack.Screen name="Expenses" component={AppScreen} />
  </Stack.Navigator>;
}

export default function App() {
  return (
    <NavigationContainer>
      <PublicNavigation />
    </NavigationContainer>
  );
}
