import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  return (
    <>
      <StatusBar translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
