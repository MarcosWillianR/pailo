import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function RootScreen() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="./splash" />;

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Welcome aboard!</Text>
    </View>
  );
}
