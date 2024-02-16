import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../Screens/public/RegisterScreen";
import ListScreen from "../Screens/protect/ListScreen";
import LoginScreen from "../Screens/public/LoginScreen";
import AppScreen from "../Screens/protect/AppScreen";
import AddScreen from "../Screens/protect/AddScreen";
import { Colors } from "../Theme/colors";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ListItemScreen from "../Screens/protect/ListItemScreen";
import ListItemDetailScreen from "../Screens/protect/ListItemDetailScreen";

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
      <Stack.Screen name="expenses" component={AppScreen} />
      <Stack.Screen name="add" component={AddScreen} />
      <Stack.Screen
        name="list"
        component={ListScreen}
        options={{ headerTitleStyle: { opacity: 0 } }}
      />
      <Stack.Screen name="listItem" component={ListItemScreen} />
      <Stack.Screen name="listItemDetail" component={ListItemDetailScreen} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer>
      {user && <ProtectNavigation />}
      {!user && <PublicNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
