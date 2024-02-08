import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./Screens/public/RegisterScreen";
import LoginScreen from "./Screens/public/LoginScreen";
import AppScreen from "./Screens/protect/AppScreen";
const Stack = createStackNavigator();

function PublicNavigation() {
  return (
    <Stack.Navigator>
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
