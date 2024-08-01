import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSimpleStore } from "@/app/stores/simpleSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScoreView from "@/components/ScoreView";
import { useActionSheet } from "@expo/react-native-action-sheet";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const team1Score = useSimpleStore((state) => state.team1Scores);
  const team2Score = useSimpleStore((state) => state.team2Scores);
  const deletedRounds = useSimpleStore((state) => state.deletedRounds);
  const resetScores = useSimpleStore((state) => state.resetScores);
  const deleteRound = useSimpleStore((state) => state.deleteRound);
  const { showActionSheetWithOptions } = useActionSheet();

  const animationRef = useRef<LottieView>(null);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [ignoreGameEnd, setIgnoreGameEnd] = useState(false);

  const totalTeam1Score = team1Score
    .filter((_, index) => !deletedRounds.includes(index))
    .reduce((a, b) => a + b, 0);
  const totalTeam2Score = team2Score
    .filter((_, index) => !deletedRounds.includes(index))
    .reduce((a, b) => a + b, 0);

  const onResetGame = () => {
    resetScores();
    setIgnoreGameEnd(false);
    setIsAnimationPlaying(false);
  };

  const onPressGameSettings = () => {
    const options = ["Reset Game", "Game Settings", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: "Game Settings",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onResetGame();
        }
        if (buttonIndex === 1) {
        }
      }
    );
  };

  useEffect(() => {
    if ((totalTeam1Score >= 200 || totalTeam2Score >= 200) && !ignoreGameEnd) {
      setIsAnimationPlaying(true);
      animationRef.current?.reset();
      animationRef.current?.play();
    }
  }, [isAnimationPlaying, ignoreGameEnd, totalTeam1Score, totalTeam2Score]);

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
      {isAnimationPlaying && (
        <ThemedView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center", // Center the container horizontally
          }}
        >
          <LottieView
            ref={animationRef}
            style={{
              width: "100%",
              height: 500,
              left: 0,
            }}
            source={require("../../assets/confetti.json")}
          />
          <ThemedView
            style={{
              backgroundColor: "rgba(23, 21, 59, 0.8)", // Semi-transparent background
              borderRadius: 20, // Slightly larger border radius for a smoother look
              padding: 20, // Add padding to make the container content look nicer
              width: "80%", // Adjust the width as needed
              alignItems: "center", // Center the buttons horizontally
              justifyContent: "center", // Center the buttons vertically
              position: "absolute",
              zIndex: 3,
            }}
          >
            <ThemedText
              style={{ color: "#FFF", fontSize: 24, marginBottom: 20 }}
            >
              {totalTeam1Score >= 200 ? "Team 1" : "Team 2"} 🎉 Wins!
            </ThemedText>
            <TouchableOpacity onPress={onResetGame} style={styles.button}>
              <ThemedText style={styles.buttonText}>Reset Game</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsAnimationPlaying(false);
                setIgnoreGameEnd(true);
              }}
              style={[styles.button, styles.cancelButton]}
            >
              <ThemedText style={[styles.buttonText, styles.cancelButtonText]}>
                Continue
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}

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
  button: {
    backgroundColor: "#4CAF50", // Green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10, // Space between buttons
    width: "80%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent", // Red background
    color: "#FFF",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  cancelButtonText: {
    color: "#FFF",
  },
});
