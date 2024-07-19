import React from 'react';
import { Image, StyleSheet, Platform, SafeAreaView, Pressable, ScrollView, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSimpleStore } from '@/app/stores/simpleSlice';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  const team1Score = useSimpleStore((state) => state.team1Scores)
  const team2Score = useSimpleStore((state) => state.team2Scores)
  const increaseTeamScore1 = useSimpleStore((state) => state.addTeam1Score)
  const increaseTeamScore2 = useSimpleStore((state) => state.addTeam2Score);
  const resetScores = useSimpleStore((state) => state.resetScores);


  const totalTeam1Score = team1Score.length ? team1Score.reduce((a,b)=>{return a+b}): 0;
  const totalTeam2Score = team2Score.length ? team2Score.reduce((a,b)=>{return a+b}): 0;

  return (
    <ThemedView safeArea style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedView>
          <ThemedText type="title">Scoreboard</ThemedText>
        </ThemedView>
          <ThemedText type="link" onPress={resetScores}>⚙️</ThemedText>
      </ThemedView>
      <ThemedView style={styles.totalContainer}>
        <ThemedView style={styles.singleScoreContainer}>
          <ThemedText type="defaultSemiBold" style={styles.targetScoreText}>/ 200</ThemedText>
          <ThemedText type="title" style={styles.currentScoreText}>{totalTeam1Score}</ThemedText>
          <ThemedText type="link" style={styles.currentScoreText}>Team 1</ThemedText>
        </ThemedView>
        <ThemedView style={styles.verticleLine}></ThemedView>
        <ThemedView style={styles.singleScoreContainer}>
          <ThemedText type="defaultSemiBold" style={styles.targetScoreText}>/ 200</ThemedText>
          <ThemedText type="title" style={styles.currentScoreText}>{totalTeam2Score}</ThemedText>
          <ThemedText type="link" style={styles.currentScoreText}>Team 2</ThemedText>
        </ThemedView>
      </ThemedView>
    
        <ScrollView>
        {team1Score.map((team1Score, index) => {
          return <ThemedView key={index} style={styles.singleCellContainer}>
            <ThemedText type='title' >{team1Score}</ThemedText>
            <ThemedText type='title' >{team2Score[index]}</ThemedText>
        </ThemedView>
        }
        )}
        </ScrollView>
        <ThemedView style={styles.inputContainer}>
          <Button title="Add" onPress={()=> increaseTeamScore1(10)}   color="#1A3636"  accessibilityLabel="Learn more about this purple button"/>
          <Button  title="Add" onPress={()=> increaseTeamScore2(10)} color="#1A3636" accessibilityLabel="Learn more about this purple button"/>
        </ThemedView>
        
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputContainer:{
    position: 'absolute',
    bottom: 0,

    
    width: '100%',
    padding: 10,

    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  totalContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  singleCellContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 5,
  },  
  singleScoreContainer: {
    flex:1,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  scoreboardContianer: {
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  currentScoreText:{
    fontWeight: 'bold',
    position: 'relative',
  },
  targetScoreText:{
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 12,
  }
});
