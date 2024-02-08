import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Card from "../../components/ui/Card";
import { Colors } from "../../Theme/colors";
import LoginForm from "../../components/reusable/LoginForm";
import Title from "../../components/ui/Title";

interface loginProps {
  navigation: any;
}

const LoginScreen: React.FC<loginProps> = ({ navigation }) => {
  const login = (email: string, password: string, login: boolean) => {
    console.log("login", email, password, login);
  };

  return (
    <View style={styles.screen}>
      <Card>
        <Title>Expense Tracker</Title>
        <Image
          style={styles.image}
          source={require("../../assets/images/investing.png")}
        />
        <LoginForm buttonText="login" sendForm={login} status={"login"} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Create new </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            <Text style={styles.link}>Account.</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 30,
    marginVertical: 10,
    color: Colors.primary,
    fontWeight: "bold",
  },

  textContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    fontSize: 18,
    color: Colors.primary,
  },
});
