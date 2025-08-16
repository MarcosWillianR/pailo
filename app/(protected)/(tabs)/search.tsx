import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 p-2 justify-center items-center bg-screen">
      <Text className="title text-center">Busca em {`\n`}construção</Text>
    </SafeAreaView>
  );
}
