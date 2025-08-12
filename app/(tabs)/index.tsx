import { useFont } from '@shopify/react-native-skia';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { data } from '@/data/data';

import { useAuth } from '@/hooks/useAuth';

import { AnimatedText } from '@/components/AnimatedText';
import { BalanceGraph } from '@/components/BalanceGraph';
import { Tabs } from '@/components/Tabs';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Mês');

  const [selectedDate, setSelectedDate] = useState('Total');
  const selectedValue = useSharedValue(0);

  const CHART_HEIGHT = 400;
  const CHART_MARGIN = 20;
  const { width: CHART_WIDTH } = useWindowDimensions();

  const font = useFont(require('@/assets/fonts/HindSiliguri-SemiBold.ttf'), 36);

  if (!isAuthenticated) return <Redirect href="./welcome" />;
  if (!font) return null;

  return (
    <SafeAreaView className="flex-1 py-4 bg-screen">
      <ScrollView>
        <Tabs tabs={['Dia', 'Semana', 'Mês']} onSelect={() => {}} selectedTab={selectedTab} />

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
      </ScrollView>
    </SafeAreaView>
  );
}
