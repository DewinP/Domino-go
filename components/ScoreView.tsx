import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ScoreViewProps {
  teamScore: number[];
  teamColor: string;
  teamName: string;
  totalScore: number;
  onDeleteRound: (index: number) => void;
  deletedRounds: number[];
}

const ScoreView: React.FC<ScoreViewProps> = ({
  teamScore,
  teamColor,
  teamName,
  totalScore,
  onDeleteRound,
  deletedRounds,
}) => {
  return (
    <ThemedView style={styles.singleScoreContainer}>
      <TouchableOpacity
        onPress={() => router.push(`/modal/${teamName}`)}
        style={styles.singleScoreTitleContainer}
      >
        <ThemedText type="defaultSemiBold" style={styles.targetScoreText}>
          / 200
        </ThemedText>
        <ThemedText type="title">{totalScore}</ThemedText>
        <ThemedText style={{ color: teamColor }} type="subtitle">
          {teamName}
        </ThemedText>
      </TouchableOpacity>
      {teamScore.map((score, index) => (
        <View key={index} style={styles.scoreRow}>
          <View style={styles.scoreContainer}>
            <ThemedText
              type="subtitle"
              style={[
                styles.scoreText,
                deletedRounds.indexOf(index) !== -1 && styles.strikethrough,
              ]}
            >
              {score}
            </ThemedText>
            {deletedRounds.indexOf(index) !== -1 && (
              <View style={styles.strikethroughLine} />
            )}
          </View>
          {teamName === "Team 2" && deletedRounds.indexOf(index) === -1 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeleteRound(index)}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  singleScoreContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    gap: 10,
  },
  singleScoreTitleContainer: {
    width: "90%",
    alignItems: "center",
    position: "relative",
    paddingTop: 25,
    paddingBottom: 5,
    backgroundColor: "#17153B",
    borderRadius: 10,
  },
  targetScoreText: {
    fontWeight: "bold",
    position: "absolute",
    top: 5,
    right: 25,
    fontSize: 12,
    color: "#808080",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 10,
    position: "relative",
  },
  scoreContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    color: "#fff",
  },
  strikethrough: {
    color: "#808080",
  },
  strikethroughLine: {
    position: "absolute",
    height: 1,
    width: "80%", // Make the line 2x wider than the text
    backgroundColor: "#808080",
    top: "50%",
    transform: [{ translateY: -0.5 }],
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
});

export default ScoreView;
