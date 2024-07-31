import React, { useState } from "react";
import { StyleSheet, ScrollView, Button, Pressable, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSimpleStore } from "@/app/stores/simpleSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScoreView from "@/components/ScoreView";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function HomeScreen() {
  const team1Score = useSimpleStore((state) => state.team1Scores);
  const team2Score = useSimpleStore((state) => state.team2Scores);
  const deletedRounds = useSimpleStore((state) => state.deletedRounds);
  const resetScores = useSimpleStore((state) => state.resetScores);
  const deleteRound = useSimpleStore((state) => state.deleteRound);
  const { showActionSheetWithOptions } = useActionSheet();

  const [isScrollable, setIsScrollable] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const totalTeam1Score = team1Score
    .filter((_, index) => !deletedRounds.includes(index))
    .reduce((a, b) => a + b, 0);
  const totalTeam2Score = team2Score
    .filter((_, index) => !deletedRounds.includes(index))
    .reduce((a, b) => a + b, 0);

  const onPressGameSettings = () => {
    const options = ["Reset Game", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: "Game Settings",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          resetScores();
        }
      }
    );
  };

  return (
    <ThemedView viewType="safeArea" style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedView>
          <ThemedText type="title">Scoreboard</ThemedText>
        </ThemedView>
        <Pressable
          style={{
            position: "absolute",
            right: 0,
            paddingRight: 20,
          }}
        >
          <Ionicons
            name="cog-outline"
            size={32}
            color="white"
            onPress={onPressGameSettings}
          />
        </Pressable>
      </ThemedView>
      <ThemedView viewType="scroll">
        <ThemedView style={styles.totalContainer}>
          <ScoreView
            deletedRounds={deletedRounds}
            teamScore={team1Score}
            teamColor="#3FA2F6"
            teamName="Team 1"
            totalScore={totalTeam1Score}
            onDeleteRound={deleteRound}
          />
          <ThemedView style={styles.verticleLine}></ThemedView>
          <ScoreView
            deletedRounds={deletedRounds}
            teamScore={team2Score}
            teamColor="#EF5A6F"
            teamName="Team 2"
            totalScore={totalTeam2Score}
            onDeleteRound={deleteRound}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputContainer: {
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  totalContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "red",
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
