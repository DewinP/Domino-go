import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSimpleStore } from "../stores/simpleSlice";

export default function Modal() {
  const router = useRouter();
  const { team } = useLocalSearchParams<{ team: string }>();
  const [score, setScore] = useState<number | null>(null);

  const increaseTeamScore1 = useSimpleStore((state) => state.addTeam1Score);
  const increaseTeamScore2 = useSimpleStore((state) => state.addTeam2Score);

  const onSubmitEditing = () => {
    if (score !== null && !isNaN(score)) {
      if (team === "Team 1") {
        increaseTeamScore1(score);
      } else {
        increaseTeamScore2(score);
      }
    }
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titleText}>Enter Score for {team}</ThemedText>
      <TextInput
        onChange={(e) => setScore(parseInt(e.nativeEvent.text, 10))}
        style={styles.input}
        autoFocus
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmitEditing}>
        <ThemedText style={styles.buttonText}>Submit</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => router.back()}
      >
        <ThemedText style={[styles.buttonText, styles.cancelButtonText]}>
          Cancel
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "50%",
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "#fff",
  },
});
