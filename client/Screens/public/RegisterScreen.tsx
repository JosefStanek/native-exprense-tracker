import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Card from "../../components/ui/Card";
import { Colors } from "../../Theme/colors";
import LoginForm from "../../components/reusable/LoginForm";
import Title from "../../components/ui/Title";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Toast } from "toastify-react-native";
interface registerProps {
  navigation: any;
}
type formData = {
  email: string;
  password: string;
  login: boolean;
};

const RegisterScreen: React.FC<registerProps> = ({ navigation }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formData) => {
      if (data.login === false) {
        const res = await axios.post(
          `http://192.168.0.80:3000/auth/api/register`,
          {
            email: data.email,
            password: data.password,
          }
        );
        return res.data;
      } else {
        return;
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        Toast.error(error.response?.data.error, "top");
      } else {
        return "An unexpected error occurred";
      }
    },
  });

  const login = (email: string, password: string, login: boolean) => {
    mutate({ email, password, login });
  };
  return (
    <View style={styles.screen}>
      {isPending && <LoadingSpinner />}
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
