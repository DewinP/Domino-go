import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function ClubBox() {
  const theme = useColorScheme() ?? "light";

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("club/[club]");
      }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="people-circle" size={50} color={Colors[theme].text} />
      </View>
      <View style={styles.infoContainer}>
        <ThemedText type="subtitle" style={styles.clubName}>
          Club Name
        </ThemedText>
        <ThemedText type="subtitle" style={styles.clubDescription}>
          This is a short description of the club.
        </ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => alert("Join Club")}
        >
          <ThemedText style={styles.buttonText}>Settings</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    marginVertical: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  clubName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  clubDescription: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
  joinButton: {
    backgroundColor: "#4CAF50", // Green background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  leaveButton: {
    backgroundColor: "#F44336", // Red background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
});
