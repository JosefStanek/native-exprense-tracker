import { View, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";

interface cardProps {
  children: React.ReactNode;
}

const Card: React.FC<cardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.basicLight,
    borderColor: Colors.basicGray,
    borderRadius: 10,
    padding: 12,
    margin: 20,
    elevation: 8,
  },
});
