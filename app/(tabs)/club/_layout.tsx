import React from "react";
import { Stack } from "expo-router";

export default function ClubsStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[club]"
        options={({ route }) => ({
          headerShown: true,
          title: "Granos Only club",
          headerBackTitleVisible: false,
        })}
      />
    </Stack>
  );
}
