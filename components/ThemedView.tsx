import { SafeAreaView, ScrollView, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ViewType = "view" | "safeArea" | "scroll";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  viewType?: ViewType;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  viewType = "view",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  // add a optional shadow to the view

  if (viewType === "scroll") {
    return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
  } else if (viewType === "safeArea") {
    return (
      <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
    );
  } else return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
