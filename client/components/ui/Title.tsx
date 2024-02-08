import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
interface titleProps {
  children: React.ReactNode;
}

const Title: React.FC<titleProps> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 30,
    marginVertical: 10,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
