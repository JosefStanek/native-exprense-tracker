import "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/http-auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./Screens/public/RegisterScreen";
import LoginScreen from "./Screens/public/LoginScreen";
import AppScreen from "./Screens/protect/AppScreen";
import AddScreen from "./Screens/protect/AddScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import { Colors } from "./Theme/colors";
import { AntDesign } from "@expo/vector-icons";
import ListScreen from "./Screens/protect/ListScreen";
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
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          textTransform: "uppercase",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Expenses" component={AppScreen} />
      <Stack.Screen name="add" component={AddScreen} />
      <Stack.Screen name="list" component={ListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {/* <PublicNavigation /> */}
          <ProtectNavigation />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
