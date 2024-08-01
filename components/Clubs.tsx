import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import ClubBox from "./ClubBox";

export default function Clubs() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 10 }}>
      <ThemedText type="subtitle">Clubs</ThemedText>

      <ClubBox />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => alert("Create Club")}
        >
          <Ionicons name="add-sharp" size={40} color={Colors[theme].text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => alert("Join Club")}
        >
          <Ionicons
            name="people-circle-outline"
            size={40}
            color={Colors[theme].text}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "teal",
    borderRadius: 20,
    padding: 10,
  },
});
