import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";

interface formButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const FormButton: React.FC<formButtonProps> = ({ children, onPress }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ color: Colors.basicLight }}
    >
      <Text style={styles.button}>{children}</Text>
    </Pressable>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  button: {
    color: Colors.basicLight,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
