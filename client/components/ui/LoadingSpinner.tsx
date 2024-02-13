import { ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
const LoadingSpinner: React.FC = () => {
  return (
    <ActivityIndicator
      style={styles.spinner}
      size={"large"}
      color={Colors.primary}
    />
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.basicLight,
    zIndex: 900,
    opacity: 0.8,
  },
});
