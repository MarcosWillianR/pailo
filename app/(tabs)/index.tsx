import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="./welcome" />;

  return (
    <View className="flex-1 justify-center items-center bg-screen">
      <Text className="text-xl">Welcome aboard!</Text>
    </View>
  );
}
