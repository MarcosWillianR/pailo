import { Feather } from '@expo/vector-icons';
import { useFont } from '@shopify/react-native-skia';
import { useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { data } from '@/data/data';

import { AnimatedText } from '@/components/AnimatedText';
import { BalanceGraph } from '@/components/BalanceGraph';
import { Summary } from '@/components/Summary';
import { Tabs } from '@/components/Tabs';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('Mês');

  const [selectedDate, setSelectedDate] = useState('Total');
  const selectedValue = useSharedValue(0);

  const CHART_HEIGHT = 250;
  const CHART_MARGIN = 16;
  const { width: CHART_WIDTH } = useWindowDimensions();

  const font = useFont(require('@/assets/fonts/HindSiliguri-SemiBold.ttf'), 36);

  if (!font) return null;

  return (
    <SafeAreaView className="flex-1 py-4 bg-screen">
      <ScrollView contentContainerClassName="pb-[120px]">
        <Tabs tabs={['Semana', 'Mês']} onSelect={setSelectedTab} selectedTab={selectedTab} />

        <Text className="paragraph text-neutral-400 self-center mt-4">Seu saldo</Text>

        <AnimatedText font={font} selectedValue={selectedValue} />

        <BalanceGraph
          data={data}
          chartHeight={CHART_HEIGHT}
          chartMargin={CHART_MARGIN}
          chartWidth={CHART_WIDTH}
          setSelectedDate={setSelectedDate}
          selectedValue={selectedValue}
        />

        <Summary />

        <View className="card">
          <Text className="paragraph-semibold mb-3">3 Fevereiro</Text>

          <View className="flex-row items-center">
            <View className="p-3 border-[1px] border-neutral-200 rounded-2xl mr-3">
              <Feather name="shopping-cart" size={24} />
            </View>

            <View className="mr-auto">
              <Text className="paragraph-semibold">Salário</Text>
              <Text className="paragraph">Work</Text>
            </View>

            <Text className="paragraph-semibold text-green-600">+R$ 8.755,00</Text>
          </View>
        </View>

        <View className="card">
          <Text className="paragraph-semibold mb-3">12 Fevereiro</Text>

          <View className="gap-3">
            <View className="flex-row items-center">
              <View className="p-3 border-[1px] border-neutral-200 rounded-2xl mr-3">
                <Feather name="shopping-cart" size={24} />
              </View>

              <View className="mr-auto">
                <Text className="paragraph-semibold">Mercado</Text>
                <Text className="paragraph">Food & Drink</Text>
              </View>

              <Text className="paragraph-semibold text-red-600">-R$ 255,00</Text>
            </View>

            <View className="flex-row items-center">
              <View className="p-3 border-[1px] border-neutral-200 rounded-2xl mr-3">
                <Feather name="credit-card" size={24} />
              </View>

              <View className="mr-auto">
                <Text className="paragraph-semibold">Template figma</Text>
                <Text className="paragraph">Online Shop</Text>
              </View>

              <Text className="paragraph-semibold text-red-600">-R$ 127,00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
