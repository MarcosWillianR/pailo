import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function Summary() {
  return (
    <View className="mx-6 mt-6 flex-row justify-between gap-4">
      <View className="bg-green-200 flex-1 p-1 rounded-xl flex-row items-center px-4">
        <View className="mr-auto">
          <Text className="text-green-700 paragraph">Recebido</Text>
          <Text className="text-green-700 paragraph">R$ 4.250,00</Text>
        </View>

        <Feather name="trending-up" size={28} color="#32c56f" />
      </View>

      <View className="bg-red-200 flex-1 p-1 rounded-xl flex-row items-center px-4">
        <View className="mr-auto">
          <Text className="text-red-700 paragraph">Gasto</Text>
          <Text className="text-red-700 paragraph">R$ 4.444.250,00</Text>
        </View>

        <Feather name="trending-down" size={28} color="#c53232" />
      </View>
    </View>
  );
}
