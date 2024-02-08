import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Card from "../../components/ui/Card";
import { Colors } from "../../Theme/colors";
import LoginForm from "../../components/reusable/LoginForm";
import Title from "../../components/ui/Title";
interface registerProps {
  navigation: any;
}

const RegisterScreen: React.FC<registerProps> = ({ navigation }) => {
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
        <LoginForm buttonText="register" sendForm={login} status={"register"} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Do you want to </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={styles.link}>Login?</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  link: {
    fontSize: 18,
    color: Colors.primary,
  },
});
