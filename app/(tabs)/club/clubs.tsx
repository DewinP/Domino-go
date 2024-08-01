import { StyleSheet } from "react-native";

import Clubs from "@/components/Clubs";
import { ThemedView } from "@/components/ThemedView";

export default function Club() {
  return (
    <ThemedView viewType="safeArea" style={styles.mainContainer}>
      <Clubs />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
  },
});
