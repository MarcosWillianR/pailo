import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function New() {
  return (
    <SafeAreaView edges={['bottom']} className="p-4 flex-1">
      <Text>Novo registro</Text>
    </SafeAreaView>
  );
}
