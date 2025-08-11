import { Text, View } from 'react-native';

export function BalanceGraph() {
  return (
    <View className="bg-[#F6F7FB] flex-1">
      <Text className="text-center text-base text-[#9AA0B4] mb-1">Total balance</Text>
      <Text className="text-center text-[32px] font-bold text-[#1A1E40] mb-5">$ 470.00</Text>
    </View>
  );
}
