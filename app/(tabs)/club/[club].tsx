import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ClubScreen() {
  const theme = "dark"; // Always use dark theme
  const navigation = useNavigation();

  return (
    <ThemedView viewType="safeArea" style={styles.container}>
      <ThemedText type="title" style={styles.clubName}>
        Hehe
      </ThemedText>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert("Start Official Match")}
        >
          <Ionicons
            name="play-circle-outline"
            size={24}
            color={Colors[theme].text}
          />
          <ThemedText style={styles.buttonText}>Start Match</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert("View Members")}
        >
          <Ionicons
            name="people-outline"
            size={24}
            color={Colors[theme].text}
          />
          <ThemedText style={styles.buttonText}>Members + Stats</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert("Club Settings")}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={Colors[theme].text}
          />
          <ThemedText style={styles.buttonText}>Settings</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background, // Ensure background is dark
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.dark.text, // Dark mode text color
  },
  clubName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.dark.text, // Dark mode text color
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighter button for dark mode
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.dark.text, // Dark mode text color
  },
});
